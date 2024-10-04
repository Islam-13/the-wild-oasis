import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useGetBookings() {
  const queryClient = useQueryClient();
  const [query] = useSearchParams();

  // 1- filter
  const filterValue = query.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // 2- sort
  const sortValue = query.get("sortBy") || "startDate-desc";
  const [field, direction] = sortValue.split("-");
  const sort = { field, direction };

  // 3- pagination
  const page = Number(query.get("page")) || 1;

  // 4- query
  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryFn: () => getBookings({ filter, sort, page }),
    queryKey: ["bookings", filter, sort, page],
  });

  // 5- prefetch next page for pagination
  const pagesCount = Math.ceil(count / PAGE_SIZE);

  if (page < pagesCount) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
      queryKey: ["bookings", filter, sort, page + 1],
    });
  }

  // 6- prefetch prev page for pagination
  if (page > 1) {
    queryClient.prefetchQuery({
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
      queryKey: ["bookings", filter, sort, page - 1],
    });
  }

  return { isLoading, bookings, count };
}

export default useGetBookings;
