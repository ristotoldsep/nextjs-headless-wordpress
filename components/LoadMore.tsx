import { getPostList } from "../lib/posts";
import { useState } from "react";
import { PostsData } from "../lib/types";

interface LoadMoreProps {
  posts: PostsData;
  setPosts: (posts: PostsData) => void;
  taxonomy?: { key: string, value: string } | null;
}

export default function LoadMore({ posts, setPosts, taxonomy = null }: LoadMoreProps) {
  const [buttonText, setButtonText] = useState(
    posts.pageInfo.hasNextPage ? 'Load more posts' : 'No more posts to load'
  );
  const [buttonDisabled, setButtonDisabled] = useState(!posts.pageInfo.hasNextPage);

  const handleOnclick = async () => {
    setButtonText('Loading...');
    setButtonDisabled(true);

    const morePosts = await getPostList(posts.pageInfo.endCursor, taxonomy);

    const updatedPosts: PostsData = {
      pageInfo: morePosts.pageInfo,
      nodes: [...posts.nodes, ...morePosts.nodes],
    };

    setPosts(updatedPosts);

    if (morePosts.pageInfo.hasNextPage) {
      setButtonText('Load more posts');
      setButtonDisabled(false);
    } else {
      setButtonText('No more posts to load');
      setButtonDisabled(true);
    }
  };

  return (
    <button
      className="load-more font-bold bg-black text-white px-4 py-2 hover:bg-blue-500"
      onClick={handleOnclick}
      disabled={buttonDisabled}
    >
      {buttonText}
    </button>
  );
}
