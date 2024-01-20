export enum AuthPages {
  SIGNUP = "SIGNUP",
  LOGIN = "LOGIN",
}

export interface User {
  email: string;
  firstname: string;
  lastname: string;
}
