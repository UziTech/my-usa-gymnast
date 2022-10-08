import { useAsync } from "react-use";
import {
	sanctionResult,
} from "./types";

export default function SearchSanction({name}: {name: string}): JSX.Element {
	const { value: data, error, loading } = useAsync<() => Promise<sanctionResult[] | undefined>>(async () => {
		const response = await fetch("https://uzitech.com/cbp/?url=https://api.myusagym.com/v1/meets/live", {
			headers: { accept: "application/json" },
		});
		if (response.ok) {
			return await response.json() as sanctionResult[];
		}
	});

	if (loading) {
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
