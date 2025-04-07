export type TaskType = 'long-term' | 'short-term' | 'daily';

export type TaskData = {
  created_date: string;
  due_date: string;
  id: number;
  task_complete: boolean;
  task_name: string;
  task_renewed: boolean;
  task_type: TaskType;
  user_id: number;
};

export type PostPutPatchTaskResponse = {
  message: string;
  task: TaskData;
};

export type PostTaskRequired = {
  user_id: number;
  task_name: string;
  task_type: TaskType;
  due_date: Date;
};

export type UserInfo = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type UserSignupUpdateResponse = {
  message: string;
  user: UserInfo & { id: number };
};
