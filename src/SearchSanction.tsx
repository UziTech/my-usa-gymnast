import { useAsync } from "react-use";
import {
	sanctionResult,
} from "./types";

function renderEvent(name: string) {
	return (s: sanctionResult) => {
		return (
			<li className="names" key={s.sanctionId}>
				<button onClick={() => window.location.href = `?s=${s.sanctionId.toString()} ${name}`}>{s.name}</button>
			</li>
		);
	}
}

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

	const men = data.filter(s => s.program === 2);
	const women = data.filter(s => s.program === 1);
	const other = data.filter(s => ![1, 2].includes(s.program));

	return (
		<div className="names">
			<h2>Pick your Event:</h2>
			<h3>Men</h3>
			<ul>
				{men.map(renderEvent(name))}
			</ul>
			<h3>Women</h3>
			<ul>
				{women.map(renderEvent(name))}
			</ul>
			{
				other.length === 0 ? null : (
					<>
						<h3>Other</h3>
						<ul>
							{other.map(renderEvent(name))}
						</ul>
					</>
				)
			}
		</div>
	);
}
