import { Button } from "./button";
import { CustomDurationPicker } from "./durationPicker";
import { FormField } from "./form-field";

export const StructureModalContent = ({ target }: { target: EventTarget }) => {
  // todo - ts-errors
  switch (target.name) {
    case "create-business":
      return (
        <>
          <h2>Creating business</h2>
          <FormField type="text" htmlFor="name" label="Name" />
          <Button
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
          />
          {/*  // todo - need refactor */}
          <Button
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
