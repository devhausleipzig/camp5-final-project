import { Coord } from "@turf/turf";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useLocationStore } from "../stores/locationStore";
import { MapRef } from "../stores/mapStore";
import createPopUp from "./createPopUp";
import flyToStore from "./flyToStore";
import { Feature, MapData } from "./types";

export default function addMarkers(
  userLocation: number[],
  map: MapRef,
  data: MapData
) {
  console.log("addMarkers", userLocation);
  if (!data) {
    return;
  } else {
    for (const marker of data.features) {
      const el = document.createElement("img");
      el.id = `marker-${marker.properties.id}`;
      el.className = "marker";
      marker.type === "SWAP"
        ? el.setAttribute("src", "swapIcon.svg")
        : el.setAttribute("src", "giftIcon.svg");
      el.addEventListener("click", (e) => {
        flyToStore(marker as Feature, map);
        createPopUp(marker as Feature, userLocation, map);
      });
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates as LngLatLike)
        .addTo(map.current as mapboxgl.Map);
    }
  }
}
