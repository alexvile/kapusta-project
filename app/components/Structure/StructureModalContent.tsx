import { Button } from "../Layout/Button";
import { TextField } from "../Layout/TextField";
import { CustomDurationPicker } from "../durationPicker";
import { BusinessModalProps } from "~/types/types";

// todo - breadcrumbs

export const StructureModalContent = ({
  data,
}: {
  data: BusinessModalProps;
}) => {
  console.log(data);
  const { intent, target, fields } = data;
  // textarea for notes
  switch (intent) {
    case "create-business":
      return (
        <>
          <h2>Creating business</h2>
          <TextField name="name" label="Name" />
          <TextField name="notes" label="Notes" multiline={2} />
          <Button type="submit" name="intent" value="createBusiness">
            Submit
          </Button>
        </>
      );
    case "create-service":
      return (
        <>
          <h2>Creating service</h2>
          <TextField type="text" name="name" label="Name" />
          <TextField type="number" name="price" label="Select price" />
          <input type="hidden" name="businessId" value={target} />
          <CustomDurationPicker
            hours={[1, 2, 3]}
            minuts={[10, 20, 30, 40, 50]}
            name="duration"
            label="Choose duration"
            durationInMs={true}
          />
          <Button type="submit" name="intent" value="createService">
            Submit
          </Button>
        </>
      );

    case "edit-business":
      return (
        <>
          <input type="hidden" name="businessId" value={target} />
          <h2>Edit business</h2>
          <TextField name="name" label="Name" defaultValue={fields.name} />
          <TextField
            name="notes"
            label="Notes"
            defaultValue={fields.notes}
            multiline={2}
          />
          <Button type="submit" name="intent" value="editBusiness">
            Submit
          </Button>
        </>
      );
    default:
      return null;
  }
};
