import { useAsync } from "react-use";
import Sanction from "./Sanction";
import {
	PersonProps,
	personData,
} from "./types";

// const T = true;

export default function Person({id}: PersonProps): JSX.Element {
	const {value: data, error, loading} = useAsync<() => Promise<personData | undefined>>(async () => {
		if (id) {
			const response = await fetch(`https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/people/${id}`, {
				headers: { accept: "application/json" },
			});
			if (response.ok) {
				return await response.json() as personData;
			}
		}
	});

	if (loading) {
		return (
			<div className="person">Loading...</div>
		);
	}

	if (error) {
		return (
			<div className="person error">{error.message}</div>
		);
	}

	if (!data) {
		return (
			<div className="person error">No data for this person.</div>
		);
	}

	return (
		<div className="person">
			<h1 className="name">{data.person.firstName} {data.person.lastName}</h1>
			<ul className="sanctions">
				{Object.keys(data.sanctions).sort((a, b) => {
					const aDate = data.sanctions[a].startDate;
					const bDate = data.sanctions[b].startDate;
					return bDate.localeCompare(aDate);
				}).map(sanctionId =>
					<Sanction key={sanctionId} person={data} id={+sanctionId} />,
				)}
			</ul>
		</div>
	);
}

/*
https://api.myusagym.com/v2/people/1913246

{
	person: {
		personId: 1913246,
		firstName: 'Logan',
		lastName: 'Brix',
		gender: 'Male',
		clubId: 24174
	},
	club: { clubId: 24174, name: 'North Crest Kids Activity Center' },
	scores: [
		{
			eventId: '1',
			sanctionId: 76009,
			place: '16',
			rank: 16,
			personId: 1913246,
			resultSetId: 109955,
			clubId: 24174,
			attempt: '1',
			difficulty: null,
			execution: '7.100',
			deductions: null,
			finalScore: '7.100',
			program: 'Men',
			sessionId: '6',
			level: '51',
			division: '11+ yrs'
		},
		{
			eventId: '2',
			sanctionId: 76009,
			place: '12',
			rank: 12,
			personId: 1913246,
			resultSetId: 109955,
			clubId: 24174,
			attempt: '1',
			difficulty: null,
			execution: '8.900',
			deductions: null,
			finalScore: '8.900',
			program: 'Men',
			sessionId: '6',
			level: '51',
			division: '11+ yrs'
		},
		{
			eventId: '3',
			sanctionId: 76009,
			place: '15',
			rank: 15,
			personId: 1913246,
			resultSetId: 109955,
			clubId: 24174,
			attempt: '1',
			difficulty: null,
			execution: '7.900',
			deductions: null,
			finalScore: '7.900',
			program: 'Men',
			sessionId: '6',
			level: '51',
			division: '11+ yrs'
		},
		{
			eventId: '4',
			sanctionId: 76009,
			place: '20',
			rank: 20,
			personId: 1913246,
			resultSetId: 109955,
			clubId: 24174,
			attempt: '1',
			difficulty: null,
			execution: '8.400',
			deductions: null,
			finalScore: '8.400',
			program: 'Men',
			sessionId: '6',
			level: '51',
			division: '11+ yrs'
		},
		{
			eventId: '5',
			sanctionId: 76009,
			place: '23',
			rank: 23,
			personId: 1913246,
			resultSetId: 109955,
			clubId: 24174,
			attempt: '1',
			difficulty: null,
			execution: '6.400',
			deductions: null,
			finalScore: '6.400',
			program: 'Men',
			sessionId: '6',
			level: '51',
			division: '11+ yrs'
		},
		{
			eventId: '6',
			sanctionId: 76009,
			place: '13T',
			rank: 13,
			personId: 1913246,
			resultSetId: 109955,
			clubId: 24174,
			attempt: '1',
			difficulty: null,
			execution: '6.500',
			deductions: null,
			finalScore: '6.500',
			program: 'Men',
			sessionId: '6',
			level: '51',
			division: '11+ yrs'
		},
		{
			eventId: 'aa',
			sanctionId: 76009,
			place: '15T',
			rank: 15,
			personId: 1913246,
			resultSetId: 109955,
			clubId: 24174,
			attempt: null,
			difficulty: null,
			execution: null,
			deductions: null,
			finalScore: '45.200',
			program: 'Men',
			sessionId: '6',
			level: '51',
			division: '11+ yrs'
		}
	],
	sanctions: {
		'76009': {
			sanctionId: 76009,
			name: 'Twin Cities Invite',
			startDate: '2021-01-23',
			endDate: '2021-01-24',
			address1: '5903 Sunnyfield Rd E',
			address2: null,
			city: 'Minnetrista',
			state: 'MN',
			zip: '55364',
			status: 'Approved',
			type: 'INVITA',
			siteName: 'Mound Westonka Activity Center',
			siteLink: 'http://mhgmeets.com/',
			disciplineTypeId: 2,
			meetStatus: 'Session 6 - Awards',
			time1: 'Open Warmup',
			time2: 'Timed Warmup',
			time3: 'March In',
			time4: 'Awards',
			apikey: '97548729',
			vendorApiKey: 'ad3cdccf-72af-4bb4-a7c6-3ccdde65d2c1',
			feature: null,
			logoUrl: null,
			bannerImageUrl: null,
			hidden: 0,
			featuredEventId: null
		}
	},
	sanctionPeople: [
		{
			sanctionId: 76009,
			personId: 1913246,
			clubId: 24174,
			sessionId: '6',
			level: '51',
			division: '11+ yrs',
			program: 'Men',
			squad: 'B',
			flight: 'A'
		}
	]
}
 */
