import { useFetch } from "react-async";
import {
	SearchProps,
	sanctionData,
} from "./types";

function changeId(id: number) {
	return () => {
		window.location.href = `?id=${id}`;
	};
}

export default function Search({search, name}: SearchProps): JSX.Element {
	const { data, error, isPending } = useFetch<sanctionData>(
		`https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/sanctions/${search}`,
		{headers: { accept: "application/json" }},
	);

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

	if (!data) {
		return (
			<div className="error">No data</div>
		);
	}

	const terms = name.toLowerCase().split(" ");
	const people = Object.values(data.people).filter(p => {
		if (terms.length > 1) {
			return p.firstName.toLowerCase().startsWith(terms[0]) && p.lastName.toLowerCase().startsWith(terms[1]);
		}

		return p.firstName.toLowerCase().startsWith(terms[0]) || p.lastName.toLowerCase().startsWith(terms[0]);
	}).map(p => {
		return {
			id: p.personId,
			name: `${p.firstName} ${p.lastName}`,
		};
	});

	return (
		<div className="names">
			<h2>Pick an Athlete:</h2>
			<ul className="names">
				{people.map(p => {
					return (
						<li className="names-button" key={p.name}><button onClick={changeId(p.id)}>{p.name}</button></li>
					);
				})}
			</ul>
		</div>
	);
}
