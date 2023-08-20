import { Button, Flex, Icon, Menu } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import { User, signOut } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import Icons from "./Icons";
import UserMenu from "./UserMenu";
import AuthModal from "../../Modal/Auth/AuthModal";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal></AuthModal>

      <Flex justify={"center"} align={"center"}>
        {user ? <Icons></Icons> : <AuthButtons></AuthButtons>}
        <UserMenu user={user}></UserMenu>
      </Flex>
    </>
  );
};
export default RightContent;
