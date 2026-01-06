export interface Task {
  id: string;
  title: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  completed: boolean;
  createdAt: string;
}

export const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Computer Science',
  'Other'
] as const;

export type Subject = typeof SUBJECTS[number];
