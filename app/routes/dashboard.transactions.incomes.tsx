import { LoaderArgs, LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return null;
};

export default function Incomes() {
  return (
    <>
      <div>Incomes</div>
    </>
  );
}
