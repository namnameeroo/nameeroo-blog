import Container from "@/app/_components/container";
import {Intro} from "@/app/_components/intro";
import {MoreStories} from "@/app/_components/more-stories";
import {getAllPosts} from "@/lib/api";
import {MY_PROFILE} from "@/lib/constants";

export default function Index() {
  const {author} = MY_PROFILE;

  const allPosts = getAllPosts().map((post) => {
    return {...post, author};
  });

  return (
    <main>
      <Container>
        <Intro />
        {allPosts.length > 0 && <MoreStories posts={allPosts} />}
      </Container>
    </main>
  );
}
