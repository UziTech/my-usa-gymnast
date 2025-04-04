import { useState } from "react";

function onSearch(q: string) {
	window.location.href = `?${q.match(/^\d{5}$/) ? "zip" : "s"}=${q}`;
}

export default function Search() {
	const [inputValue, setInputValue] = useState<string>("");

	return (
    <div>
      <h2>or search</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="search zip" />
        <button onClick={() => onSearch(inputValue)}>Go</button>
      </form>
    </div>
	);
}
