import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../../services/apiAuth";

function useGetUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: getUserApi,
    queryKey: ["user"],
  });
  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}

export default useGetUser;
