import { useState, useEffect } from "react";
import { useAsyncRetry } from "react-use";
import {
	sanctionResult,
} from "./types";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";
import { fetchJson } from "./fetchJson";

function renderEvent(s: sanctionResult) {
	return (
		<li className="sanctions-link" key={s.sanctionId}>
			<a href={`?s=${s.sanctionId.toString()}`}>{s.name}</a>
		</li>
	);
}

export default function SearchSanction(): JSX.Element {
	const [filter, setFilter] = useState<string>("");
	const [past, setPast] = useState<boolean>(false);
	const [loaded, setLoaded] = useState<boolean>(false);
	const { value: data, error, loading, retry } = useAsyncRetry<sanctionResult[] | undefined>(async () => {
		const response = await fetchJson<[sanctionResult[]]>([[`https://uzitech.com/cbp/?url=https://api.myusagym.com/v1/meets/${past ? "past" : "live"}`, true]]);
		return response?.[0];
	});

	useEffect(() => {
		if (!loaded && !loading) {
			retry();
			setLoaded(true);
		}
	}, [loaded, loading, retry]);

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
	const myFilter = filter.split(":", 2);
	
	const sanctions = !filter ? data : data.filter(d => {
		if (myFilter.length > 1 && myFilter[0] in d) {
			return String(d[myFilter[0] as keyof sanctionResult]).toLocaleLowerCase().includes(String(myFilter[1]).toLocaleLowerCase())
		}
		return d.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
	});

	const men = sanctions.filter(s => s.program === 2);
	const women = sanctions.filter(s => s.program === 1);
	const other = sanctions.filter(s => ![1, 2].includes(s.program));

	return (
		<div className="sanctions">
			<FilterBox onChange={setFilter} />
			<h2>Pick your Event:</h2>
			<button onClick={() => {setPast(!past); setLoaded(false);}}>{past ? "See Live Events" : "See Past Events"}</button>
			<h3>Men</h3>
			<ul>
				{men.map(renderEvent)}
			</ul>
			<h3>Women</h3>
			<ul>
				{women.map(renderEvent)}
			</ul>
			{
				other.length === 0 ? null : (
					<>
						<h3>Other</h3>
						<ul>
							{other.map(renderEvent)}
						</ul>
					</>
				)
			}
			<SearchBox />
		</div>
	);
}
