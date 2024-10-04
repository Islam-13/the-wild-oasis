import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useMutateData(fn, message, queryKey) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: fn,
    onSuccess: () => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isPending, mutate };
}

export default useMutateData;
