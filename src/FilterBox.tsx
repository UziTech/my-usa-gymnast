import React, { useState } from "react";

export default function Search({onChange}: {onChange: (value: string) => void}) {
	const [inputValue, setInputValue] = useState<string>("");

  function change(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    onChange(e.target.value);
  }

	return (
    <input value={inputValue} onChange={change} placeholder="filter" />
	);
}
