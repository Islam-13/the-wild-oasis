import styled from "styled-components";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

function AddCabin() {
  return (
    <Container>
      <Modal>
        <Modal.Open opens="create-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>

        <Modal.WindoW name="create-form">
          <CreateCabinForm />
        </Modal.WindoW>
      </Modal>
    </Container>
  );
}

export default AddCabin;
