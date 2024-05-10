export const SectionTitle = ({children}: {children: string}) => {
  return (
    <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight">
      {children}
    </h2>
  );
};
