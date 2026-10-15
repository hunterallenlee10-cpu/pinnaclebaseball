import { cacheLife } from "next/cache";

/** The current year. Cached and refreshed daily so the static shell never goes stale. */
export async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
