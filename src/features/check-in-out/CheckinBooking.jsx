import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useBooking from "../bookings/useBooking";
import { formatCurrency } from "../../utils/helpers";
import useMutateData from "../../hooks/useMutateData";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import { getSettings } from "../../services/apiSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { booking, isLoading } = useBooking();
  const { data: settings, isLoading: loadingSettings } = useGetData(
    getSettings,
    ["settings"]
  );
  const { isPending, mutate: checkin } = useMutateData(
    updateBooking,
    `Booking #${booking?.id} successfully checked in`,
    ["booking"]
  );

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const isWorking = isLoading || loadingSettings;

  if (isWorking) return <Spinner />;

  const { id, guests, totalPrice, numGuests, hasBreakfast, numNights } =
    booking;

  const optionalBreakfast = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin(
        {
          id,
          status: "checked-in",
          isPaid: true,
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
        { onSuccess: () => navigate(`/dashboard`) }
      );
    } else
      checkin(
        { id, status: "checked-in", isPaid: true },
        { onSuccess: () => navigate(`/dashboard`) }
      );
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            disabled={isWorking}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfast)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((c) => !c)}
          disabled={confirmPaid}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfast
              )}. (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfast
              )}) `}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button shape="secondary" onClick={moveBack}>
          Back
        </Button>
        <Button disabled={!confirmPaid || isPending} onClick={handleCheckin}>
          Check in booking #{id}
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
