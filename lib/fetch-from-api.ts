type FetchFromApiOptions = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  nextOptions?: NextFetchRequestConfig;
  queryParams?: Record<string, string | number | boolean>;
};

type NextFetchRequestConfig = {
  revalidate?: number;
  tags?: string[];
  cache?: "no-store" | "force-cache";
};

export async function fetchFromAPI<T = string | number>({
  path,
  method = "GET",
  headers = {},
  nextOptions = { revalidate: 60 },
  queryParams = {},
}: FetchFromApiOptions): Promise<T> {
  const baseUrl = getBaseUrl();

  // Concatena query string
  const query = new URLSearchParams(
    Object.entries(queryParams).reduce(
      (acc, [key, val]) => {
        if (val !== undefined && val !== null) acc[key] = String(val);
        return acc;
      },
      {} as Record<string, string>
    )
  ).toString();

  const url = `${baseUrl}${path}${query ? `?${query}` : ""}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(nextOptions ? { next: nextOptions } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[fetchFromAPI] ${res.status} ${res.statusText}: ${text}`);
    throw new Error(`Erro na API: ${res.status} ${res.statusText}: ${text}`);
  }

  return res.json() as Promise<T>;
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Rodando no client (navegador)
    return "";
  }

  // Rodando no server
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Fallback local
  return "http://localhost:3000";
}
