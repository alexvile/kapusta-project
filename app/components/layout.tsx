export function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="h-screen w-full bg-home-page bg-cover bg-no-repeat">{children}</div>
    );
  }
  