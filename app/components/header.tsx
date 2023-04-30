import Logo from "./svg/Logo";
import { UserBar } from "./user-bar";

export function Header({ user }: { user: User | undefined }) {
  return (
    <header className="flex justify-between">
      <Logo title="Kapusta logo" titleId="kapusta-logo" />
      <nav></nav>
      {user && <UserBar user={user} />}
    </header>
  );
}
