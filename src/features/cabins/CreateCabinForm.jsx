import { useForm } from "react-hook-form";

import { createEditCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useMutateData from "../../hooks/useMutateData";

const queryKey = ["cabins"];

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const editFlag = Boolean(editId);
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: editFlag ? editValues : "",
  });
  const { errors } = formState;

  const { isPending: isCreating, mutate: create } = useMutateData(
    createEditCabin,
    "Cabin created successfully",
    queryKey
  );

  const { isPending: isEditing, mutate: editCabin } = useMutateData(
    createEditCabin,
    "Cabin updated successfully",
    queryKey
  );

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (editFlag) {
      editCabin({ ...data, image, id: editId }, { onSuccess: onCloseModal });
    } else create({ ...data, image }, { onSuccess: onCloseModal });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "Name is required!!" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Capacity is required!!",
            min: { value: 1, message: "Should be at leats one" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Price is required!!",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required!!",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than price!!",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description is required!!",
            maxLength: { value: 450, message: "error" },
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: editFlag ? false : "Image is required!!",
          })}
        />
      </FormRow>

      <FormRow>
        <Button shape="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {editFlag ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
