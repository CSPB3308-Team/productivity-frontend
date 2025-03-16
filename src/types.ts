type taskType = 'long-term' | 'short-term' | 'daily';

export type taskData = {
  created_date: string;
  due_date: string;
  id: number;
  task_complete: boolean;
  task_name: string;
  task_renewed: boolean;
  task_type: taskType;
  user_id: number;
};
