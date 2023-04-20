import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}

export const isAdmin = async () => {
  const { user } = useAuth();

  const users = useSelector((state) => state.users);

  const adminUsers = await users?.filter((user) => user.type === "admin");

  const adminUsersAndCurrent = adminUsers.filter(
    (admuser) => admuser?.email === user?.email
  );

  return adminUsersAndCurrent.length > 0;
};

export const blockedUsers = () => {
  const { user } = useAuth();

  const users = useSelector((state) => state.users);
  const blocked = users?.filter((user) => user.type === "block");

  const blockedAndCurrent = blocked.filter(
    (admuser) => admuser?.email === user?.email
  );

  return blockedAndCurrent.length > 0;
};
