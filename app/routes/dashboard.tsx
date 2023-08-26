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
  useLoaderData,
} from "@remix-run/react";
import { Layout } from "~/components/layout";
import { TopBar } from "~/components/top-bar";
import { summarizeTransactions } from "~/helpers/calculations";
import { getUser, requireUserId } from "~/utils/session.server";
import {
  getAllExpensesByUserId,
  getAllIncomesByUserId,
} from "~/utils/transaction.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};
export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return;
  // todo - cache data, not fetch very often (after every form submit)
  // console.log("fetching all transactions");
  const allExpenses: Pick<Transaction, "value">[] =
    await getAllExpensesByUserId(user.id);
  const allIncomes: Pick<Transaction, "value">[] = await getAllIncomesByUserId(
    user.id
  );
  // console.log(user);
  return json({ user, allExpenses, allIncomes });
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
  const {
    user,
    allExpenses,
    allIncomes,
  }: {
    user: User;
    allExpenses: Pick<Transaction, "value">[];
    allIncomes: Pick<Transaction, "value">[];
  } = useLoaderData();

  // console.log(allExpenses);
  // console.log(allIncomes);
  // const url = `${user.id}/transactions`;
  // console.log("dashboard rerender");
  const balance: IBalance =
    summarizeTransactions(allIncomes) - summarizeTransactions(allExpenses);

  return (
    <>
      {/* <Form action="" method="post">
        <button type="submit">get all balance</button>
      </Form> */}
      <Layout user={user}>
        <Link to="/" title="" aria-label="">
          <h1>Home page</h1>
        </Link>
        <Link to="transactions" title="" aria-label="">
          transactions - link
        </Link>
        <div>
          <Link to="abc" title="" aria-label="">
            TEST PAGE - link
          </Link>
        </div>
        <TopBar balance={balance} />
        <Outlet />
      </Layout>
    </>
  );
}

// todo - Balance - separate document with total expenses and total incomes value ????? --- to prevent fetch of ALL expenses and incomes
