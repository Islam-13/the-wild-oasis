import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinOperations() {
  return (
    <TableOperations>
      <Filter
        field="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "regularPrice-desc", label: "Sort by price(high first)" },
          { value: "regularPrice-asc", label: "Sort by price(low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity(high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity(low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinOperations;
