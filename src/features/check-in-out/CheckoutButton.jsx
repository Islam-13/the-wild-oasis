import useMutateData from "../../hooks/useMutateData";
import { updateBooking } from "../../services/apiBookings";
import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const { isPending: checkingOut, mutate: checkOut } = useMutateData(
    updateBooking,
    `Booking #${bookingId} checked out successfully`,
    ["activities"]
  );
  return (
    <Button
      shape="primary"
      size="small"
      disabled={checkingOut}
      onClick={() => checkOut({ id: bookingId, status: "checked-out" })}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
