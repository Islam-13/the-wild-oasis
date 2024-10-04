import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const Dialog = styled.dialog`
  margin: auto;
  border: none;
  border-radius: var(--border-radius-md);
  color: var(--color-grey-700);
  opacity: 0;
  scale: 0.7;
  transition: scale 1s, opacity 1s, display 1s allow-discrete,
    overlay 1s allow-discrete;

  &[open] {
    opacity: 1;
    scale: 1;
  }

  &::backdrop {
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    opacity: 0;
  }

  &[open]::backdrop {
    opacity: 1;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const dialogRef = useRef(null);

  const open = (name) => {
    flushSync(() => setOpenName(name));
    dialogRef.current.showModal();
  };

  const close = () => dialogRef.current.close();

  return (
    <ModalContext.Provider value={{ openName, dialogRef, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }) {
  const { dialogRef, openName, close } = useContext(ModalContext);

  useEffect(() => {
    function handleClick(e) {
      if (dialogRef.current && dialogRef.current == e.target) {
        close();
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [dialogRef, close]);

  if (name !== openName) return null;

  return (
    <Dialog id="dialog" ref={dialogRef}>
      <Button onClick={close}>
        <HiXMark />
      </Button>
      <div>{cloneElement(children, { onCloseModal: close })}</div>
    </Dialog>
  );
}

Modal.Open = Open;
Modal.WindoW = Window;

export default Modal;
