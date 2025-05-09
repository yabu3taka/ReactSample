"use client"

import { createContext, use, ReactNode, useState } from 'react';

export default function Page() {
	return (
		<>
			<h1>レンダリング</h1>
			C1/C2それぞれ必要なもののみ再レンダリング。ボタンは再レンダリングされない<br />
			C1Provider/C2Providerまとめて呼ぶThisPageContextを作っても問題なし。<br />
			ValueとDispatchを一纏めにするとボタンも再レンダリング。<br />
			<hr />
			<ThisPageContext>
				<C1Button>テスト1</C1Button> C1=<C1Value /><br />
				<C2Button>テスト2</C2Button> C2=<C2Value /><br />
				<C3Button>テスト3(ValueとDispatchを一纏め)</C3Button> C3=<C3Value /><br />
			</ThisPageContext>
		</>
	);
}

const C1ValueContext = createContext(1);
const C1DispatchContext = createContext((_val: number) => { });

const C2ValueContext = createContext(1);
const C2DispatchContext = createContext((_val: number) => { });

const C3ValueDispatchContext = createContext({ value: 1, setupValue: (_val: number) => { } });

function ThisPageContext({ children }: { children: ReactNode }) {
	console.log("ThisPageContext");
	return (
		<C1Provider>
			<C2Provider>
				<C3Provider>
					{children}
				</C3Provider>
			</C2Provider>
		</C1Provider>
	);
}

function C1Provider({ children }: { children: ReactNode }) {
	console.log("C1Provider");
	const [value, setupValue] = useState(1);
	return (
		<C1ValueContext value={value}>
			<C1DispatchContext value={setupValue}>
				{children}
			</C1DispatchContext>
		</C1ValueContext>
	);
}

function C2Provider({ children }: { children: ReactNode }) {
	console.log("C2Provider");
	const [value, setupValue] = useState(1);
	return (
		<C2ValueContext value={value}>
			<C2DispatchContext value={setupValue}>
				{children}
			</C2DispatchContext>
		</C2ValueContext>
	);
}

function C3Provider({ children }: { children: ReactNode }) {
	console.log("C3Provider");
	const [value, setupValue] = useState(1);
	return (
		<C3ValueDispatchContext value={{ value, setupValue }}>
			{children}
		</C3ValueDispatchContext>
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

function C3Button({ children }: { children: ReactNode }) {
	console.log("C3Button");
	const { setupValue } = use(C3ValueDispatchContext);
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

function C3Value() {
	console.log("C3Value");
	const { value } = use(C3ValueDispatchContext);
	return value;
}
