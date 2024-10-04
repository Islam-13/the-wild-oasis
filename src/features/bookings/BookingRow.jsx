import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import Menu from "../../ui/Menu";
import useMutateData from "../../hooks/useMutateData";
import { deleteBooking, updateBooking } from "../../services/apiBookings";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();

  const { isPending: checkingOut, mutate: checkOut } = useMutateData(
    updateBooking,
    `Booking #${bookingId} checked out successfully`,
    ["booking"]
  );

  const { isPending: isDeleting, mutate: handleDeleteBooking } = useMutateData(
    deleteBooking,
    `Booking #${bookingId} deleted successfully`,
    ["bookings"]
  );

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleCheckout() {
    checkOut(
      { id: bookingId, status: "checked-out" },
      { onSuccess: () => navigate(`/dashboard`) }
    );
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menu>
        <Menu.Toggle id={bookingId} />

        <Menu.List id={bookingId}>
          <Menu.Button
            icon={<HiEye />}
            onClick={() => navigate(`/bookings/${bookingId}`)}
          >
            See details
          </Menu.Button>

          {status === "unconfirmed" && (
            <Menu.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check in
            </Menu.Button>
          )}

          {status === "checked-in" && (
            <Menu.Button
              disabled={checkingOut}
              icon={<HiArrowUpOnSquare />}
              onClick={handleCheckout}
            >
              Check out
            </Menu.Button>
          )}

          <Modal>
            <Modal.Open opens="delete-booking">
              <Menu.Button icon={<HiTrash />}>Delete booking</Menu.Button>
            </Modal.Open>

            <Modal.WindoW name="delete-booking">
              <ConfirmDelete
                resourceName="booking"
                disabled={isDeleting}
                onConfirm={() => handleDeleteBooking(bookingId)}
              />
            </Modal.WindoW>
          </Modal>
        </Menu.List>
      </Menu>
    </Table.Row>
  );
}

export default BookingRow;
