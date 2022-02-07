export class Project {
  id?: string;
  name: string;
  title: string;
  description: string;
  todos: TODO[];
}

export class TODO{
  id?:  string;
  task: string;
  complete: boolean;
}
