import { getPostList } from "../lib/posts";
import { useState } from "react";
import { PostsData } from "../lib/types";

interface LoadMoreProps {
  posts: PostsData;
  setPosts: (posts: PostsData) => void;
  taxonomy?: { key: string, value: string } | null;
  token?: string;  // Accept the token as a prop
}

export default function LoadMore({ posts, setPosts, taxonomy = null, token }: LoadMoreProps) {
  const [buttonText, setButtonText] = useState(
    posts.pageInfo.hasNextPage ? 'Load more posts' : 'No more posts to load'
  );
  const [buttonDisabled, setButtonDisabled] = useState(!posts.pageInfo.hasNextPage);

  const handleOnclick = async () => {
    setButtonText('Loading...');
    setButtonDisabled(true);

    try {
      const morePosts = await getPostList(posts.pageInfo.endCursor, taxonomy, token);

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
    } catch (error) {
      console.error("Failed to load more posts", error);
      setButtonText('Failed to load posts');
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
