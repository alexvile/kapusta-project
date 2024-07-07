import { Button, Textarea, Input } from "@material-tailwind/react";
import { TextField } from "../Layout/TextField";
import { CustomDurationPicker } from "../durationPicker";
import { BusinessModalProps } from "~/types/types";

// todo - breadcrumbs

export const StructureModalContent = ({
  data,
}: {
  data: BusinessModalProps;
}) => {
  const { intent, target, fields } = data;
  console.log(11111, data);
  // textarea for notes
  switch (intent) {
    case "create-business":
      return (
        <>
          <h2>Creating business</h2>
          <Input
            name="name"
            label="Name"
            containerProps={{ className: "mb-4" }}
          />
          <Textarea name="notes" label="Notes" />
          <Button type="submit" name="intent" value="createBusiness">
            Submit
          </Button>
        </>
      );
    case "create-service":
      return (
        <>
          <h2>Creating service</h2>
          <Input
            type="text"
            name="name"
            label="Name"
            containerProps={{ className: "mb-4" }}
          />
          <Input type="number" name="price" label="Select price" />
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

          <Input
            name="name"
            label="Name"
            defaultValue={fields.name}
            containerProps={{ className: "mb-4" }}
          />
          <Textarea label="Notes" defaultValue={fields.notes} />
          <Button type="submit" name="intent" value="editBusiness">
            Submit
          </Button>
        </>
      );
    case "edit-service":
      return (
        <>
          <input type="hidden" name="serviceId" value={target} />
          <h2>Editing service</h2>
          <Input
            type="text"
            name="name"
            label="Name"
            defaultValue={fields.name}
            containerProps={{ className: "mb-4" }}
          />
          <Input
            type="number"
            name="price"
            label="Price"
            defaultValue={fields.price}
            containerProps={{ className: "mb-4" }}
          />
          <CustomDurationPicker
            hours={[1, 2, 3]}
            minuts={[10, 20, 30, 40, 50]}
            name="duration"
            label="Choose duration"
            durationInMs={true}
            // fix ts error
            initialValue={fields.duration}
          />
          <Button type="submit" name="intent" value="editService">
            Submit
          </Button>
        </>
      );
    default:
      return null;
  }
};
