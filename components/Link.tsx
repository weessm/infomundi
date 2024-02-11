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
      className="flex items-center p-2 mt-3 mb-3 bg-slate-300 text-lg border-2 border-slate-400 w-fit rounded-xl hover:border-gray-500 hover:bg-gray-400"
      href={`${link}`}
      target={target}
    >
      {text}
    </Link>
  );
};

export default LinkComponent;
