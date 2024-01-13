import { User } from "@prisma/client";
import { Svg } from "../Svg";
import { Avatar } from "./Avatar";

// todo - are you really want to logout
export const UserBar = ({
  user,
}: {
  user: Pick<User, "id" | "email" | "profile">;
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <Avatar userName={user?.profile?.firstName} />
      <form
        action="/logout"
        method="post"
        className="flex items-center justify-center"
      >
        <button type="submit" className="flex items-center justify-center">
          <span className="md:hidden">
            <Svg name="logout" />
          </span>
          <span className="max-md:hidden tracking-medium text-label font-roboto text-secondary underline">
            Exit
          </span>
        </button>
      </form>
    </div>
  );
};
