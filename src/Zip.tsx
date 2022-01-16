import { useState } from "react";
// import {
// } from "./types";
import clubObj from "./clubs.json";
import zips from "./zips.json";

const allClubs: clubType[] = Object.values(clubObj).filter(c => c.zip);

interface zipLocation {
	lng: number
	lat: number
}

interface clubType {
	clubId: number
	name: string
	shortName: string | null
	address1: string
	address2: string| null
	city: string
	state: string
	zip: string
	website: string | null
	emailAddress: string | null
	phone: number | null
	fax: number | null
	distance?: number
}

function distance(zip1: string, zip2: string) {
	const from: zipLocation = zips[zip1.substring(0, 5) as keyof typeof zips];
	const to: zipLocation = zips[zip2.substring(0, 5) as keyof typeof zips];

	if (!from) {
		// console.log(`No zip code '${zip1}'`);
		return 0;
	}

	if (!to) {
		// console.log(`Cannot find zip '${zip2}'`);
		return Infinity;
	}

	const d = Math.sqrt((from.lat - to.lat) ** 2 + (from.lng - to.lng) ** 2);

	return d;
}

export default function Zip(): JSX.Element {
	const [zip, setZip] = useState<string>("");

	const clubs: clubType[] = zip.match(/^\d{5}$/) ? allClubs.map(c => {
		return {
			...c,
			distance: distance(zip, c.zip),
		};
	}).sort((a, b) => {
		return a.distance - b.distance;
	}) : [];

	return (
		<div className="zip">
			<p>
				<label>
					Enter a zip:
					<input value={zip} onChange={(e) => setZip(e.target.value)} />
				</label>
			</p>
			<ul>
				{
					clubs.map(c => {
						return (
							<li key={c.clubId}>
								{c.name}<br />{c.address1}, {c.city}, {c.state} {c.zip}<br />{c.website ? <a href={c.website}>{c.website}</a> : null}
								<hr />
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}
