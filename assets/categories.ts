import { generatePathLeafPairs } from "../utils/lazyFlatten";
import { z } from "Zod";

class Leaf {
    label;
    details;
    constructor(label: string, details: Array<string>) {
        this.label = label;
        this.details = details;
    }
}

export const ontology = {
    Kitchen: {
        Appliances: [
            new Leaf("Toasters", [
                "Age",
                "Condition",
                "Brand",
                "Energy Efficiency Class",
            ]),
            new Leaf("Blenders", [
                "Age",
                "Condition",
                "Brand",
                "Energy Efficiency Class",
            ]),
            new Leaf("Coffee Machines", [
                "Age",
                "Condition",
                "Brand",
                "Energy Efficiency Class",
            ]),
            new Leaf("Juicers", [
                "Age",
                "Condition",
                "Brand",
                "Energy Efficiency Class",
            ]),
            new Leaf("Popcorn Makers", [
                "Age",
                "Condition",
                "Brand",
                "Energy Efficiency Class",
            ]),
            new Leaf("Tea Kettles", [
                "Age",
                "Condition",
                "Brand",
                "Energy Efficiency Class",
            ]),
            new Leaf("Water Heaters", [
                "Age",
                "Condition",
                "Brand",
                "Energy Efficiency Class",
            ]),
            new Leaf("Waffle Makers", [
                "Age",
                "Condition",
                "Brand",
                "Energy Efficiency Class",
            ]),
            new Leaf("Other Appliances", [
                "Age",
                "Condition",
                "Brand",
                "Energy Efficiency Class",
            ]),
        ],
        Cookware: [
            new Leaf("Pots", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Pans", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Forms", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Other Cookware", [
                "Age",
                "Condition",
                "Brand",
                "Material",
            ]),
        ],
        Cutlery: [
            new Leaf("Knives", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Forks", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Tea Spoons", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Soup Spoons", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Chop Sticks", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Other Cutlery", [
                "Age",
                "Condition",
                "Brand",
                "Material",
            ]),
        ],
        Dishes: [
            new Leaf("Plates", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Mugs", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Bowls", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Cups", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Platters", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Trays", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Tea Pots", ["Age", "Condition", "Brand", "Material"]),
            new Leaf("Other Dishes", ["Age", "Condition", "Brand", "Material"]),
        ],
        OtherKitchenCategories: [new Leaf("Other Kitchen Categories", [])],
    },
};

export const details = {
    Material: [
        "Stainless Steel",
        "Synthetic",
        "Silver",
        "Ceramic",
        "Porcelain",
        "Wood",
        "Glass",
    ],

    Brand: [
        "Melitta",
        "WMF",
        "Krups",
        "Philips",
        "Severin",
        "AEG",
        "DeLonghi",
        "Siemens",
        "Miele",
        "Nespresso",
        "Tefal",
        "Tchibo",
        "Bialetti",
        "Bosch",
        "Kenwood",
        "Bodum",
        "Gaggia",
        "Bauknecht",
        "BEKO",
        "Zwilling",
        "Clatronic",
        "Gorenje",
        "Grundig",
        "Other",
        "Ikea",
        "Liebherr",
        "ok",
        "Privileg",
        "Russell Hobbs",
        "KPM",
    ],
    Condition: ["*****", "****", "***", "**", "*"],
    Age: [
        "Less than a month",
        "Less than a year",
        "Less than five years",
        "More than five years",
    ],
    EnergyEfficiencyClass: [
        "A+++",
        "A++",
        "A+",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
    ],
};

const { leafPathMap, leafDetailsMap } = [
    ...generatePathLeafPairs(ontology),
].reduce(
    //@ts-ignore
    (accum, pair) => {
        const [path, leaf] = pair;

        accum["leafPathMap"][leaf.label] = path;
        accum["leafDetailsMap"][leaf.label] = leaf.details;

        return accum;
    },
    { leafPathMap: {}, leafDetailsMap: {} }
);

console.log("Path to 'Trays': ", leafPathMap["Trays"]); // test if it works

const detailsModelMap = {
    // add Zod models for each possible detail here
    EnergyEfficiencyClass: z.string(),
    Age: z.string(),
    Condition: z.string(),
    Brand: z.string(),
};

//@ts-ignore
const modelDict = Object.entries(leafDetailsMap).reduce((accum, pair) => {
    const [label, details] = pair;
    const model = {};
    //@ts-ignore
    for (const detail of details) {
        //@ts-ignore
        model[detail] = detailsModelMap[detail];
    }

    //@ts-ignore
    accum[label] = z.Object(model);
    return accum;
}, {});

//@ts-ignore
console.log("Model for 'Trays': ", modelDict["Trays"]); // test if it works

// To-Do List
// - fill out details required for each leaf category in 'ontology'
// - fill out 'detailsModelMap'
// - create endpoint to fetch all items of a subcategory
