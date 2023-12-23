const BeforeLoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        {children}
      </div>
    </main>
  );
};

export default BeforeLoginLayout;
