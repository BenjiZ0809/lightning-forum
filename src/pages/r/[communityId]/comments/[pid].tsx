import React, { useEffect } from "react";
import PageContent from "../../../../components/Layout/PageContent";
import PostItem from "../../../../components/Post/PostItem";
import usePosts from "../../../../hooks/usePosts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../../firebase/clientApp";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { Post, postState } from "../../../../atoms/postAtom";
import About from "../../../../components/Community/About";
import useCommunityData from "../../../../hooks/useCommunityData";
import Comments from "../../../../components/Post/Comments/Comments";
import { User } from "firebase/auth";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { postStateValue, setPostStateValue, onDeletePost, onVote } =
    usePosts();
  const router = useRouter();
  const { communityStateValue } = useCommunityData();

  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDoc = await getDoc(postDocRef);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error) {
      console.log("fetchPost error: ", error);
    }
  };

  useEffect(() => {
    const { pid } = router.query;
    if (pid && !postStateValue.selectedPost) {
      fetchPost(pid as string);
    }
  }, [router.query, postStateValue.selectedPost]);

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          ></PostItem>
        )}
        <Comments
          user={user as User}
          selectedPost={postStateValue.selectedPost}
          communityId={postStateValue.selectedPost?.communityId as string}
        ></Comments>
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity}></About>
        )}
      </>
    </PageContent>
  );
};
export default PostPage;
