import React from "react";
import Person from "./Person";
import Names from "./Names";
import Search from "./Search";

export default function App(): JSX.Element {
	const query = new URLSearchParams(window.location.search);
	const id = query.get("id");
	if (id) {
		const ids = id.split(",");
		if (ids.length > 0) {
			return (
				<ul className="persons">
					{ids.map(i => {
						return (
							<Person key={i} id={i} />
						);
					})}
				</ul>
			);
		}
	}

	const search = query.get("search");
	if (search) {
		const name = query.get("name") || "";
		return (
			<Search search={search} name={name} />
		);
	}

	return (
		<Names />
	);
}
