import React from "react";
import Person from "./Person";
import Search from "./Search";

export default function App(): JSX.Element {
	const query = new URLSearchParams(window.location.search);
	const id = query.get("id");
	if (id) {
		const ids = id.split(",");
		if (ids.length > 0) {
			return (
				<div className="persons">
					{ids.map(i => {
						return (
							<Person key={i} id={i} />
						);
					})}
				</div>
			);
		}
	}

	const s = query.get("s");
	let search = null;
	let name = null;
	if (s) {
		const terms = s.split(" ");
		search = terms.shift() as string;
		name = terms.join(" ");
	}
	return (
		<Search search={search} name={name} />
	);
}
