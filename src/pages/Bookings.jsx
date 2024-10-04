import BookingOperations from "../features/bookings/BookingOperations";
import BookingTable from "../features/bookings/BookingTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
