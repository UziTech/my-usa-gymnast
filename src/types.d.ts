export interface PersonProps {
	id: number|string
}

export interface SearchProps {
	search: number|string|null
	name: string|null
}

interface person {
	personId: number
	firstName: string
	lastName: string
	gender: string
	clubId: number
	dob?: string
	city?: string
	state?: string
	zip?: string
	country?: string
}

interface club {
	clubId: number
	name: string
	shortName?: string
	address1?: string
	address2?: string|null
	city?: string
	state?: string
	zip?: string
	website?: string
	emailAddress?: string
	phone?: number
	fax?: number
}

interface score {
	eventId: string
	program: string
	sanctionId?: number
	place?: string
	rank?: number
	personId?: number
	resultSetId?: number
	clubId?: number
	attempt?: string
	difficulty?: string|null
	execution?: string|null
	deductions?: string|null
	finalScore?: string|null
	sessionId?: string
	level?: string
	division?: string
}

type squad = "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"I"

export type squadLetter = `squad${squad}`

interface sanctionPeople {
	sanctionId: number
	personId: number
	clubId: number
	sessionId: string
	level: string
	division: string
	program: string
	squad: squad
	flight: string
}

interface sanction {
	sanctionId: number
	name: string
	startDate: string
	endDate: string
	address1: string
	address2: string|null
	city: string
	state: string
	zip: string
	status: string
	type: string
	siteName: string
	siteLink: string
	disciplineTypeId: 1|2
	meetStatus: string
	time1: string
	time2: string
	time3: string
	time4: string
	apikey: string
	vendorApiKey: string
	feature: string|null
	logoUrl: string|null
	bannerImageUrl: string|null
	hidden: 1|0
	featuredEventId: string|null
}

export interface personData {
  person: person
  club: club
  scores: score[]
  sanctions: {[index: string]: sanction}
  sanctionPeople: sanctionPeople[]
}

export interface SanctionProps {
	person: personData
	id: number
}

interface session {
	sessionId: string
	sanctionId: number
	name: string
	date: string
	time1: string
	time2: string
	time3: string
	time4: string
	squadA?: string
	squadB?: string
	squadC?: string
	squadD?: string
	squadE?: string
	squadF?: string
	squadG?: string
	squadH?: string
	squadI?: string
	program: string
}

interface sessionResultSet {
	resultSetId: number
	sessionId: string
	sanctionId: number
	level: string
	division: string
	official: number
	status: null|string
}

interface sanctionClub {
	sanctionId: number
	clubId: number
	clubMeetId: number
	clubShortName: string
}

export interface sanctionData {
  sanction: sanction
  sessions: session[]
  sessionResultSets: sessionResultSet[]
  people: {[index: string]: person}
  sanctionPeople: {[index: string]: sanctionPeople}
  clubs: {[index: string]: club}
  sanctionClubs: {[index: string]: sanctionClub}
}

export interface eventsByProgramData {
	[index: string]: {
		[index: string]: {
			shortName?: string
			name?: string
			longName?: string
		} | undefined
	} | undefined
}

export interface peopleData {
	name: string
	id: number
}
