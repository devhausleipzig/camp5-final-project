import clsx from "clsx";
import Image from "next/image";
import { MouseEventHandler, useState } from "react";

interface ProductUserListItemProps {
  key: number;
  title: string;
  imgSrc: string;
  id: string;
}

const ProductUserListItem = ({
  key,
  title,
  imgSrc,
  id,
}: ProductUserListItemProps) => {
  const [selected, setSelected] = useState(false);
  const [selID, setSelID] = useState("");

  function toggleSelect() {
    setSelected((prev) => !prev);
    setSelID(id);
    console.log(selID);
  }
  return (
    <>
      <div
        key={key}
        id={id}
        className={clsx(
          !selected
            ? "flex space-x-2 items-center opacity-50 hover:opacity-100 cursor-pointer"
            : "flex space-x-2 items-center opacity-100 cursor-pointer"
        )}
        onClick={() => toggleSelect}
      >
        <Image alt="" src={imgSrc} width={50} height={50} />
        <div>{title}</div>
      </div>
      <div className="h-[1px] bg-BG-text rounded-md opacity-25"></div>
    </>
  );
};

export default ProductUserListItem;
