import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type TextInputsProps = {
  textInput: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInput,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width={"100%"}>
      <Input
        name="title"
        value={textInput.title}
        onChange={onChange}
        fontSize={"10pt"}
        borderRadius={4}
        placeholder={"Title"}
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
      ></Input>
      <Textarea
        name="body"
        value={textInput.body}
        onChange={onChange}
        fontSize={"10pt"}
        borderRadius={4}
        height={"100px"}
        placeholder={"Text (optional)"}
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
      ></Textarea>
      <Flex justify={"flex-end"}>
        <Button
          height={"34px"}
          padding={"0px 30px"}
          disabled={!textInput.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
