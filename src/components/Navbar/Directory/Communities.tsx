import CreateCommunityModal from "../../../components/Modal/CreateCommunity/CreateCommunityModal";
import { MenuItem, Flex, Icon, Box, Text, MenuList } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import { IoFlashOffSharp, IoFlashSharp } from "react-icons/io5";
import MenuListItem from "./MenuListItem";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = React.useState(false);
  const mySnippets = useRecoilValue(communityState).mySnippets;

  return (
    <>
      <CreateCommunityModal
        open={open}
        handleClose={() => setOpen(false)}
      ></CreateCommunityModal>

      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"7pt"}
          fontWeight={500}
          color={"gray.500"}
        >
          MODERATING
        </Text>

        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={IoFlashSharp}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor={"brand.100"}
              imageURL={snippet.imageURL}
            ></MenuListItem>
          ))}
      </Box>

      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"7pt"}
          fontWeight={500}
          color={"gray.500"}
        >
          MY COMMUNITIES
        </Text>

        <MenuItem
          width={"100%"}
          fontSize={"10pt"}
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex align={"center"}>
            <Icon as={GrAdd} fontSize={20} mr={2}></Icon>
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={IoFlashSharp}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor={"brand.100"}
            imageURL={snippet.imageURL}
          ></MenuListItem>
        ))}
      </Box>
    </>
  );
};
export default Communities;
