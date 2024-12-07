import React, {useRef, useEffect, useState, ReactElement} from "react";
import Person from "./Person";
import Search from "./Search";
import Zip from "./Zip";
import SearchSanction from "./SearchSanction";
import { AppContextProvider } from "./AppContext";

function throttle(func: (...args: unknown[]) => void, wait = 100) {
	let waiting = false;
	let shouldCall = false;
	return function (this: unknown, ...args: unknown[]) {
		if (waiting) {
			shouldCall = true;
			return;
		}
		const callFunc = () => {
			waiting = true;
			shouldCall = false;
			setTimeout(() => {
				waiting = false;
				if (shouldCall) {
					callFunc();
				}
			}, wait);
			func.call(this, ...args);
		};
		callFunc();
	};
}

function render(children: ReactElement) {
	return (
		<>
		<header>
			<a href="?">Home</a>
		</header>
		{children}
		</>
	)
}

export default function App() {
	const [hasLeft, setHasLeft] = useState(false);
	const [hasRight, setHasRight] = useState(false);
	const persons = useRef<HTMLDivElement>(null);
	const leftArrow = useRef<HTMLButtonElement>(null);
	const rightArrow = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (persons.current) {
			toggleArrows();
			persons.current.addEventListener("scroll", throttle(toggleArrows), {passive: true});
		}
	}, [persons]);

	function toggleArrows() {
		if (persons.current) {
			const padding = persons.current.clientWidth / 2;
			setHasRight(persons.current.scrollWidth - persons.current.scrollLeft - padding >= persons.current.clientWidth);
			setHasLeft(persons.current.scrollLeft - padding > 0);
		}
	}

	function scrollLeft() {
		if (persons.current) {
			persons.current.scroll({left: persons.current.scrollLeft - window.innerWidth, behavior: "smooth"});
		}
	}

	function scrollRight() {
		if (persons.current) {
			persons.current.scroll({left: persons.current.scrollLeft + window.innerWidth, behavior: "smooth"});
		}
	}

	const query = new URLSearchParams(window.location.search);
	const id = query.get("id");
	if (id) {
		const ids = id.split(",");
		if (ids.length > 0) {
			return render(
				<AppContextProvider>
					<div className="persons" ref={persons}>
						<button onClick={scrollLeft} ref={leftArrow} className={`left arrow ${hasLeft ? "" : "hide"}`}>&lt;</button>
						<button onClick={scrollRight} ref={rightArrow} className={`right arrow ${hasRight ? "" : "hide"}`}>&gt;</button>
						{ids.map(i => {
							return (
								<Person key={i} id={i} />
							);
						})}
					</div>
				</AppContextProvider>
			);
		}
	}

	if (query.has("zip")) {
		const zip = query.get("zip");
		return render(
			<Zip zipCode={zip || ""} />
		);
	}

	const search = query.get("s");

	if (!search) {
		return render(
			<SearchSanction initialPast={query.has("past")} />
		);
	}

	return render(
		<Search search={search} />
	);
}
