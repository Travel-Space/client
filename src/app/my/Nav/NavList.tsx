interface NavListProps {
  logo: React.ReactNode;
  title: string;
  list: string[];
}

export default function NavList({ logo, title, list }: NavListProps) {
  return (
    <>
      <div>{logo}</div>
      <div>
        <div>{title}</div>
        {list.map(el => (
          <div>{el}</div>
        ))}
      </div>
    </>
  );
}
