import { useState } from "react";
import {
	ZipProps,
	clubType,
	zipLocation,
} from "./types";
import clubObj from "./clubs.json";
import zips from "./zips.json";

const allClubs: clubType[] = Object.values(clubObj).filter(c => c.zip);

function findClosestZip(zip: string) {
	if (!zip.match(/^\d{5}$/)) {
		// eslint-disable-next-line no-console
		console.log(`'${zip}' is not 5 numbers`);

		return;
	}

	for (let i = 0; i <= 10; i++) {
		const sUp = (+zip + i).toString().padStart(5, "0");
		if (sUp in zips) {
			return sUp;
		}
		const sDown = (+zip - i).toString().padStart(5, "0");
		if (sDown in zips) {
			return sDown;
		}
	}
}

function distance(zip1: string, zip2: string) {
	zip1 = zip1.substring(0, 5);
	zip2 = zip2.substring(0, 5);
	const zipFrom: string | undefined = findClosestZip(zip1);
	const zipTo: string | undefined = findClosestZip(zip2);

	if (!zipFrom) {
		// eslint-disable-next-line no-console
		console.log(`No zip code '${zip1}'`);
		return 0;
	} else if (zipFrom !== zip1) {
		// eslint-disable-next-line no-console
		console.log(`'${zipFrom}' used instead of '${zip1}'`);
		alert(`'${zipFrom}' used instead of '${zip1}'`);
	}

	if (!zipTo) {
		// eslint-disable-next-line no-console
		console.log(`Cannot find zip '${zip2}'`);
		return Infinity;
	} else if (zipTo !== zip2) {
		// eslint-disable-next-line no-console
		console.log(`'${zipTo}' used instead of '${zip2}'`);
	}

	const from: zipLocation = zips[zipFrom as keyof typeof zips];
	const to: zipLocation = zips[zipTo as keyof typeof zips];

	const d = Math.sqrt((from.lat - to.lat) ** 2 + (from.lng - to.lng) ** 2);

	return d;
}
// get zip from location
export default function Zip({zipCode}: ZipProps): JSX.Element {
	const [zip, setZip] = useState<string>(zipCode);

	const clubs: clubType[] = zip.match(/^\d{5}$/) ? allClubs.map(c => {
		const validZip = c.zip.match(/^\d{5}/);
		if (!validZip) {
			// eslint-disable-next-line no-console
			console.log("Not valid zip", c);
		}

		return {
			...c,
			distance: validZip ? distance(zip, c.zip) : -1,
		};
	}).filter(c => c.distance > -1).sort((a, b) => {
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
						const fullAddress = `${c.address1}, ${c.city}, ${c.state} ${c.zip}`;
						return (
							<li key={c.clubId}>
								<a href={`https://www.google.com/search?q=${encodeURIComponent(c.name)}`}>{c.name}</a><br />
								{c.address1 ? <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${c.name}, ${fullAddress}`)}`}>{fullAddress}</a> : fullAddress}<br />
								{c.website ? <a href={c.website}>{c.website}</a> : null}
								<hr />
							</li>
						);
					})
				}
			</ul>
		</div>
	);
}
