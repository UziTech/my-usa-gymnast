import { useFetch } from "react-async";
import {
	sanctionResult,
} from "./types";

export default function SearchSanction({name}: {name: string}): JSX.Element {
	const { data, error, isPending } = useFetch<sanctionResult[]>(
		"https://uzitech.com/cbp/?url=https://api.myusagym.com/v1/meets/live",
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

	return (
		<div className="names">
			<h2>Pick your Event:</h2>
			<ul>
				{data.map(s => {
					return (
						<li className="names" key={s.sanctionId}>
							<button onClick={() => window.location.href = `?s=${s.sanctionId.toString()} ${name}`}>{s.name}</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
