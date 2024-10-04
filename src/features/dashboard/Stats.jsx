import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import styled from "styled-components";

const StyledStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
`;

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  const sales = bookings.reduce((acc, curr) => curr.totalPrice + acc, 0);
  const occupation =
    confirmedStays.reduce((acc, curr) => curr.numNights + acc, 0) /
    (numDays * cabinsCount);

  return (
    <StyledStats>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={bookings.length}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={confirmedStays.length}
      />
      <Stat
        title="Ocupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </StyledStats>
  );
}

export default Stats;
