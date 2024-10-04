import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: 8px;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-50);
      border: 1px solid var(--color-grey-200);
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
