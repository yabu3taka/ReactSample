"use client"

import { createContext, use, RefObject, Ref, useRef, useState, useEffect } from 'react';

type DomRefType<T> = RefObject<T | null> | null;
const DomRefContext = createContext<DomRefType<HTMLInputElement>>(null);

function safeDom<T>(domRef: DomRefType<T>, fn: (elm: T) => void) {
	const elm = domRef?.current;
	if (elm) {
		fn(elm);
	}
}

export default function Page() {
	return (
		<>
			<TestArea1 />
			<hr />
			<TestArea2 />
			<hr />
			<TestArea3 />
		</>
	);
}

// =============================================================================
function TestArea1() {
	const domRef = useRef<HTMLInputElement>(null);
	return (
		<section>
			DOMRefをContextに維持できるか<br />
			<DomRefContext value={domRef}>
				<div>
					<ChangeButton />　<BadButton />　<StateButton />　<StateButton2 /><br />
					<TextInput />　<ShowButton />
				</div>
			</DomRefContext>
		</section>
	);
}

function ChangeButton() {
	const domRef = use(DomRefContext);
	return (<button onClick={() => safeDom(domRef, (elm) => elm.value = "change")}>Change</button>);
}

function BadButton() {
	const domRef = use(DomRefContext);
	const elm = domRef?.current;
	const handler = elm ? () => elm.value = "bad" : undefined;
	return (<button onClick={handler}>動かない</button>);
}

function StateButton() {
	const domRef = use(DomRefContext);
	const [num, setNum] = useState(0);
	useEffect(() => safeDom(domRef, (elm) => elm.value = "v:" + num), [domRef, num]);
	return (<button onClick={() => setNum((v) => v + 1)}>CountUp1</button>);
}

function StateButton2() {
	const domRef = use(DomRefContext);
	const [num, setNum] = useState(0);
	useEffect(() => safeDom(domRef, (elm) => elm.value = "v2:" + num), [domRef, num]);
	return (<button onClick={() => setNum((v) => v + 1)}>CountUp2</button>);
}

function ShowButton() {
	const domRef = use(DomRefContext);
	return (<button onClick={() => safeDom(domRef, (elm) => alert(elm.value))}>Show</button>);
}

function TextInput() {
	const domRef = use(DomRefContext);
	return (<input type="text" ref={domRef} defaultValue="10" />);
}

// =============================================================================
function TestArea2() {
	const domRef = useRef<HTMLDivElement>(null);
	return (
		<section>
			Refを子に渡す<br />
			<ChangeUpdatedAreaButton targetRef={domRef} /><br />
			<UpdatedArea ref={domRef}></UpdatedArea>
		</section>
	);
}

function UpdatedArea({ ref }: { ref: Ref<HTMLDivElement> }) {
	return (<div ref={ref}></div>);
}

function ChangeUpdatedAreaButton({ targetRef }: { targetRef: DomRefType<HTMLDivElement> }) {
	return (<button onClick={() => safeDom(targetRef, (elm) => { elm.innerHTML = "test"; })}>Change</button>);
}

// =============================================================================
function TestArea3() {
	const domRef = useRef<HTMLDivElement>(null);
	const [num, setNum] = useState(1);
	return (
		<section>
			Ref先を表示非表示<br />
			{num % 2 == 0 && <div ref={domRef}>value</div>}
			<button onClick={() => setNum((c) => c + 1)}>Toggle</button>
			<button onClick={() => safeDom(domRef, (elm) => alert(elm.innerText))}>Show</button>
		</section>
	);
}
