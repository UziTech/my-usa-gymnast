import { useState, useEffect } from "react";
import { useFetch } from "react-async";
import {
	SearchProps,
	sanctionData,
	peopleData,
} from "./types";
import names from "./names.json";

function changeId(id: number) {
	return () => {
		window.location.href = `?id=${id}`;
	};
}

export default function Search({search, name}: SearchProps): JSX.Element {
	const [people, setPeople] = useState<peopleData[]>();
	const { data, error, isPending, run } = useFetch<sanctionData>(
		`https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/sanctions/${search}`,
		{headers: { accept: "application/json" }},
		{defer: true},
	);

	useEffect(() => {
		if (search) {
			run();
		} else {
			setPeople(names);
		}
	}, [run, setPeople, search]);

	if (isPending) {
		return (
			<div>Loading...</div>
		);
	}

	if (error) {
		return (
			<div className="error">{error.message}</div>
		);
	}

	if (!people && !data) {
		return (
			<div className="error">No data</div>
		);
	}

	if (!people && data) {
		const terms = (name || "").toLowerCase().split(" ");
		setPeople(Object.values(data.people).filter(p => {
			if (terms.length > 1) {
				return p.firstName.toLowerCase().startsWith(terms[0]) && p.lastName.toLowerCase().startsWith(terms[1]);
			}

			return p.firstName.toLowerCase().startsWith(terms[0]) || p.lastName.toLowerCase().startsWith(terms[0]);
		}).map(p => {
			return {
				id: p.personId,
				name: `${p.firstName} ${p.lastName}`,
			};
		}));
	}

	return (
		<div className="names">
			<h2>Pick an Athlete:</h2>
			<ul className="names">
				{!people ? null : people.map(p => {
					return (
						<li className="names-button" key={p.name}><button onClick={changeId(p.id)}>{p.name}</button></li>
					);
				})}
			</ul>
		</div>
	);
}
