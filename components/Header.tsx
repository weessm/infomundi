import Image from "next/image";
import Link from "next/link";

const HeaderComponent = () => {
  return (
    <nav className="w-full bg-white h-16 flex items-center justify-center">
      <section className="container">
        <Link href={"/"} className="flex items-center gap-3 select-none">
          <Image width={48} height={48} src="/logo.svg" alt="logo IndoMundi" />
          <h1 className="font-bold text-2xl">InfoMundi</h1>
        </Link>
      </section>
    </nav>
  );
};

export default HeaderComponent;
