import React from "react";
import PageContent from "../../../components/Layout/PageContent";
import { Box, Text } from "@chakra-ui/react";
import NewPostForm from "../../../components/Post/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useRecoilState } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import useCommunityData from "../../../hooks/useCommunityData";
import About from "../../../components/Community/About";

type submitProps = {};

const SubmitPostPage: React.FC<submitProps> = () => {
  const [user] = useAuthState(auth);
  // const communityStateValue = useRecoilState(communityState);
  const { communityStateValue } = useCommunityData();

  return (
    <PageContent>
      <>
        <Box p={"14px 0px"} borderBottom={"1px solid"} borderColor={"white"}>
          <Text>Create new post</Text>
        </Box>
        {user && <NewPostForm user={user}></NewPostForm>}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity}></About>
        )}
      </>
    </PageContent>
  );
};
export default SubmitPostPage;
