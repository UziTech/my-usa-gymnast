import { useState } from "react";
import { useAsync } from "react-use";
import {
	SearchProps,
	sanctionData,
	peopleData,
} from "./types";
import SearchBox from "./SearchBox";
import FilterBox from "./FilterBox";
import { fetchJson } from "./fetchJson";

function changeIds(ids: number[]) {
	return () => {
		window.location.href = `?id=${ids.join(",")}`;
	};
}

export default function Search({search}: SearchProps): JSX.Element {
	const [filter, setFilter] = useState<string>("");
	const [checked, setChecked] = useState<number[]>([]);
	const { value: data, error, loading } = useAsync<() => Promise<sanctionData | undefined>>(async () => {
		if (search) {
			const response = await fetchJson<[sanctionData]>([[`https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/sanctions/${search}`, true]]);
			return response?.[0];
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

	const people = Object.values(data.people).map(p => ({
			club: data.clubs[p.clubId]?.name || "",
			id: p.personId,
			name: `${p.firstName} ${p.lastName}`,
		})).sort((a, b) => a.club.localeCompare(b.club) || a.name.localeCompare(b.name));

	function changeCheckbox(id: number) {
		return ({target}: {target: HTMLInputElement}) => {
			if (target.checked) {
				setChecked([...new Set([...checked, id])]);
			} else {
				setChecked(checked.filter(c => c !== id));
			}
		};
	}

	const clubs = !people ? null : people.filter(p => {
		const lFilter = filter.toLocaleLowerCase();
		return p.name.toLocaleLowerCase().includes(lFilter) ||
			p.club.toLocaleLowerCase().includes(lFilter);
	}).reduce((prev, p) => {
		const club = p.club;
		if (!(club in prev)) {
			prev[club] = [];
		}
		prev[club].push(p);
		return prev;
	}, {} as {
		[index: string]: peopleData[]
	});

	return (
		<div className="names">
			<FilterBox onChange={setFilter} />
			<div>
				<br />
				<a href={`https://myusagym.com/meets/live/${search}/`}>{data.sanction.name}</a>
				<br />
				<br/>
				<a className="siteName" href={data.sanction.siteLink || `https://google.com/search?q=${encodeURIComponent(data.sanction.siteName)}`}>{data.sanction.siteName}</a>
				<br />
				<br/>
				<a className="siteAddress" href={`https://maps.google.com?q=${encodeURIComponent(`${data.sanction.address1}, ${data.sanction.city}, ${data.sanction.state} ${data.sanction.zip}`)}`}>
					{data.sanction.address1}, {data.sanction.city}, {data.sanction.state} {data.sanction.zip}
				</a>
			</div>
			<h2>Pick your Athletes:</h2>
			{!clubs ? null : Object.keys(clubs).map(c => {
				return (
					<div key={c}>
						<h3>{c}</h3>
						<ul>
							{
								clubs[c].map(p => (
										<li className="names-checkbox" key={p.name}>
											<label><input type="checkbox" checked={checked.includes(p.id)} onChange={changeCheckbox(p.id)} />{p.name}</label>
										</li>
								))
							}
						</ul>
					</div>
				)
			})}
			<button onClick={changeIds(checked)}>Go</button>
			<SearchBox />
		</div>
	);
}
