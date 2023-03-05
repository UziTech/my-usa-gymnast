
const cache: {[index: string]: [any, boolean]} = {};

function fetchUrl(u: string) {
	return fetch(u, {
		headers: { accept: "application/json" },
	}).then(r => r.ok && r.json());
}

function setCache(u: string) {
	cache[u][0] = fetchUrl(u).then(r => {
		cache[u][0] = r;
		cache[u][1] = true;
		return r;
	});
}

export async function fetchJson<T>(urls: Array<string | [string, boolean]>): Promise<T | undefined> {
	const responses = await Promise.all(urls.map(url => {
		if (Array.isArray(url)) {
			const shouldCache = url[1];
			url = url[0];
			if (shouldCache) {
				if (!cache[url]) {
					cache[url] = [null, false];
					setCache(url);
				} else if (cache[url][1] && !cache[url][0]) {
					// try again
					setCache(url);
				}
				return cache[url][0];
			}
		}

		return fetchUrl(url);
	}));
	// only return data if all urls succeeded
	if (responses.every(Boolean)) {
		return responses as T;
	}
}
