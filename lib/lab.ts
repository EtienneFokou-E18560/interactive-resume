/** Public WebSocket URL for the local Engineering Lab gateway. */
export function getLabWsUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_LAB_WS_URL?.trim();
  return url || null;
}

export function isLabEnabled(): boolean {
  return Boolean(getLabWsUrl());
}
