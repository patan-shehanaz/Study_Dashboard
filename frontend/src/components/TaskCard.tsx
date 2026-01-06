import { format, isPast, isToday, isTomorrow } from 'date-fns';
import { Check, Trash2, Calendar, BookOpen } from 'lucide-react';
import { Task } from '@/types/task';
import { useTaskContext } from '@/contexts/TaskContext';
import { Button } from '@/components/ui/button';

interface TaskCardProps {
  task: Task;
}

const priorityStyles = {
  low: 'bg-priority-low/10 text-priority-low border-priority-low/20',
  medium: 'bg-priority-medium/10 text-priority-medium border-priority-medium/20',
  high: 'bg-priority-high/10 text-priority-high border-priority-high/20',
};

const priorityDotStyles = {
  low: 'bg-priority-low',
  medium: 'bg-priority-medium',
  high: 'bg-priority-high',
};

export function TaskCard({ task }: TaskCardProps) {
  const { toggleComplete, deleteTask } = useTaskContext();
  const deadlineDate = new Date(task.deadline);
  const isOverdue = isPast(deadlineDate) && !isToday(deadlineDate) && !task.completed;

  const getDeadlineLabel = () => {
    if (isToday(deadlineDate)) return 'Today';
    if (isTomorrow(deadlineDate)) return 'Tomorrow';
    return format(deadlineDate, 'MMM d, yyyy');
  };

  return (
    <div
      className={`group relative animate-fade-in overflow-hidden rounded-xl border bg-card p-5 transition-all duration-200 card-shadow hover:card-shadow-hover ${
        task.completed
          ? 'border-border/50 opacity-70'
          : isOverdue
          ? 'border-destructive/30'
          : 'border-border hover:border-primary/30'
      }`}
    >
      {/* Priority indicator */}
      <div className={`absolute left-0 top-0 h-full w-1 ${priorityDotStyles[task.priority]}`} />

      <div className="flex items-start gap-4 pl-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleComplete(task.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
            task.completed
              ? 'border-primary bg-primary'
              : 'border-muted-foreground/30 hover:border-primary'
          }`}
        >
          {task.completed && <Check className="h-3 w-3 text-primary-foreground" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium leading-tight text-foreground ${
              task.completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {task.title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {/* Subject badge */}
            <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
              <BookOpen className="h-3 w-3" />
              {task.subject}
            </span>

            {/* Priority badge */}
            <span
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium capitalize ${
                priorityStyles[task.priority]
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${priorityDotStyles[task.priority]}`} />
              {task.priority}
            </span>

            {/* Deadline */}
            <span
              className={`inline-flex items-center gap-1 text-xs ${
                isOverdue && !task.completed
                  ? 'font-medium text-destructive'
                  : 'text-muted-foreground'
              }`}
            >
              <Calendar className="h-3 w-3" />
              {getDeadlineLabel()}
              {isOverdue && !task.completed && ' (Overdue)'}
            </span>
          </div>
        </div>

        {/* Delete button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteTask(task.id)}
          className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete task</span>
        </Button>
      </div>
    </div>
  );
}
