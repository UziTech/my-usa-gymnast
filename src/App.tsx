import React from "react";
import Person from "./Person";
const LOGAN_ID = "1913246";

export default function App(): JSX.Element {
	const query = new URLSearchParams(window.location.search);
	const id = query.get("id") || LOGAN_ID;
	return (
		<ul className="persons">
			<Person key={id} id={id} />
		</ul>
	);
}
