import { User } from "@prisma/client";
import { LoaderFunction, V2_MetaFunction, json } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigation,
} from "@remix-run/react";
import { MainNavigation } from "~/components/Navigation/MainNavigation";
import { NavLinks, Navigation } from "~/components/Navigation/Navigation";
import { Layout } from "~/components/layout";
import { getUser } from "~/utils/session.server";
import { getAllBusinessesWithServicesByOwnerId } from "~/utils/structure.server";

// todo - button "Now" when we fill Date-time inputs
// todo - remove unnecessary imports
// useOutletContext
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
  const location = useLocation();
  // console.log("location", location);
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = navigation.state === "loading";

  // todo - smth like React context
  // useOutletContext
  // useRouteLoaderData
  // useMatches
  // React.createContext

  const { user }: { user: Pick<User, "id" | "email" | "profile"> } =
    useLoaderData();

  // const url = `${user.id}/transactions`;
  // console.log("dashboard rerender");
  const links = [
    // { to: "/", label: "Home page", end: false, icon: "home" },
    { to: "structure", label: "Business structure", icon: "home" },
    // think about preventing extra fetch by toggling transaction subroutes
    { to: "incomes", label: "Incomes", icon: "home" },
    { to: "expenses", label: "Expenses", icon: "home" },
    { to: "reports", label: "Reports", icon: "chart" },
    { to: "clients", label: "Clients", icon: "home" },
    { to: "records", label: "Records", icon: "home" },
  ];

  // use styles from dribble !!!!
  return (
    <>
      {/* <Form action="" method="post">
        <button type="submit">get all balance</button>
      </Form> */}
      {/* todo - vertical side open-close navigation */}
      <Layout user={user}>
        {/* {isLoading && <h1 className="absolute">Loading...</h1>} */}
        {/* better structure */}
        <aside className="bg-[#001D22]">
          <div className="text-white bg-gray-400">Logo</div>
          <Navigation navLinks={links} style="main" />
        </aside>
        {/* <Link to="abc" title="" aria-label="" className="outline mr-3">
          &nbsp;* TEST PAGE - link
        </Link> */}
        <div className="container1 flex-grow">
          <div className="bg-[#F0F7F4] border-y-2 border-[#E0E9E7] py-3 mb-2">
            Show active tab
          </div>
          <Outlet />
        </div>
      </Layout>
    </>
  );
}

// todo - Balance - separate document with total expenses and total incomes value ????? --- to prevent fetch of ALL expenses and incomes

// todo- 404 beautifu
