import { BookOpen, Target, Clock, CheckCircle, Sparkles } from 'lucide-react';
const features = [{
  icon: Target,
  title: 'Task Management',
  description: 'Create, organize, and track your study tasks with ease. Set priorities and deadlines to stay focused.'
}, {
  icon: Clock,
  title: 'Deadline Tracking',
  description: 'Never miss a deadline. Get a clear overview of upcoming due dates and plan accordingly.'
}, {
  icon: CheckCircle,
  title: 'Progress Monitoring',
  description: 'Track your completion rate and see how much you\'ve accomplished over time.'
}, {
  icon: Sparkles,
  title: 'Clean Interface',
  description: 'A distraction-free design that helps you focus on what matters most — your studies.'
}];
const steps = [{
  number: '01',
  title: 'Add a Task',
  description: 'Go to the Tasks page and fill in the task details including title, subject, priority, and deadline.'
}, {
  number: '02',
  title: 'Organize by Priority',
  description: 'Set priority levels (Low, Medium, High) to help you focus on what\'s most important.'
}, {
  number: '03',
  title: 'Track Progress',
  description: 'Mark tasks as complete and watch your progress grow on the Dashboard.'
}, {
  number: '04',
  title: 'Stay on Schedule',
  description: 'Check the Dashboard regularly to see upcoming deadlines and pending tasks.'
}];
export default function About() {
  return <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">About Study Planner</h1>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            A simple, effective tool to help you organize your studies and achieve your academic goals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="mb-6 text-center text-xl font-semibold text-foreground">Features</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(feature => <div key={feature.title} className="group rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/30 card-shadow hover:card-shadow-hover">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>)}
          </div>
        </div>

        {/* How to Use */}
        <div className="rounded-xl border border-border bg-card p-8 card-shadow">
          <h2 className="mb-8 text-center text-xl font-semibold text-foreground">How to Use</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => <div key={step.number} className="relative">
                {index < steps.length - 1 && <div className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-x-1/2 bg-border lg:block" />}
                <div className="relative flex-col text-center flex items-center justify-start">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {step.number}
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>)}
          </div>
        </div>

        {/* Tech Stack */}
        
      </div>
    </div>;
}