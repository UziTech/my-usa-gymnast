
let nextId = 0;
let cache: {[index: string]: [number, boolean, any]} = {};

function fetchUrl(u: string) {
	return fetch(u, {
		headers: { accept: "application/json" },
	}).then(r => r.ok && r.json());
}

function setCache(u: string) {
	const id = nextId++;
	cache[u] = [
		id,
		false,
		fetchUrl(u).then(r => {
			if (!cache[u] || cache[u][0] !== id) {
				// cache was cleared or retried
				return;
			}

			cache[u][1] = true;
			cache[u][2] = r;
			return r;
		})
	];
}

export async function clearCache(url?: string, force?: boolean) {
	await Promise.all(Object.keys(cache).map(async (u) => {
		if (url && u !== url) {
			return;
		}

		if (!cache[u][1] && !force) {
			const id = cache[u][0];
			await cache[u][2];
			if (!cache[u] || cache[u][0] !== id) {
				// cache force cleared while awaiting
				return;
			}
		}

		delete cache[u];
	}));
}

export async function fetchJson<T>(urls: Array<string | [string, boolean]>): Promise<T | undefined> {
	const responses = await Promise.all(urls.map(url => {
		if (Array.isArray(url)) {
			const shouldCache = url[1];
			url = url[0];
			if (shouldCache) {
				if (!cache[url] || (cache[url][1] && !cache[url][2])) {
					setCache(url);
				}
				return cache[url][2];
			}
		}

		return fetchUrl(url);
	}));
	// only return data if all urls succeeded
	if (responses.every(Boolean)) {
		return responses as T;
	}
}
