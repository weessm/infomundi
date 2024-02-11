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
      className="w-fit px-4 py-2 mt-3 mb-3 bg-gray-300 text-lg border-2 border-gray-400 rounded-xl hover:border-gray-500 hover:bg-gray-400"
      href={link}
      passHref
      target={target}
    >
      {text}
    </Link>
  );
};

export default LinkComponent;
