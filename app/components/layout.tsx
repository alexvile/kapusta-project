import { User } from "@prisma/client";
import { Header } from "./header";

// todo - using context
export function Layout({
  children,
  user,
}: {
  children: React.ReactNode;
  // Pick<IIncome, "value" | "type">[];
  user?: Pick<User, "id" | "email" | "profile">;
}) {
  return (
    <>
      <Header user={user} />
      <main className="h-screen w-full bg-home-page bg-cover bg-no-repeat antialiased">
        {children}
      </main>
    </>
  );
}
