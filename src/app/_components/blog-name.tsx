import Link from "next/link";

export const BlogName = () => {
  return (
    <Link href="/" className="hover:underline flex items-center">
      <img
        src={"/assets/blog/logos/nami_tree_ver2_origin.png"}
        className="h-5 mr-2 rounded-full"
        alt="tree logo"
      />
      Nami's Blog.
    </Link>
  );
};
