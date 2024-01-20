import { useAuthStore } from "../store/useUserStore";
export const Home = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (user && isAuthenticated) {
    return (
      <>
        <div>{user.email}</div>
        <div>{user.firstname}</div>
        <div>{user.lastname}</div>
      </>
    );
  }
  return <div>Hi</div>;
};
