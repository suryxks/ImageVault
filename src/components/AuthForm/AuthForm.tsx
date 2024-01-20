import * as Form from "@radix-ui/react-form";
import {
  ChangeEvent,
  FC,
  FormEvent,
  FormEventHandler,
  useCallback,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormField,
  FormInput,
  FormLabel,
  FormMessage,
  FormRoot,
} from "./AuthForm.style";
import { supabase } from "../../../supabaseClient";
import { useAuthStore } from "../../store/useUserStore";
import { AuthPages, User } from "../../types";

interface Auth {
  page: AuthPages;
}
interface AuthInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const AuthForm: FC<Auth> = ({ page }) => {
  const [userData, setUserData] = useState<AuthInputs>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const updateIsAuthenticated = useAuthStore(
    (state) => state.updateIsAuthenticated,
  );
  const updateUser = useAuthStore((state) => state.updateUser);
  const updateToken = useAuthStore((state) => state.updateToken);

  const notifyError = (message: string) => toast.error(message);
  const handleEmailChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserData((prev) => ({ ...prev, email: event.target.value }));
    },
    [],
  );
  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserData((prev) => ({ ...prev, password: event.target.value }));
    },
    [],
  );
  const handleFirstnameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserData((prev) => ({ ...prev, firstname: event.target.value }));
    },
    [],
  );
  const handleLastnameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setUserData((prev) => ({ ...prev, lastname: event.target.value }));
    },
    [],
  );
  const handleLogin = useCallback(async () => {
    setLoading(true);
    if (page === AuthPages.LOGIN) {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        notifyError(error.message);
      } else {
        const { user, session } = data;
        updateUser(user.user_metadata as User);
        updateIsAuthenticated(user.aud === "authenticated");
        updateToken(session.access_token);
        navigate("/");
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
          },
        },
      });
      if (error) {
        setError(error.message);
        notifyError(error.message);
        setLoading(false);
      } else {
        const { user, session } = data;
        if (user && session) {
          updateUser(user?.user_metadata as User);
          updateIsAuthenticated(user?.aud === "authenticated");
          updateToken(session?.access_token);
          navigate("/");
        }
      }
    }
  }, [
    page,
    userData,
    updateUser,
    updateIsAuthenticated,
    updateToken,
    navigate,
  ]);
  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      handleLogin();
    },
    [handleLogin],
  );

  return (
    <FormRoot onSubmit={handleSubmit}>
      <>
        {page === AuthPages.SIGNUP && (
          <>
            <FormField name="firstname">
              <FormLabel>First Name</FormLabel>
              <Form.Control asChild>
                <FormInput
                  type="text"
                  value={userData.firstname}
                  onChange={handleFirstnameChange}
                  required
                />
              </Form.Control>
              <FormMessage match="valueMissing">
                Please enter your First Name
              </FormMessage>
            </FormField>
            <FormField name="lastname">
              <FormLabel>Last Name</FormLabel>
              <Form.Control asChild>
                <FormInput
                  type="text"
                  value={userData.lastname}
                  onChange={handleLastnameChange}
                  required
                />
              </Form.Control>
              <FormMessage match="valueMissing">
                Please enter your First Name
              </FormMessage>
            </FormField>
          </>
        )}
      </>

      <FormField name="email">
        <FormLabel>Email</FormLabel>
        <Form.Control asChild>
          <FormInput
            type="email"
            value={userData.email}
            onChange={handleEmailChange}
            required
          />
        </Form.Control>
        <FormMessage match="valueMissing">Please enter your email</FormMessage>
        <FormMessage match="typeMismatch">
          Please provide a valid email
        </FormMessage>
      </FormField>
      <FormField name="password">
        <FormLabel>Password</FormLabel>
        <Form.Control asChild>
          <FormInput
            type="password"
            onChange={handlePasswordChange}
            minLength={8}
            maxLength={12}
            required
          />
        </Form.Control>
        <FormMessage match="valueMissing">
          Please enter your password
        </FormMessage>
        <FormMessage match="tooShort">
          Password should be longer than 8 characters
        </FormMessage>
      </FormField>

      <Button type="submit" disabled={loading}>
        {page}
      </Button>
      {error !== "" ? <p>{error}</p> : null}
    </FormRoot>
  );
};
