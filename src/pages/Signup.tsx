import { AuthForm } from "../components";
import { AuthPages } from "../types";

export const SignUp = () => {
  return <AuthForm page={AuthPages.SIGNUP} />;
};
