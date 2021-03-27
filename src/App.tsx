import React from "react";
import Person from "./Person";
import Names from "./Names";

export default function App(): JSX.Element {
	const query = new URLSearchParams(window.location.search);
	const id = query.get("id");
	if (id) {
		return (
			<ul className="persons">
				<Person key={id} id={id} />
			</ul>
		);
	}

	return (
		<Names />
	);
}
