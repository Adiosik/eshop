import React from "react";
import { debounceCallback } from "../utilities";

export default function Search({ onSearch }) {
  const [inputValue, setInputValue] = React.useState("");

  const onSearchDebounced = React.useMemo(() => debounceCallback(onSearch, 300), [onSearch]);

  const handleChange = (event) => {
    const term = event.target.value;
    setInputValue(term);
    const searchValue = term.length >= 3 ? term : "";
    onSearchDebounced(searchValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="search"
        placeholder="Search products"
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
}
