import { User } from "@prisma/client";
import {
  ActionArgs,
  LoaderFunction,
  V2_MetaFunction,
  json,
} from "@remix-run/node";
import {
  Form,
  Link,
  Outlet,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useRouteLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { Layout } from "~/components/layout";
import { TopBar } from "~/components/top-bar";
import { summarizeTransactions } from "~/helpers/calculations";
import { getUser, requireUserId } from "~/utils/session.server";
import { getAllBusinessesWithServicesByOwnerId } from "~/utils/structure.server";

// todo - button "Now" when we fill Date-time inputs
// todo - remove unnecessary imports
export const meta: V2_MetaFunction = () => {
  return [{ title: "Kapusta App" }];
};
export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return;
  // todo - cache data, not fetch very often (after every form submit)
  // console.log("fetching all transactions");
  // todo - do we need to get access to businesses here ????
  const businessStructure = await getAllBusinessesWithServicesByOwnerId(
    user.id
  );
  return json({ user, businessStructure });
};
// export const action = async ({ request }: ActionArgs) => {
//   // remove then unnecessary fetch
//   const ownerId = await requireUserId(request);
//   const form = await request.formData();
//   console.log("first", form);

//   let allExpenses;
//   let allIncomes;
//   if (ownerId) {
//     console.log(111);
//     allExpenses = await getAllExpensesByUserId(ownerId);
//     allIncomes = await getAllIncomesByUserId(ownerId);
//   }
//   // console.log(11111, allExpenses);
//   // using this method we use carefully fetch to all expenses/incomes
//   // todo - redirect to current page or remove redirect at all
//   return json({ allExpenses, allIncomes });
// };
export default function Index() {
  const navigation = useNavigation();
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = navigation.state === "loading";

  // todo - smth like React context
  // useOutletContext
  // useRouteLoaderData
  // useMatches
  // React.createContext

  const { user }: { user: Pick<User, "id" | "email" | "profile"> } =
    useLoaderData();

  // console.log(allExpenses);
  // console.log(allIncomes);
  // const url = `${user.id}/transactions`;
  // console.log("dashboard rerender");

  return (
    <>
      {/* <Form action="" method="post">
        <button type="submit">get all balance</button>
      </Form> */}

      {/* todo - vertical side open-close navigation */}
      <Layout user={user}>
        {isLoading && <h1 className="absolute">Loading...</h1>}
        <Link to="/" title="" aria-label="">
          <h1>Home page</h1>
        </Link>

        <Link to="structure" title="" aria-label="" className="outline mr-3">
          &nbsp;* business structure
        </Link>

        <Link
          to="transactions/expenses"
          title=""
          aria-label=""
          className="outline mr-3"
        >
          &nbsp;* transactions(incomes/expenses)
        </Link>

        <Link to="business" title="" aria-label="" className="outline mr-3">
          &nbsp;* business(clients/records)
        </Link>

        {/* <Link to="abc" title="" aria-label="" className="outline mr-3">
          &nbsp;* TEST PAGE - link
        </Link> */}

        <Outlet />
      </Layout>
    </>
  );
}

// todo - Balance - separate document with total expenses and total incomes value ????? --- to prevent fetch of ALL expenses and incomes

// todo- 404 beautifu
