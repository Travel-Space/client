import Nav from "./Nav";

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}
