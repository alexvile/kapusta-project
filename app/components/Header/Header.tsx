import { User } from "@prisma/client";
import { UserBar } from "./UserBar";
import { Svg } from "../Svg";
import { Link } from "@remix-run/react";

export function Header({
  user,
}: {
  user?: Pick<User, "id" | "email" | "profile">;
}): JSX.Element {
  return (
    <header>
      {/* <nav></nav> */}
      <div className="flex justify-between py-3 px-5 md:px-8 dt:px-4">
        {/* left */}
        <Svg title="Kapusta logo" titleId="kapusta-logo" name="logo" />
        {/* right */}
        {user ? (
          <UserBar user={user} />
        ) : (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </header>
  );
}
