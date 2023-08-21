import React from "react";
import { Community } from "../../atoms/communitiesAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { IoFlashSharp } from "react-icons/io5";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const isJoined = false;
  return (
    <Flex direction={"column"} width={"100%"} height={"146px"}>
      <Box height={"50%"} bg={"blue.400"}></Box>
      <Flex justify={"center"} bg={"white"} flexGrow={1}>
        <Flex width={"95%"} maxWidth={"860px"}>
          {communityData.imageURL ? (
            <Image></Image>
          ) : (
            <Icon
              as={IoFlashSharp}
              fontSize={64}
              position={"relative"}
              top={-3}
              color={"white"}
              border={"4px solid white"}
              borderRadius={"50%"}
              backgroundColor={"blue.500"}
            ></Icon>
          )}
          <Flex padding={"10px 16px"}>
            <Flex direction={"column"} mr={6}>
              <Text fontWeight={800} fontSize={"16pt"}>
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize={"10pt"}>
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height={"30px"}
              pr={6}
              pl={6}
              onClick={() => {}}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
