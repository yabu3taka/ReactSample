export function GET() {
	const ret = { now: Date.now() };
	return Response.json(ret);
}
