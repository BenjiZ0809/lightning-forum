import { Flex, Icon } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "../../../atoms/postAtom";
import { User } from "@firebase/auth";
import { useRouter } from "next/router";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { firestore, storage } from "../../../firebase/clientApp";
import { ref, uploadString } from "firebase/storage";

type NewPostFormProps = {
  user: User;
};

const formTabs: TabItem[] = [
  { title: "Post", icon: IoDocumentText },
  { title: "Images & Video", icon: IoImageOutline },
  { title: "Link", icon: BsLink45Deg },
  { title: "Poll", icon: BiPoll },
  { title: "Talk", icon: BsMic },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInput, setTextInput] = useState({ title: "", body: "" });
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    const { communityId } = router.query;
    // create new post object => type post
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInput.title,
      body: textInput.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    // store the post in db
    try {
      const postDocRef = await addDoc(collection(firestore, "post"), newPost);
      // check for selectedFIle
      if (selectedFile) {
        const imageRef = ref(storage, `post/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
      }
      // store in storage => getDownloadURL (return imageURL)
      // update post doc by adding imageURL
    } catch (error: any) {
      console.log("handleCreatePost error", error.message);
    }

    // redirect the user back to the community page
  };

  const onSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction={"column"} bg={"white"} borderRadius={4} mt={2}>
      <Flex width={"100%"}>
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          ></TabItem>
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInput={textInput}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          ></TextInputs>
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          ></ImageUpload>
        )}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
