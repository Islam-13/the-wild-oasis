import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function SortBy({ options }) {
  const [query, setQuery] = useSearchParams();
  const sortValue = query.get("sortBy") || "regularPrice-asc";

  function handleChange(e) {
    query.set("sortBy", e.target.value);
    setQuery(query);
  }

  return (
    <StyledSelect value={sortValue} onChange={handleChange}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default SortBy;
