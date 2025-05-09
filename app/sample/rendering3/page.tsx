"use client"

import { createContext, use, ReactNode, useState, useCallback } from 'react';

export default function Page() {
	return (
		<>
			<h1>レンダリング</h1>
			useCallbackの必要性
			<hr />
			<ThisPageContext>
				<C1Button>テスト1(callbackなし)</C1Button> C1=<C1Value /><br />
				<C2Button>テスト2</C2Button> C2=<C2Value />
			</ThisPageContext>
		</>
	);
}

const C1ValueContext = createContext(1);
const C1DispatchContext = createContext((_val: number) => { });

const C2ValueContext = createContext(1);
const C2DispatchContext = createContext((_val: number) => { });

function C1Provider({ children }: { children: ReactNode }) {
	console.log("C1Provider");
	const [value, setupValue] = useState(1);
	const setupValueCb = (val: number) => setupValue(val);
	return (
		<C1ValueContext value={value}>
			<C1DispatchContext value={setupValueCb}>
				{children}
			</C1DispatchContext>
		</C1ValueContext>
	);
}

function C2Provider({ children }: { children: ReactNode }) {
	console.log("C2Provider");
	const [value, setupValue] = useState(1);
	const setupValueCb = useCallback((val: number) => setupValue(val), [setupValue]);
	return (
		<C2ValueContext value={value}>
			<C2DispatchContext value={setupValueCb}>
				{children}
			</C2DispatchContext>
		</C2ValueContext>
	);
}

function C1Button({ children }: { children: ReactNode }) {
	console.log("C1Button");
	const setupValue = use(C1DispatchContext);
	return (<button onClick={() => setupValue(Date.now())}>{children}</button>);
}

function C2Button({ children }: { children: ReactNode }) {
	console.log("C2Button");
	const setupValue = use(C2DispatchContext);
	return (<button onClick={() => setupValue(Date.now())}>{children}</button>);
}

function C1Value() {
	console.log("C1Value");
	const value = use(C1ValueContext);
	return value;
}

function C2Value() {
	console.log("C2Value");
	const value = use(C2ValueContext);
	return value;
}

function ThisPageContext({ children }: { children: ReactNode }) {
	console.log("ThisPageContext");
	return (
		<C1Provider>
			<C2Provider>
				{children}
			</C2Provider>
		</C1Provider>
	);
}
