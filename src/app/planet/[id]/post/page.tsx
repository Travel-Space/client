import Content from "./detail/components/Content";

interface Context {
  searchParams: { detail: string };
}
export async function generateMetadata({ searchParams }: Context) {
  const postId = searchParams.detail;
  const url = `https://travelspace.world/api/articles/${postId}?commentPage=1&commentPageSize=10&replyPage=1&replyPageSize=5`;
  const post = await fetch(url).then(res => res.json());

  return {
    title: post.title,
    description: `${post.title} : ${post.author.nickName} 님의 게시글`,
    openGraph: {
      title: post.title,
      description: `${post.title} : ${post.author.nickName} 님의 게시글`,
      images:
        post.images?.length > 0
          ? post.Images?.map((v: { url: string }) => ({
              url: v.url,
              width: 600,
              height: 400,
            }))
          : [
              {
                url: post.author.profileImage,
                width: 400,
                height: 400,
              },
            ],
    },
  };
}

export default function PostDetail() {
  return <Content />;
}
