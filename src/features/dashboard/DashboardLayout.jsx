import styled from "styled-components";
import Stats from "./Stats";
import { useSearchParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
} from "../../services/apiBookings";
import { subDays } from "date-fns";
import Spinner from "../../ui/Spinner";
import { getCabins } from "../../services/apiCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const StyledMidSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const [query] = useSearchParams();
  const numDays = Number(query.get("last")) || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const getBookings = () => getBookingsAfterDate(queryDate);
  const getStays = () => getStaysAfterDate(queryDate);

  console.log(queryDate);

  const { data: bookings, isLoading } = useGetData(getBookings, [
    "bookings",
    numDays,
  ]);

  const { data: stays, isLoading: loadStays } = useGetData(getStays, [
    "stays",
    numDays,
  ]);

  const { data: cabins, isLoading: loadCabins } = useGetData(getCabins, [
    "cabins",
  ]);

  const isWorking = isLoading || loadStays || loadCabins;

  if (isWorking) return <Spinner />;

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinsCount={cabins?.length}
      />

      <StyledMidSection>
        <TodayActivity />

        <DurationChart confirmedStays={confirmedStays} />
      </StyledMidSection>

      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
