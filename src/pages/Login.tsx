import { AuthForm } from "../components";
import { AuthPages } from "../types";
export const Login = () => {
  return <AuthForm page={AuthPages.LOGIN} />;
};
