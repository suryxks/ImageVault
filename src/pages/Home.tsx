import { ChangeEvent, useCallback, useState } from "react";
import { FormInput } from "../components/AuthForm/AuthForm.style";
import { useAuthStore } from "../store/useUserStore";
export const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  if (user && isAuthenticated) {
    return (
      <>
        <div>{user.email}</div>
        <div>{user.firstname}</div>
        <div>{user.lastname}</div>
      </>
    );
  }
  return (
    <div>
      <FormInput value={searchValue} onChange={handleChange} />
    </div>
  );
};
