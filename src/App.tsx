import React from "react";
import Person from "./Person";
const LOGAN_ID = "1913246";

export default function App(): JSX.Element {
	return (
		<ul>
			<Person key={LOGAN_ID} id={LOGAN_ID} />
		</ul>
	);
}
