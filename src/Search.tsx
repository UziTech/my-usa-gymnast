import { useState, useEffect } from "react";
import { useAsyncRetry } from "react-use";
import {
	SearchProps,
	sanctionData,
	peopleData,
} from "./types";
import names from "./names.json";

function changeIds(ids: number[]) {
	return () => {
		window.location.href = `?id=${ids.join(",")}`;
	};
}

function onSearch(q: string) {
	window.location.href = `?${q.match(/^\d{5}$/) ? "zip" : "s"}=${q}`;
}

export default function Search({search, name}: SearchProps): JSX.Element {
	const [people, setPeople] = useState<peopleData[]>();
	const [checked, setChecked] = useState<number[]>([]);
	const [inputValue, setInputValue] = useState<string>("");
	const { value: data, error, loading, retry } = useAsyncRetry<sanctionData | undefined>(async () => {
		const response = await fetch(`https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/sanctions/${search}`, {
			headers: { accept: "application/json" },
		});
		if (response.ok) {
			return await response.json() as sanctionData;
		}
	}, []);

	useEffect(() => {
		if (search) {
			retry();
		} else {
			setPeople(names);
		}
	}, [retry, search]);

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

	function changeCheckbox(id: number) {
		return ({target}: {target: HTMLInputElement}) => {
			if (target.checked) {
				setChecked([...new Set([...checked, id])]);
			} else {
				setChecked(checked.filter(c => c !== id));
			}
		};
	}

	return (
		<div className="names">
			<h2>Pick your Athletes:</h2>
			<ul>
				{!people ? null : people.map(p => {
					return (
						<li className="names-checkbox" key={p.name}>
							<label><input type="checkbox" checked={checked.includes(p.id)} onChange={changeCheckbox(p.id)} />{p.name}</label>
						</li>
					);
				})}
			</ul>
			<button onClick={changeIds(checked)}>Go</button>
			<div style={{display: "hidden"}}>
				<h2>or search</h2>
				<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
				<button onClick={() => onSearch(inputValue)}>Go</button>
			</div>
		</div>
	);
}
