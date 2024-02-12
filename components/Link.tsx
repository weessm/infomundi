import Link from "next/link";

const LinkComponent = ({
  text,
  link,
  target,
}: {
  text: string;
  link: string;
  target: string;
}) => {
  return (
    <Link
      className="flex justify-center items-center w-full sm:w-fit px-4 py-2 mt-3 mb-3 text-lg bg-gray-300 border-gray-400 rounded-xl border-2 hover:border-gray-400 hover:bg-gray-200 hover:shadow-xl transition-all"
      href={link}
      passHref
      target={target}
    >
      {text}
    </Link>
  );
};

export default LinkComponent;
