import { User } from "@prisma/client";
import { UserBar } from "./UserBar";
import { Svg } from "../Svg";

export function Header({
  user,
}: {
  user?: Pick<User, "id" | "email" | "profile">;
}): JSX.Element {
  return (
    <header className="bg-white">
      {/* <nav></nav> */}
      <div className="flex justify-between py-3 px-5 md:px-8 lg:px-4">
        {/* left */}
        <Svg title="Kapusta logo" titleId="kapusta-logo" name="logo" />
        {/* right */}
        {user ? <UserBar user={user} /> : null}
      </div>
    </header>
  );
}
