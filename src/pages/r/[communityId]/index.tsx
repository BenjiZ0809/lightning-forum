import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { firestore } from "../../../firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { log } from "console";
import { Community } from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Community/NotFound";
import Header from "../../../components/Community/Header";
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Community/CreatePostLink";

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <NotFound></NotFound>;
  }

  return (
    <>
      <Header communityData={communityData}></Header>
      <PageContent>
        <>
          <CreatePostLink></CreatePostLink>
        </>
        <>
          <div>RHS</div>
        </>
      </PageContent>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // get community data and pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    // could add error page
    console.log("getServerSideProps error", error);
  }
};

export default CommunityPage;
