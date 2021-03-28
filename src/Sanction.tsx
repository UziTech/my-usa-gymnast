import { useState, useEffect } from "react";
import { useFetch } from "react-async";
import {
	SanctionProps,
	sanctionData,
	eventsByProgramData,
	squadLetter,
} from "./types";

const eventsByProgram: eventsByProgramData = {
	Women: {
		aa: {shortName: "AA", name: "AA", longName: "All Around"},
		1: {shortName: "VT", name: "Vault", longName: "Vault"},
		2: {shortName: "UB", name: "Bars", longName: "Bars"},
		3: {shortName: "BB", name: "Beam", longName: "Beam"},
		4: {shortName: "FX", name: "Floor", longName: "Floor"},
	},
	Men: {
		aa: {shortName: "AA", name: "AA", longName: "All Around"},
		1: {shortName: "FX", name: "Floor", longName: "Floor"},
		2: {shortName: "PH", name: "Pommel", longName: "Pommel"},
		3: {shortName: "SR", name: "Rings", longName: "Rings"},
		4: {shortName: "VT", name: "Vault", longName: "Vault"},
		5: {shortName: "PB", name: "P Bars", longName: "P Bars"},
		6: {shortName: "HB", name: "H Bar", longName: "H Bar"},
	},
};

const query = new URLSearchParams(window.location.search);
const SHOW_DETAILED_SCORES = query.get("detail") !== null;

function toTime(time: string): string {
	const match = time.match(/(\d\d):(\d\d)(?::\d\d)?/);
	if (!match) {
		return time;
	}

	return `${match[1].replace(/^0/, "")}:${match[2]}`;
}

function toDate(date: string): string {
	const match = date.match(/(\d\d\d\d)-(\d\d)-(\d\d)/);
	if (!match) {
		return date;
	}

	return toLocalDate(date).toDateString();
}

function toShortDate(date: string): string {
	const match = date.match(/(\d\d\d\d)-(\d\d)-(\d\d)/);
	if (!match) {
		return date;
	}

	return toLocalDate(date).toLocaleDateString();
}

function toLocalDate(date: string) {
	const datetime = new Date(date);
	datetime.setHours(datetime.getUTCHours());
	datetime.setDate(datetime.getDate() + 1);
	return datetime;
}

function isToday(startDate: string, endDate: string) {
	const startDay = toLocalDate(startDate);
	startDay.setDate(startDay.getDate() - 2);
	if (startDay.getTime() < Date.now()) {
		const endDay = new Date(endDate);
		endDay.setDate(endDay.getDate() + 2);
		return endDay.getTime() > Date.now();
	}
	return false;
}

export default function Sanction({person, id}: SanctionProps): JSX.Element {
	const [loaded, setLoaded] = useState(false);
	const { data, error, isPending, run } = useFetch<sanctionData>(
		`https://uzitech.com/cbp/?url=https://api.myusagym.com/v2/sanctions/${id}`,
		{headers: { accept: "application/json" }},
		{defer: true},
	);

	const sanction = person.sanctions[id];

	useEffect(() => {
		if (isToday(sanction.startDate, sanction.endDate)) {
			setLoaded(true);
			run();
		}
	}, [setLoaded, run, sanction]);

	if (!loaded) {
		return (
			<li className="sanction sanction-button"><button onClick={() => { setLoaded(true); run(); }}>Load {sanction.name} {toShortDate(sanction.startDate)}-{toShortDate(sanction.endDate)}</button></li>
		);
	}

	if (isPending && !data) {
		return (
			<li className="sanction"><h3>Loading {sanction.name}...</h3></li>
		);
	}

	if (error) {
		return (
			<li className="sanction error"><h3>{error.message}</h3><button onClick={run}>Refresh</button></li>
		);
	}

	if (!data) {
		return (
			<li className="sanction error"><h3>No data for {sanction.name}</h3><button onClick={run}>Refresh</button></li>
		);
	}

	const sanctionPeople = person.sanctionPeople.find(s => s.sanctionId === id);
	if (!sanctionPeople) {
		return (
			<li className="sanction error">Cannot find sanctionPeople</li>
		);
	}
	const totalSessionPeople = Object.values(data.sanctionPeople).filter(s =>
		s.sessionId === sanctionPeople.sessionId &&
		s.level === sanctionPeople.level &&
		s.division === sanctionPeople.division,
	).length;
	const session = data.sessions.find(s => s.sessionId === sanctionPeople.sessionId);
	if (!session) {
		return (
			<li className="sanction error">Cannot find session<br /><button onClick={run}>Refresh</button></li>
		);
	}
	const sessionResultSet = data.sessionResultSets.find(s =>
		s.sessionId === sanctionPeople.sessionId &&
		s.level === sanctionPeople.level &&
		s.division === sanctionPeople.division,
	);
	const squad = `squad${sanctionPeople.squad}` as squadLetter;
	const squadOrder = session[squad] || "";
	const order = Array.from(squadOrder).reduce<{[event: string]: number}>((o, e, i) => {
		o[e] = i + 1;
		return o;
	}, {});

	const scores = person.scores.filter(s => s.sanctionId === id && s.resultSetId === sessionResultSet?.resultSetId);
	for (const event of Array.from(squadOrder)) {
		const hasEventScore = scores.some(s => s.eventId === event);
		if (!hasEventScore) {
			scores.push({
				eventId: event,
				program: session.program,
			});
		}
	}
	scores.sort((a, b) => {
		if (a.resultSetId && b.resultSetId) {
			return a.resultSetId - b.resultSetId;
		}

		if (a.eventId in order && b.eventId in order) {
			return order[a.eventId] - order[b.eventId];
		}

		if (a.eventId in order) {
			return -1;
		}

		if (b.eventId in order) {
			return 1;
		}

		return 0;
	});

	const showDifficulty = SHOW_DETAILED_SCORES && scores.some(s => s.difficulty);
	const showExecution = SHOW_DETAILED_SCORES && scores.some(s => s.execution);
	const showDeductions = SHOW_DETAILED_SCORES && scores.some(s => s.deductions);
	const showFinalScore = scores.some(s => s.finalScore);
	const showPlace = scores.some(s => s.place);

	return (
		<li className="sanction">
			<h3 className="sanctionName">
				<a href={`https://myusagym.com/meets/live/${id}/`}>{sanction.name}</a>
			</h3>
			<h5 className="site">
				<a className="siteName" href={sanction.siteLink}>{sanction.siteName}</a>
				<br />
				<a className="siteAddress" href={`https://maps.google.com?q=${encodeURIComponent(`${sanction.address1}, ${sanction.city}, ${sanction.state} ${sanction.zip}`)}`}>
					{sanction.address1}, {sanction.city}, {sanction.state} {sanction.zip}
				</a>
			</h5>
			<h3 className="level">Level {sanctionPeople.level}<br />{sanctionPeople.division}</h3>
			<div className="date">
				{toDate(session.date)}<br />
				{toTime(session.time1)} {sanction.time1}<br />
				{toTime(session.time2)} {sanction.time2}<br />
				{toTime(session.time3)} {sanction.time3}<br />
				{toTime(session.time4)} {sanction.time4}
			</div>
			<br />
			{ sessionResultSet ? <a className="startList" href={`https://myusagym.com/meets/live/${id}/results/${sessionResultSet.resultSetId}/`}>All Scores</a> : null}
			<br />
			<br />
			<div className="scores">
				<table>
					<thead>
						<tr>
							<th><button onClick={run} className="refresh" disabled={isPending}>{isPending ? "..." : "Refresh"}</button></th>
							{showDifficulty ? <th>Difficulty</th> : null}
							{showExecution ? <th>Execution</th> : null}
							{showDeductions ? <th>Deduction</th> : null}
							{showFinalScore ? <th>{SHOW_DETAILED_SCORES ? "Final" : "Score"}</th> : null}
							{showPlace ? <th>Place</th> : null}
						</tr>
					</thead>
					<tbody>
						{scores.map(score => {
							const event = eventsByProgram[score.program]?.[score.eventId]?.longName;
							return (
								<tr key={`${score.eventId} ${score.resultSetId}`}>
									<th className="event">{score.eventId in order ? `${order[score.eventId]}. ` : ""}{event || `Unknown Event ${score.eventId}`}</th>
									{showDifficulty ? <td className="difficulty">{score.difficulty || ""}</td> : null}
									{showExecution ? <td className="execution">{score.execution || ""}</td> : null}
									{showDeductions ? <td className="deductions">{score.deductions || ""}</td> : null}
									{showFinalScore ? <td className="finalScore">{score.finalScore || ""}</td> : null}
									{showPlace ? <td className="place">{score.place ? `${score.place} of ${totalSessionPeople}` : ""}</td> : null}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</li>
	);
}

/*
https://api.myusagym.com/v2/sanctions/76009

{
  "sanction": {
    "sanctionId": 76009,
    "name": "Twin Cities Invite",
    "startDate": "2021-01-23",
    "endDate": "2021-01-24",
    "address1": "5903 Sunnyfield Rd E",
    "address2": null,
    "city": "Minnetrista",
    "state": "MN",
    "zip": "55364",
    "status": "Closed",
    "type": "INVITA",
    "siteName": "Mound Westonka Activity Center",
    "siteLink": "http://mhgmeets.com/",
    "disciplineTypeId": 2,
    "meetStatus": "Session 6 - Awards",
    "time1": "Open Warmup",
    "time2": "Timed Warmup",
    "time3": "March In",
    "time4": "Awards",
    "apikey": "97548729",
    "vendorApiKey": "ad3cdccf-72af-4bb4-a7c6-3ccdde65d2c1",
    "feature": null,
    "logoUrl": null,
    "bannerImageUrl": null,
    "hidden": 0,
    "featuredEventId": null,
    "program": 2,
    "website": "http://mhgmeets.com/"
  },
  "sessions": [
    {
      "sessionId": "6",
      "sanctionId": 76009,
      "name": "Level 5",
      "date": "2021-01-24",
      "time1": "04:30:00",
      "time2": "05:00:00",
      "time3": "05:20:00",
      "time4": "08:35:00",
      "squadA": "123456",
      "squadB": "234561",
      "squadC": "345612",
      "squadD": "456123",
      "squadE": "561234",
      "squadF": "612345",
      "squadG": "",
      "squadH": "",
      "squadI": "",
      "program": "Men"
    }
  ],
  "sessionResultSets": [
    {
      "resultSetId": 109955,
      "sessionId": "6",
      "sanctionId": 76009,
      "level": "51",
      "division": "11+ yrs",
      "official": 0,
      "status": null
    }
  ],
  "people": {
    "1913246": {
      "personId": 1913246,
      "clubId": 24174,
      "firstName": "Logan",
      "lastName": "Brix",
      "dob": null,
      "city": null,
      "state": null,
      "zip": null,
      "country": null,
      "gender": "Male"
    },
  },
  "sanctionPeople": {
    "1913246": {
      "sanctionId": 76009,
      "personId": 1913246,
      "clubId": 24174,
      "sessionId": "6",
      "level": "51",
      "division": "11+ yrs",
      "program": "Men",
      "squad": "B",
      "flight": "A"
    },
  },
  "clubs": {
    "24174": {
      "clubId": 24174,
      "name": "North Crest Kids Activity Center",
      "shortName": "North Crest",
      "address1": "1009 Industrial Drive South",
      "address2": null,
      "city": "Sauk Rapids",
      "state": "MN",
      "zip": "56379",
      "website": "http://www.northcrestkids.com",
      "emailAddress": "pmstone1@gmail.com",
      "phone": 3202513416,
      "fax": 3202517533
    },
  },
  "sanctionClubs": {
    "24174": {
      "sanctionId": 76009,
      "clubId": 24174,
      "clubMeetId": 27,
      "clubShortName": "North Crest"
    },
  }
}
 */
