import { Todo } from './todo';

export type ResponseData = {
  method: string;
  success?: boolean;
  message?: string;
  data: Todo | Todo[] | null;
};