import Image from "next/image";

const HeaderComponent = () => {
  return (
    <nav className="w-full bg-white h-16 flex items-center justify-center">
      <section className="container flex items-center gap-3">
        <Image width={48} height={48} src="/logo.svg" alt="logo IndoMundi" />
        <h1 className="font-bold text-2xl">InfoMundi</h1>
      </section>
    </nav>
  );
};

export default HeaderComponent;
