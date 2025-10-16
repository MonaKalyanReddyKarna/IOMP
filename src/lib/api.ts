export function withApiBase(path: string): string {
	const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
	if (!base) return path;
	return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
	const url = withApiBase(path);
	const res = await fetch(url, { ...init, method: "GET" });
	if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
	return res.json();
}

export async function apiPost<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
	const url = withApiBase(path);
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
		body: body !== undefined ? JSON.stringify(body) : undefined,
		...init,
	});
	if (!res.ok) throw new Error(`POST ${url} failed: ${res.status}`);
	return res.json();
}
