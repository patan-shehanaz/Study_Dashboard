import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTaskContext } from '@/contexts/TaskContext';
import { SUBJECTS } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TaskForm() {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subject || !deadline) return;

    addTask({
      title: title.trim(),
      subject,
      priority,
      deadline,
    });

    setTitle('');
    setSubject('');
    setPriority('medium');
    setDeadline('');
  };

  const isValid = title.trim() && subject && deadline;

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 card-shadow">
      <h2 className="mb-6 text-lg font-semibold text-foreground">Add New Task</h2>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Task Title */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            placeholder="e.g., Complete Chapter 5 review"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-background"
          />
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label>Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {SUBJECTS.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Priority */}
        <div className="space-y-2">
          <Label>Priority</Label>
          <Select value={priority} onValueChange={(v) => setPriority(v as 'low' | 'medium' | 'high')}>
            <SelectTrigger className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="low">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-priority-low" />
                  Low
                </span>
              </SelectItem>
              <SelectItem value="medium">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-priority-medium" />
                  Medium
                </span>
              </SelectItem>
              <SelectItem value="high">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-priority-high" />
                  High
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Deadline */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="bg-background"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className="mt-6 w-full gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Task
      </Button>
    </form>
  );
}
