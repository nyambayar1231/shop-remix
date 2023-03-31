import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  return json({});
}

export default function SalesOverview() {
  return (
    <div>
      <h1>Overview</h1>
    </div>
  );
}
