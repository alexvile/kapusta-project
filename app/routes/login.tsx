import { ActionArgs } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { Button } from "~/components/button";
import { FormField } from "~/components/form-field";
import { Layout } from "~/components/layout";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import {
  validateEmailFE,
  validatePasswordFE,
  validateNameFE,
} from "~/frontend/validators";

import {
  validateEmail,
  validateName,
  validatePassword,
} from "~/utils/validators.server";
import { createUserSession, login, register } from "~/utils/session.server";
import { useState } from "react";

function validateUrl(url: any) {
  if (typeof url === "string") {
    let urls = ["/dashboard", "/"];
    if (urls.includes(url)) {
      return url;
    }
  }
  return "/dashboard";
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();

  const loginType = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  const firstName = form.get("firstName");
  const lastName = form.get("lastName");

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
      formError: `Form not submitted correctly. Invalid Form Data`,
    });
  }

  if (
    loginType === "register" &&
    (typeof firstName !== "string" || typeof lastName !== "string")
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly. Invalid Form Data`,
    });
  }

  // const fields = { loginType, email, password };

  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(loginType === "register"
      ? {
          firstName: validateName((firstName as string) || ""),
          lastName: validateName((lastName as string) || ""),
        }
      : {}),
  };

  // todo: after errors reset at register page return to login page
  // todo: error output
  // todo: all logic with db (userExist) to server

  console.log("fieldErrors", fieldErrors);

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields: { email, password, firstName, lastName },
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
          fields: { email, password },
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
          fields: { email, password, firstName, lastName },
          formError: `User with email ${email} already exists`,
        });
      }
      const user = await register({ email, password, firstName, lastName });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields: { email, password, firstName, lastName },
          formError: `Something went wrong trying to create a new user.`,
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    default: {
      return badRequest({
        fieldErrors: null,
        fields: { email, password },
        formError: `Login type invalid`,
      });
    }
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();

  const [action, setAction] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const toggleAction = () => {
    setAction(action === "login" ? "register" : "login");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case "email":
        setEmail(event.currentTarget.value);
        break;
      case "password":
        setPassword(event.currentTarget.value);
        break;
      case "firstName":
        setFirstName(event.currentTarget.value);
        break;
      case "lastName":
        setLastName(event.currentTarget.value);
        break;
      default:
        return;
    }
  };

  // console.log("actionData", actionData);

  return (
    <>
      <Layout>
        <div className="p-4 temporary">
          <div className="bg-light  w-[500px] shadow-[0_10px_60px_0_rgba(170,178,197,0.2)] text-center py-14 px-14 rounded-[30px]">
            <div className="content" data-light="">
              <Form method="post">
                <input
                  type="hidden"
                  name="redirectTo"
                  value={searchParams.get("redirectTo") ?? undefined}
                />
                <input type="hidden" value={action} name="_action" />
                {action}
                <fieldset>
                  <legend className="sr-only">Login or Register?</legend>
                  <button
                    className="bg-red-100 border"
                    type="button"
                    value={action}
                    onClick={toggleAction}
                  >
                    {action === "login" ? "Login" : "Register"}
                  </button>
                </fieldset>

                <div id="form-error-message">
                  {actionData?.formError ? (
                    <p className="form-validation-error" role="alert">
                      Error: {actionData?.formError}
                    </p>
                  ) : null}
                </div>

                <FormField
                  htmlFor="email"
                  label="Email"
                  value={email}
                  validateHandler={validateEmailFE}
                  // value={formData.email}
                  // onChange={(e) => handleInputChange(e, "email")}
                  error={actionData?.fieldErrors?.email}
                  onInputChange={(e) => handleInputChange(e)}
                />
                <FormField
                  htmlFor="password"
                  label="Password"
                  type="password"
                  value={password}
                  validateHandler={validatePasswordFE}
                  error={actionData?.fieldErrors?.password}
                  onInputChange={(e) => handleInputChange(e)}
                />
                {action === "register" && (
                  <>
                    <FormField
                      htmlFor="firstName"
                      label="First Name"
                      value={firstName}
                      validateHandler={validateNameFE}
                      error={actionData?.fieldErrors?.firstName}
                      onInputChange={(e) => handleInputChange(e)}
                    />
                    <FormField
                      htmlFor="lastName"
                      label="Last Name"
                      value={lastName}
                      validateHandler={validateNameFE}
                      error={actionData?.fieldErrors?.lastName}
                      onInputChange={(e) => handleInputChange(e)}
                    />
                  </>
                )}

                <Button label="SUBMIT" type="submit" />
              </Form>
            </div>
            <div className="links">
              <ul>
                <li>
                  <Button label="HOME" type="button" style="secondary" />
                  {/* <Link to="/">Home</Link> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
