import { User } from "@prisma/client";
import { Header } from "./Header/Header";

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
      {/* bg to login page bg-home-page bg-cover bg-no-repeat*/}
      <main className="h-screen w-full">
        {/* temporary */}
        <div className="absolute top-0 left-0 h-[80%] w-full -z-[1]  rounded-bl-[20%] bg-mainBg"></div>
        {children}
      </main>
    </>
  );
}
