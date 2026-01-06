import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { useTaskContext } from '@/contexts/TaskContext';

export default function Tasks() {
  const { stats } = useTaskContext();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your study tasks and track progress
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[400px,1fr]">
          {/* Task Form */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <TaskForm />
          </div>

          {/* Task List */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Your Tasks
                {stats.totalTasks > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({stats.pendingTasks} pending)
                  </span>
                )}
              </h2>
            </div>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
}
