export default function ReviewComp({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string
}>) {
  return (
    <div className="striped-background border-5 border-bg px-6 py-4 rounded-lg">
      <h3 className="text-2xl mb-2">{title}</h3>
      <p>{children}</p>
    </div>
  );
}
