import Button from "../../components/Button/Button";
import Carousel from "../../components/Carousel/Carousel";
import ChatIcon from "../../public/chat.svg";
import BackIcon from "../../public/back.svg";
import StarIcon from "../../public/star.svg";
import StarFilledIcon from "../../public/star_filled.svg";
import LocationIcon from "../../public/location.svg";
import { useEffect, useState } from "react";
import { getProduct } from "../../utils/getProduct";
import { Item } from "../../utils/types";
import { useRouter } from "next/router";
import { formatDistance, subDays } from "date-fns";
import Link from "next/link";

export default function ProductPage(): JSX.Element {
  const router = useRouter();
  console.log(router.asPath);
  let title = router.asPath.split("title=")[1].split("&")[0];
  let id = router.asPath.split("identifier=")[1].split("&")[0];
  let distance = router.asPath.split("distance=")[1].split("&")[0];
  let owner = router.asPath.split("owner=")[1];

  let imagesArray;
  let description;
  let offerType;
  let createdAt;
  let createdAgo;
  let favorited = false;

  const [isFavorited, SetIsFavorited] = useState(favorited);
  const [productData, setProductData] = useState<Item | null>(null);

  async function getProductData(id: string) {
    const item = await getProduct(id);
    setProductData(item);
  }
  useEffect(() => {
    const storedValue = id;
    if (storedValue) {
      getProductData(storedValue);
    }
  }, []);

  // mock data to demonstrate carousel functionality
  // let imagesArray = [
  //   "http://placeimg.com/640/360/tech",
  //   "http://placeimg.com/640/360/people",
  //   "http://placeimg.com/640/360/animals",
  // ];

  if (!productData) {
    return <></>;
  } else {
    title = productData.title;
    description = productData.description;
    offerType = productData.sellType === "SWAP" ? "Swap" : "Free";
    imagesArray = productData.images;
    createdAt = productData.createdAt;
    createdAgo = formatDistance(subDays(new Date(createdAt), 0), new Date(), {
      addSuffix: true,
    });
  }
  // These Handlers are placeholder functions for clicking on the Button onClick functionalities.
  const offerTradeHandler = () => {};
  const chatHandler = () => {};
  const backHandler = () => {
    const back = {
      pathname: "/",
    };
    return back;
  };
  const locationHandler = () => {};

  const back = backHandler();
  return (
    <div className="pt-16">
      <div className="flex-col h-[calc(100vh-64px)] overflow-hidden">
        <div className="relative block w-full">
          <Carousel imagesArray={imagesArray} />

          <Link href={back.pathname}>
            <a>
              <button
                className="text-BG absolute w-10 left-2 top-2"
                onClick={() => router.push(back)}
              >
                <BackIcon />
              </button>
            </a>
          </Link>

          <button
            onClick={() => SetIsFavorited((fav) => !fav)}
            className="text-BG absolute w-9 top-2 right-2"
          >
            {isFavorited ? <StarFilledIcon /> : <StarIcon />}
          </button>
          <button
            onClick={locationHandler}
            className="text-BG absolute w-9 bottom-4 right-2"
          >
            <LocationIcon />
          </button>
        </div>
        <div className="flex-col px-4 space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl">{title}</p>
            </div>
            <div className="w-24">
              <Button
                type="button"
                value={offerType}
                onClick={() => {}}
                selected={false}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-md"> {`Offered by ${owner}`} </p>
              <p className="text-xs">{`distance ${distance} km`} </p>
              <p className="text-xs">{`posted ${createdAgo}`} </p>
            </div>
            <div>
              {/* chat to be implemented at a later version */}
              {/* <button onClick={chatHandler} className="text-primary w-10">
                <ChatIcon />
              </button> */}
            </div>
          </div>
          {/* not sure how to make the description responsive in size */}
          <div className="overflow-y-scroll h-52">{description}</div>
          <Button
            type="button"
            onClick={offerTradeHandler}
            selected={false}
            value={"Offer Trade"}
          />
        </div>
      </div>
    </div>
  );
}