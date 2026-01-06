import { useTaskContext } from '@/contexts/TaskContext';
import { TaskCard } from './TaskCard';
import { ClipboardList } from 'lucide-react';

export function TaskList() {
  const { tasks } = useTaskContext();

  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks at the bottom
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    // Sort by deadline
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
          <ClipboardList className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">No tasks yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your first task using the form above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
