import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RIghtContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory/Directory";
import useDirectory from "../../hooks/useDirectory";
import { defaultMenuItem } from "../../atoms/directoryMenuAtom";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex
      bg={"white"}
      height={"44px"}
      padding={"6px 12px"}
      justify={{ md: "space-between" }}
    >
      <Flex
        align={"center"}
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor={"pointer"}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image src="/Images/lightninglogo.png" height={"30px"}></Image>
        <Image
          src="/Images/lightningtext.png"
          height={"46px"}
          display={{ base: "none", md: "unset" }}
        ></Image>
      </Flex>{" "}
      {user && <Directory></Directory>}
      <SearchInput user={user}></SearchInput>
      <RightContent user={user}></RightContent>
    </Flex>
  );
};
export default Navbar;
