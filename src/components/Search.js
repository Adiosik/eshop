import { useState, forwardRef, useMemo, useRef, useImperativeHandle } from "react";
import { debounceCallback } from "../utilities";

export default forwardRef(function Search({ onSearch }, ref) {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const onSearchDebounced = useMemo(() => debounceCallback(onSearch, 300), [onSearch]);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setInputValue(term);
        const searchValue = term.length >= 3 ? term : "";
        onSearchDebounced(searchValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    useImperativeHandle(ref, () => ({
        resetInput() {
            setInputValue("");
        }
    }));

    return (
        <form onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                className="form-control"
                type="search"
                placeholder="Search products"
                value={inputValue}
                onChange={handleSearchChange}
            />
        </form>
    );
});
