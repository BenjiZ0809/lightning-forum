import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  DirectoryMenuItem,
  DirectoryMenuState,
} from "../atoms/directoryMenuAtom";
import { useRouter } from "next/router";
import { Community, communityState } from "../atoms/communitiesAtom";
import { IoFlashSharp } from "react-icons/io5";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(DirectoryMenuState);
  const router = useRouter();
  const communityStateValue = useRecoilValue(communityState);

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router.push(menuItem.link);
    if (directoryState.isOpen) toggleMenuOpen();
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue;

    if (currentCommunity) {
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          icon: IoFlashSharp,
          iconColor: "blue.500",
          imageURL: currentCommunity.imageURL,
          link: `/r/${currentCommunity.id}`,
        },
      }));
    }
  }, []);

  return { directoryState, toggleMenuOpen, onSelectMenuItem };
};
export default useDirectory;
