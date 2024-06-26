// import { badRequest } from "~/utils/request.server";

import { emptyStringValidate } from "./validators.server";
// loginType === "register" &&
// (typeof firstName !== "string" || typeof lastName !== "string")
// ) {
// use Bad request etc utilites
// return badRequest({
//   fieldErrors: null,
//   fields: null,
//   formError: `Form not submitted correctly. Invalid Form Data`,
// });

type IFormError = {
  fieldErrors: null;
  fields: null;
  formError: string;
};

type IFieldsError = {
  fields: { [k: string]: string };
  fieldErrors: { [k: string]: string | undefined };
  formError: null;
};
// type IFormValidatorResponse = {
//   error: IFormError | IFieldsError;
//   status: number;
// };

type FormData = {
  [k: string]: FormDataEntryValue;
};
const defaultFormError: IFormError = {
  fields: null,
  formError: "Form not submitted correctly. Invalid Form Data",
  fieldErrors: null,
};
type IType = "create" | "edit";

// !!!!!!! refactor USE ONE validation RULE for same fields !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const validateStructureBusinessCreate = (data: FormData) => {
  const { name, notes, ownerId } = data;
  // to check type (owner ID for create, business ID for update)
  if (
    typeof name !== "string" ||
    typeof ownerId !== "string" ||
    typeof notes !== "string"
  ) {
    return { error: defaultFormError, status: 400 };
  }

  const fieldErrors = {
    name: emptyStringValidate(name),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    const info: IFieldsError = {
      fieldErrors,
      fields: { name },
      formError: null,
    };
    return { error: info, status: 400 };
  }

  return {
    error: null,
    validatedData: { name, notes, ownerId },
  };
};
export const validateStructureBusinessUpdate = (data: FormData) => {
  const { name, notes, businessId: id } = data;
  // to check type (owner ID for create, business ID for update)
  if (
    typeof name !== "string" ||
    typeof id !== "string" ||
    typeof notes !== "string"
  ) {
    return { error: defaultFormError, status: 400 };
  }

  const fieldErrors = {
    name: emptyStringValidate(name),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    const info: IFieldsError = {
      fieldErrors,
      fields: { name },
      formError: null,
    };
    return { error: info, status: 400 };
  }

  return {
    error: null,
    validatedData: { name, notes, id },
  };
};

export const validateStructureServicesCreate = (data: FormData) => {
  const { businessId, name, price, duration } = data;

  if (
    typeof businessId !== "string" ||
    typeof name !== "string" ||
    typeof price !== "string" ||
    typeof duration !== "string"
  ) {
    return { error: defaultFormError, status: 400 };
  }

  const fieldErrors = {
    name: emptyStringValidate(name),
    price: emptyStringValidate(price),
    duration: emptyStringValidate(duration),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    const info: IFieldsError = {
      fieldErrors,
      fields: { name, price, duration },
      formError: null,
    };
    return { error: info, status: 400 };
  }
  return {
    error: null,
    validatedData: {
      businessId,
      name,
      price: Number(price),
      duration: Number(duration),
    },
  };
};

export const validateStructureServicesUpdate = (data: FormData) => {
  const { serviceId, name, price, duration } = data;
  // console.log(1213123, data);
  if (
    typeof serviceId !== "string" ||
    typeof name !== "string" ||
    typeof price !== "string" ||
    typeof duration !== "string"
  ) {
    return { error: defaultFormError, status: 400 };
  }

  const fieldErrors = {
    name: emptyStringValidate(name),
    price: emptyStringValidate(price),
    duration: emptyStringValidate(duration),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    const info: IFieldsError = {
      fieldErrors,
      fields: { name, price, duration },
      formError: null,
    };
    return { error: info, status: 400 };
  }
  return {
    error: null,
    validatedData: {
      id: serviceId,
      name,
      price: Number(price),
      duration: Number(duration),
    },
  };
};
