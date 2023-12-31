import React, { useRef, useState } from "react";
import { Community, communityState } from "../../atoms/communitiesAtom";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  Spinner,
  Input,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../../firebase/clientApp";
import useSelectFile from "../../hooks/useSelectFile";
import { IoFlashSharp } from "react-icons/io5";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(communityState);

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }));
    } catch (error) {
      console.log("onUploadImage error", error);
    }
    setUploadingImage(false);
  };

  return (
    <Box position={"sticky"} top={"14px"}>
      <Flex
        justify={"space-between"}
        align={"center"}
        bg={"blue.400"}
        color={"white"}
        p={3}
        borderRadius={"4px 4px 0px 0px"}
      >
        <Text fontSize={"10pt"} fontWeight={700}>
          About community
        </Text>
        <Icon as={HiOutlineDotsHorizontal}></Icon>
      </Flex>
      <Flex
        direction={"column"}
        p={3}
        bg={"white"}
        borderRadius={"0px 0px 4px 4px"}
      >
        <Stack>
          <Flex width={"100%"} p={2} fontSize={"10pt"} fontWeight={700}>
            <Flex direction={"column"} flexGrow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction={"column"} flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider></Divider>
          <Flex
            align={"center"}
            width={"100%"}
            p={1}
            fontWeight={500}
            fontSize={"10pt"}
          >
            <Icon as={RiCakeLine} fontSize={18} mr={2}></Icon>
            {communityData.createdAt && (
              <Text>
                Created{" "}
                {moment(
                  new Date(communityData.createdAt.seconds * 1000)
                ).format("MMM Do, YYYY")}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${communityData.id}/submit`}>
            <Button mt={3} height={"30px"} width={"100%"}>
              Create Post
            </Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider></Divider>
              <Stack spacing={1} fontSize={"10pt"}>
                <Text fontWeight={600}>Admin</Text>
                <Flex align={"center"} justify={"space-between"}>
                  <Text
                    color={"blue.500"}
                    cursor={"pointer"}
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change Image
                  </Text>
                  {communityData.imageURL || selectedFile ? (
                    <Image
                      src={selectedFile || communityData.imageURL}
                      alt="Community Image"
                      borderRadius={"full"}
                      boxSize={"40px"}
                    ></Image>
                  ) : (
                    <Icon
                      as={IoFlashSharp}
                      fontSize={40}
                      color={"brand.100"}
                      mr={2}
                    ></Icon>
                  )}
                </Flex>
                {selectedFile &&
                  (uploadingImage ? (
                    <Spinner></Spinner>
                  ) : (
                    <Text cursor={"pointer"} onClick={onUpdateImage}>
                      Save Changes
                    </Text>
                  ))}
                <Input
                  id="file-uploader"
                  type="file"
                  accept="image/x-png, image/gif, image/jpeg, image/jpg"
                  hidden
                  ref={selectedFileRef}
                  onChange={onSelectFile}
                ></Input>
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
