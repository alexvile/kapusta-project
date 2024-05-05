import { ModalTarget } from "~/types/types";
import { Button, LegacyButton } from "./button";
import { CustomDurationPicker } from "./durationPicker";
import { FormField } from "./form-field";

// todo - breadcrumbs

export const StructureModalContent = ({ target }) => {
  console.log(222, target);
  // todo - ts-errors
  switch (target.name) {
    case "create-business":
      return (
        <>
          <h2>Creating business</h2>
          <FormField type="text" htmlFor="name" label="Name" />
          <FormField type="text" htmlFor="notes" label="Notes" />
          <LegacyButton
            type="submit"
            label="submit"
            name="intent"
            value="createBusiness"
          />
        </>
      );
    case "create-service":
      return (
        <>
          <h2>Creating service</h2>
          <FormField type="text" htmlFor="name" label="Name" />
          <FormField type="number" htmlFor="price" label="Select price" />
          <input
            type="hidden"
            name="businessId"
            value={target.dataset.parentId}
          />
          <CustomDurationPicker
            hours={[1, 2, 3]}
            minuts={[10, 20, 30, 40, 50]}
            name="duration"
            label="Choose duration"
            durationInMs={true}
          />
          {/*  // todo - need refactor */}
          <LegacyButton
            type="submit"
            label="submit"
            name="intent"
            value="createService"
          />
        </>
      );

    default:
      return null;
  }
};
