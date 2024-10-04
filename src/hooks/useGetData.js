import { useQuery } from "@tanstack/react-query";

export default function useGetData(queryFn, queryKey) {
  const { isLoading, data } = useQuery({
    queryFn,
    queryKey,
  });

  return { isLoading, data };
}
