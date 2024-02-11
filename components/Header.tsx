import Image from "next/image";
import Link from "next/link";

const HeaderComponent = () => {
  return (
    <nav className="w-full bg-white h-16 flex items-center justify-center">
      <div className="container mx-auto">
        <Link
          href="/"
          passHref
          className="flex items-center gap-3 select-none w-fit"
        >
          <Image width={48} height={48} src="/logo.svg" alt="Logo InfoMundi" />
          <h1 className="font-bold text-2xl">InfoMundi</h1>
        </Link>
      </div>
    </nav>
  );
};

export default HeaderComponent;
