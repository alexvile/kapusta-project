import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect("expenses");
};
// can we use 2 components _index and tsx component ????
