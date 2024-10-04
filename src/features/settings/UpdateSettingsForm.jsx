import useGetData from "../../hooks/useGetData";
import useMutateData from "../../hooks/useMutateData";
import { getSettings, updateSetting } from "../../services/apiSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

const message = "Setting updated successfully";
const queryKey = ["settings"];

function UpdateSettingsForm() {
  const { isLoading, data } = useGetData(getSettings, queryKey);
  const { isPending: isUpdating, mutate } = useMutateData(
    updateSetting,
    message,
    queryKey
  );

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={data.minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => mutate({ minBookingLength: e.target.value })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={data.maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => mutate({ maxBookingLength: e.target.value })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={data.maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => mutate({ maxGuestsPerBooking: e.target.value })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={data.breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => mutate({ breakfastPrice: e.target.value })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
