"use client"

import { createContext, use, memo, ReactNode, useState, ChangeEvent, ChangeEventHandler } from 'react';

import "./mini.css";

export default function Page() {
	return (
		<>
			<h1>レンダリング</h1>
			useStateがあるタグ内で直接呼ぶと全て再レンダリング<br />
			Contextに渡してchlidrenで受け取ると再レンダリングを抑制できる。
			<hr />
			直呼び：<StateAreaDirect /><br />
			直呼び(Memoでレンダリング抑制)：<StateAreaDirectMemo /><br />
			Context経由：<StateAreaInChildren />
			<NoProps name="Top" />
		</>
	);
}

function StateAreaDirect() {
	console.log("StateAreaDirect");
	const [value, setupValue] = useState("");
	return (<><InputValue fn={setupValue} /><ShowValue value={value} /><NoProps name="StateAreaDirect" /></>);
}

function NoProps({ name }: { name: string }) {
	console.log("NoProps", name);
	return "|";
}

function InputValue({ fn }: { fn: (v: string) => void }) {
	console.log("InputValue");
	return (<input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => fn(event.target.value)} />);
}

function ShowValue({ value }: { value: string }) {
	console.log("ShowValue");
	return (<>V={value}</>);
}

function StateAreaDirectMemo() {
	console.log("StateAreaDirectMemo");
	const [value, setupValue] = useState("");
	return (<><InputValueMemo fn={setupValue} /><ShowValue value={value} /><NoProps name="StateAreaDirectMemo" /></>);
}

const InputValueMemo = memo(({ fn }: { fn: (v: string) => void }) => {
	console.log("InputValueMemo");
	return (<input type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => fn(event.target.value)} />);
});
InputValueMemo.displayName = 'InputValueMemo'


function StateAreaInChildren() {
	console.log("StateAreaByProvider");
	return (
		<StatusProvider>
			D=<InputValueByContext />
			E=<InputValueEventByContext />
			E2=<InputValueEventByContextWithValue name="name" />
			<ShowValueByContext />
			<NoProps name="StateAreaInChildren" />
		</StatusProvider>
	);
}

const StatusValueContext = createContext("");
const StatusDispatchContext = createContext((_val: string) => { });

function StatusProvider({ children }: { children: ReactNode }) {
	console.log("StatusProvider");
	const [value, setupValue] = useState("");
	return (
		<StatusValueContext value={value}>
			<StatusDispatchContext value={setupValue}>
				{children}
			</StatusDispatchContext>
		</StatusValueContext>
	);
}

function InputValueByContext() {
	console.log("InputValueByContext");
	const setupValue = use(StatusDispatchContext);
	return (<InputValue fn={setupValue} />);
}

function ShowValueByContext() {
	console.log("ShowValueByContext");
	const value = use(StatusValueContext);
	return (<ShowValue value={value} />);
}

function InputValueEventByContext() {
	console.log("InputValueByContext");
	const setupValue = use(StatusDispatchContext);
	// use(StatusDispatchContext); が変わらないのでuseCallbackが無くても再レンダリングは行われない。
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => setupValue(event.target.value + " def");
	return (<InputValueEvent name="direct" fn={handleChange} />);
}

function InputValueEventByContextWithValue({ name }: { name: string }) {
	console.log("InputValueByContext", name);
	const setupValue = use(StatusDispatchContext);
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => setupValue(event.target.value + " " + name);
	return (<InputValueEvent name="name" fn={handleChange} />);
}

function InputValueEvent({ name, fn }: { name: string, fn: ChangeEventHandler<HTMLInputElement> }) {
	console.log("InputValueEvent " + name);
	return (<input type="text" onChange={fn} />);
}
