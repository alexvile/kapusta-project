import { User } from "@prisma/client";
import Logo from "./svg/Logo";
import { UserBar } from "./user-bar";

export function Header({
  user,
}: {
  user?: Pick<User, "id" | "email" | "profile">;
}): JSX.Element {
  return (
    <header className="flex justify-between">
      <Logo title="Kapusta logo" titleId="kapusta-logo" />
      <nav></nav>
      {user && <UserBar user={user} />}
    </header>
  );
}
