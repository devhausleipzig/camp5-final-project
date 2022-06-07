import { UserListItem } from "../components/UserListItem/UserListItem";
import React from "react";
import { NextPage } from "next";

const UserItems = () => {
  return (
    <div className="pt-20">
      <UserListItem
        itemImage={
          "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
        }
        itemType={"SWAP"}
        itemTitle={"Boots"}
        itemPosted="03.06.2022"
        itemRequests={5}
        itemGone={false}
        itemRecipient={"Jonathan"}
      />
    </div>
  );
};

export default UserItems;