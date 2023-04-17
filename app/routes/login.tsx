import { ActionArgs } from "@remix-run/node";
import { Link, useActionData, useSearchParams } from "@remix-run/react";
import { Button } from "~/components/button";
import { FormField } from "~/components/form-field";
import { Layout } from "~/components/layout";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { validateEmail, validatePassword } from "~/utils/validators.server";
import { createUserSession, login, register } from "~/utils/session.server";

function validateUrl(url: any) {
  if (typeof url === 'string') {
    let urls = ["/dashboard", "/"];
    if (urls.includes(url)) {
      return url;
    }
  }
  return "/dashboard";
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const email = form.get("email");
  const password = form.get("password");
  const redirectTo = validateUrl(form.get("redirectTo") || "/dashboard");

  if (
    typeof loginType !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const fields = { loginType, email, password };

  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };
  
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  switch (loginType) {
    case "login": {
      const user = await login({ email, password });
      console.log({ user });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `Username/Password combination is incorrect`,
        });
      }

      return createUserSession(user.id, redirectTo);
    }
    case "register": {
      const userExists = await db.user.findFirst({
        where: { email },
      });
      if (userExists) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `User with email ${email} already exists`,
        });
      }
      const user = await register({ email, password });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `Something went wrong trying to create a new user.`,
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    default: {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: `Login type invalid`,
      });
    }
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  
  return (
    <Layout>
      <div className="p-4 temporary">
      <div className="bg-light  w-[500px] shadow-[0_10px_60px_0_rgba(170,178,197,0.2)] text-center py-14 px-14 rounded-[30px]">
      <div className="content" data-light="">
        <h1>Login</h1>

        <form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={
              searchParams.get("redirectTo") ?? undefined
            }
          />
          <fieldset>
            <legend className="sr-only">
              Login or Register?
            </legend>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
              />
              Login
            </label>
            <label>
              <input
                type="radio"
                name="loginType"
                value="register"
                defaultChecked={
                  actionData?.fields?.loginType ===
                  "register"
                }
              />
              Register
            </label>
          </fieldset>

          <div id="form-error-message">
            {actionData?.formError ? (
              <p
                className="form-validation-error"
                role="alert"
              >
                Error: {actionData.formError}
              </p>
            ) : null}

          </div>
            <FormField
            htmlFor="email"
            label="Email"
            value={actionData?.fields?.email}
          />
               <FormField
            htmlFor="password"
            label="Password"
            type="password"
            value={actionData?.fields?.password}
            
          />

       
          <Button label="SUBMIT" type="submit" />
        </form>
      </div>
      <div className="links">
        <ul>

          <li>
        <Button label="HOME" type="button" style="secondary"/>

            {/* <Link to="/">Home</Link> */}
          </li>
        </ul>
      </div>
    </div>
      </div>

      {/* {data.user ? (
            <div className="user-info">
              <span>{`Hi, ${data.user.username}`}</span>
              <Form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </Form>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )} */}
    </Layout>
  );
}
