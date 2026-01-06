import { createContext, useContext, ReactNode } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@/types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  stats: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    upcomingDeadline: Task | undefined;
  };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const taskData = useTasks();

  return (
    <TaskContext.Provider value={taskData}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
