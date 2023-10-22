import { ActionArgs, LoaderFunction } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { Calendar } from "~/components/calendar";
import { getUserId } from "~/utils/session.server";
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { deleteRecordById, getAllRecords } from "~/utils/records.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return null;
  }
  const records = await getAllRecords(userId);
  return records;
};

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  const idToDelete = form.get("id");
  console.log(idToDelete);
  await deleteRecordById(idToDelete);
  return null;
};

export default function Records() {
  const d = useLoaderData();
  console.log(d);
  return (
    <>
      <div>Records</div>
      <div>
        <Link to="new">Add record +</Link>
      </div>
      {d.map((e) => (
        <div key={e.id}>
          {e.description} {e.plannedStartTime} {e.client.firstName}{" "}
          {e.client.lastName}
          <Form method="post">
            <input type="hidden" name="id" defaultValue={e.id} />
            <button>remove</button>
          </Form>
        </div>
      ))}
      {/* <Calendar /> */}
      {/* <Test errorElement={<ErrorBoundary />} */}
      <Outlet />
    </>
  );
}
// todo - USE !!!!!!!!!!!!!! calendar for new records. It will automatically add date and time
// pagination

// todo -approximate time to procedurs to show if one cover another
// new Error Handling

// todo !!!!!!!!!!!!!!!!!!!!!!!! error Handling as modal under calender, not instead
// todo - then dispatch - revert() function

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(1, error);
  console.log("isRouteErrorResponse", isRouteErrorResponse(error));
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
        <p>{error.data}</p>
      </div>
    );
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  function isDefinitelyAnError(error: unknown) {
    console.log(22222, error);
    return error && (error instanceof Error || "message" in error);
  }
  let errorMessage = "Unknown error";
  if (isDefinitelyAnError(error)) {
    errorMessage = error.message;
  }

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
    </div>
  );
}
