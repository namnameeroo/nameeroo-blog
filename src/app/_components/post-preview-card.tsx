import {Author} from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
};

export const PostPreviewCard = ({
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: Props) => {
  return (
    <article className="card shadow-sm hover:shadow-md">
      <Link href={`/posts/${slug}`}>
        <figure className="md:shrink-0">
          <img src={coverImage} alt={`${title}-cover`} className={slug} />
        </figure>

        <div className="card-body p-4">
          <div className="card-title text-2xl">{title}</div>
          <p className="line-clamp-3 break-words h-[3rem]">{excerpt}</p>
          <div className="card-actions justify-end">
            <DateFormatter dateString={date} />
          </div>
        </div>
      </Link>
    </article>
  );
};
