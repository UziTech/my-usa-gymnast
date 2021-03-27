import { useFetch } from "react-async";
import {
	namesData,
} from "./types";

function changeId(id: number) {
	return () => {
		window.location.href = `?id=${id}`;
	};
}

export default function Names(): JSX.Element {
	const { data, error, isPending } = useFetch<namesData>(
		`${window.location.href}/names.json`,
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
			<div className="error">No names</div>
		);
	}

	const names = Object.keys(data).sort();

	return (
		<div className="names">
			<h2>Pick an Athlete:</h2>
			<ul className="names">
				{names.map((name) => {
					return (
						<li className="names-button" key={name}><button onClick={changeId(data[name])}>{name}</button></li>
					);
				})}
			</ul>
		</div>
	);
}
