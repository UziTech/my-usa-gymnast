import { useState } from "react";
import { useAsync } from "react-use";
import {
	sanctionResult,
} from "./types";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";

function renderEvent(name: string) {
	return (s: sanctionResult) => {
		return (
			<li className="names" key={s.sanctionId}>
				<button onClick={() => window.location.href = `?s=${s.sanctionId.toString()} ${name}`}>{s.name}</button>
			</li>
		);
	}
}

export default function SearchSanction({name, past}: {name: string, past: boolean}): JSX.Element {
	const [filter, setFilter] = useState<string>("");
	const { value: data, error, loading } = useAsync<() => Promise<sanctionResult[] | undefined>>(async () => {
		const response = await fetch(`https://uzitech.com/cbp/?url=https://api.myusagym.com/v1/meets/${past ? "past" : "live"}`, {
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

	const sanctions = !filter ? data : data.filter(d => d.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));

	const men = sanctions.filter(s => s.program === 2);
	const women = sanctions.filter(s => s.program === 1);
	const other = sanctions.filter(s => ![1, 2].includes(s.program));

	return (
		<div className="names">
			<FilterBox onChange={setFilter} />
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
			<SearchBox />
		</div>
	);
}
