import React from "react";

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export default function Search({ handleSearch }) {
  const [inputValue, setInputValue] = React.useState("");
  
  const handleSearchDebounced = React.useMemo(() => debounce(handleSearch, 300), [handleSearch]);
  
  const handleChange = (event) => {
    const term = event.target.value;
    setInputValue(term);
    if (term.length >= 3) {
        handleSearchDebounced(term);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search products"
        value={inputValue}
        onChange={handleChange}
      />
    </form>
  );
}
