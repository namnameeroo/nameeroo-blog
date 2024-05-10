import {Post} from "@/interfaces/post";
import {PostPreview} from "./post-preview";
import {SectionTitle} from "./section-title";
import {PostPreviewCard} from "./post-preview-card";

type Props = {
  posts: Post[];
};

export function MoreStories({posts}: Props) {
  return (
    <section className="card">
      <SectionTitle>All Posts</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:gap-x-32 gap-y-10 md:gap-y-16 mb-32">
        {posts.map((post) => (
          <PostPreviewCard
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
