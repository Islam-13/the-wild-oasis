import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  opacity: 0;
  scale: 0.7;

  transition: scale 1s, opacity 1s, display 1s allow-discrete,
    overlay 1s allow-discrete;

  &:popover-open {
    opacity: 1;
    scale: 1;
  }

  inset-area: span-bottom left;
  position-area: span-bottom left;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  color: var(--color-grey-700);

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

function Menu({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function Toggle({ id }) {
  return (
    <StyledToggle
      popovertarget={`menu-list-${id}`}
      style={{ anchorName: `--menu-${id}` }}
    >
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  return (
    <StyledList
      id={`menu-list-${id}`}
      className="menu-list"
      popover="auto"
      style={{ positionAnchor: `--menu-${id}` }}
    >
      {children}
    </StyledList>
  );
}

function Button({ children, onClick, icon }) {
  return (
    <li>
      <StyledButton onClick={onClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

export default Menu;
