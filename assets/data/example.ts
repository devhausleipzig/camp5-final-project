export let Example = {
  identifier: "",
  title: "",
  images: [""],
  description: "",
  userId: "",
  sellType: "",
  createdAt: "",
  catId: "",
  location: {
    // geometry: { type: "", coordinates: [lat, lon]}
    identifier: "", // no need
    address: "", // no need
    lat: 51.33959900523878,
    lon: 12.40713727722273,
    userId: "",
  },
};

const data = {
  type: "FeatureCollection",
  features: [
    {
      type: "Something", // FREE / SWAP
      geometry: {
        type: "Point",
        coordinates: [-77.034084142948, 38.909671288923],
      },
      properties: {
        title: "Old Piano",
      },
    },
    // ...
  ],
};
