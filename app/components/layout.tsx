import { Header } from "./header";

export function Layout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | undefined;
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
