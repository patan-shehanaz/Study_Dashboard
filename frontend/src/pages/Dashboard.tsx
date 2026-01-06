import { format } from 'date-fns';
import { ListTodo, CheckCircle2, Clock, CalendarClock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTaskContext } from '@/contexts/TaskContext';
import { SummaryCard } from '@/components/SummaryCard';
import { TaskCard } from '@/components/TaskCard';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { tasks, stats } = useTaskContext();

  const upcomingTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  const completionRate = stats.totalTasks > 0
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Track your study progress and upcoming deadlines
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Tasks"
            value={stats.totalTasks}
            icon={ListTodo}
            variant="primary"
          />
          <SummaryCard
            title="Completed"
            value={stats.completedTasks}
            subtitle={`${completionRate}% completion rate`}
            icon={CheckCircle2}
            variant="success"
          />
          <SummaryCard
            title="Pending"
            value={stats.pendingTasks}
            icon={Clock}
            variant="warning"
          />
          <SummaryCard
            title="Next Deadline"
            value={
              stats.upcomingDeadline
                ? format(new Date(stats.upcomingDeadline.deadline), 'MMM d')
                : '—'
            }
            subtitle={stats.upcomingDeadline?.title || 'No upcoming tasks'}
            icon={CalendarClock}
          />
        </div>

        {/* Upcoming Tasks Section */}
        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Upcoming Tasks</h2>
              <p className="text-sm text-muted-foreground">Your next priorities</p>
            </div>
            <Button variant="outline" asChild className="gap-2">
              <Link to="/tasks">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {upcomingTasks.length > 0 ? (
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <CheckCircle2 className="h-7 w-7 text-success" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">All caught up!</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You have no pending tasks. Great job!
              </p>
              <Button asChild className="mt-4">
                <Link to="/tasks">Add New Task</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        {stats.totalTasks > 0 && (
          <div className="mt-6 rounded-xl border border-border bg-card p-6 card-shadow">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Overall Progress</span>
              <span className="text-muted-foreground">{completionRate}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {stats.completedTasks} of {stats.totalTasks} tasks completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
