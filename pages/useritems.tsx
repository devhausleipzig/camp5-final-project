import { UserListItem } from "../components/UserListItem/UserListItem";
import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import { Item } from "../utils/types";
import { getUserItems } from "../utils/getUserItems";
import { Spinner } from "../components/Spinner/Spinner";
import CreateItemButton from "../components/CreateItemButton/CreateItemButton";

const UserItems = () => {
  const [initialUserItem, setInitialUserItem] = useState<Item[]>([]);
  const [listData, setListData] = useState<Item[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [itemDeleted, setItemDeleted] = useState<number>(0);

  let userId = "c82ced00-b3f9-4fc9-baf1-ef157b673f33";
  let itemId: string;
  async function getData() {
    const userItemFetch = await getUserItems(userId);
    setInitialUserItem(userItemFetch);
    setListData(userItemFetch);
  }
  async function deleteUserListItem(identifier: string) {
    console.log("click");
    fetch(`/api/item?identifier=${identifier}`, {
      method: "DELETE",
    }).then((response) => {
      console.log(response.status);
    });
    await getData();
  }

  function useDeleteItemId(itemId: string) {
    deleteUserListItem(itemId);
  }

  useEffect(() => {
    getData();
  }, []);

  function filterButtons(event: React.MouseEvent<HTMLButtonElement>) {
    if (!initialUserItem) {
      return;
    } else if ((event.target as HTMLButtonElement).value === "Free") {
      if (selectedFilter === "Free") {
        setSelectedFilter("");
        setListData(initialUserItem);
      } else {
        setSelectedFilter("Free");
        const filteredItemsArr: Item[] = initialUserItem.filter(
          (item) => item.sellType === "FREE"
        );
        setListData(filteredItemsArr);
      }
    } else {
      if (selectedFilter === "Swap") {
        setSelectedFilter("");
        setListData(initialUserItem);
        console.log(listData);
      } else {
        setSelectedFilter("Swap");

        const filteredItemsArr: Item[] = initialUserItem.filter(
          (item) => item.sellType === "SWAP"
        );
        setListData(filteredItemsArr);
      }
    }
  }

  return (
    <div className="pt-20">
      <div className="flex gap-2 px-2 pb-4">
        <Button
          type="button"
          selected={selectedFilter === "Free"}
          onClick={filterButtons}
          value={"Free"}
        />
        <Button
          type="button"
          selected={selectedFilter === "Swap"}
          onClick={filterButtons}
          value={"Swap"}
        />
      </div>
      <div className="flex-1 overflow-y-scroll">
        {!listData ? (
          <div className="flex items-center justify-center pt-12">
            <Spinner height={73} />
          </div>
        ) : (
          <>
            <ul className="px-3 text-left">
              {
                <div id="listings" className="listings">
                  {listData.length === 0 && (
                    <div className="flex text-center justify-center items-center w-full h-[73.5vh] rounded-md">
                      <p>no items found</p>
                    </div>
                  )}
                  {listData.length > 0 &&
                    listData.map((listData, i) => (
                      <UserListItem
                        key={i}
                        i={i}
                        item={listData}
                        useDeleteItemId={useDeleteItemId}
                      />
                    ))}
                </div>
              }
            </ul>
          </>
        )}
      </div>
      <CreateItemButton />
    </div>
  );
};

export default UserItems;