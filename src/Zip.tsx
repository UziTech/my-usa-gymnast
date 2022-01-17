import { useState } from "react";
import {
	ZipProps,
	clubType,
	zipLocation,
} from "./types";
import clubObj from "./clubs.json";
import zips from "./zips.json";

const allClubs: clubType[] = Object.values(clubObj).filter(c => c.zip);

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
// get zip from location
export default function Zip({zipCode}: ZipProps): JSX.Element {
	const [zip, setZip] = useState<string>(zipCode);

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
