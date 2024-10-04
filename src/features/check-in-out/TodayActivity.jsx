import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import useGetData from "../../hooks/useGetData";
import { getStaysTodayActivity } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding-top: 2.4rem;

  @container appLayout (max-width: 650px) {
    padding: 1rem;
  }
`;

const TodayList = styled.ul`
  overflow: auto;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { data: activities, isLoading } = useGetData(getStaysTodayActivity, [
    "activities",
  ]);

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {isLoading && <Spinner />}

      {!activities?.length ? (
        <NoActivity>No activity today...</NoActivity>
      ) : (
        <TodayList>
          {activities.map((activity) => (
            <TodayItem key={activity.id} activity={activity} />
          ))}
        </TodayList>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
