import mapboxgl from "mapbox-gl";
import type { Feature } from "./types";
import * as turf from "@turf/turf";
import { NextRouter } from "next/router";
import { render } from "react-dom";

export default function createPopUp(
  feature: Feature,
  userLocation: number[],
  map: any,
  router: NextRouter
) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  let distanceNo: string;
  let distance = turf
    .distance(userLocation, feature.geometry.coordinates)
    .toFixed(2);
  if (distance < "1") {
    distanceNo = `${String(parseFloat(distance) * 1000)}%m`;
    console.log(distanceNo);
    distance = "distance: " + String(parseFloat(distance) * 1000) + "m";
  } else {
    distanceNo = `${distance}%km`;
    distance = "distance: " + distance + "km";
  }

  // example product page path name
  // /item?title=Glasses&identifier=751861a4-5fb8-45f2-91f7-151246f5c94a&distance=5.76&owner=Petra

  interface PopupProps {
    router: NextRouter;
  }

  const PopUp = ({ router }: PopupProps) => {
    return (
      <div
        onClick={() =>
          router.push({
            pathname: "/item",
            query: {
              title: feature.properties.title,
              identifier: feature.properties.id,
              distance: distanceNo,
              owner: feature.properties.owner,
            },
          })
        }
      >
        <h3>{feature.properties.title}</h3>
        <span>{distance}</span>
        <p>{feature.properties.owner}</p>
      </div>
    );
  };

  const popup: mapboxgl.Popup = new mapboxgl.Popup({ closeOnClick: false });
  const popupNode = document.createElement("div");
  render(<PopUp router={router} />, popupNode);
  popup
    .setLngLat(feature.geometry.coordinates)
    .setDOMContent(popupNode)
    .addTo(map.current as mapboxgl.Map);
}
