import Logo from "@/components/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-GREY_10 mx-2">
      <div className="py-3 px-2 lg:px-6">
        <Logo />
      </div>
      {children}
    </main>
  );
}
