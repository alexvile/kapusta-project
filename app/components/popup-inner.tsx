import { Button } from "./button";

interface IPopupInner {
  label: string;
}
// Are you sure ?
// Do you really want to leave ?
export const PopupInner = ({ label }: IPopupInner) => {
  return (
    <div>
      <p className="pb-5 text-center">{label}</p>
      <Button className="mr-4" label="yes" type="submit" style="primary" />
      <Button label="no" type="submit" style="secondary" />
    </div>
  );
};
