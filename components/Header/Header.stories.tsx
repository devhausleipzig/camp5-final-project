import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header from "./Header";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Header",
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Header>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = (args) => <Header />;

export const Primary = Template.bind({});
Primary.parameters = {
  nextRouter: {
    asPath: "/",
  },
};

export const Secondary = Template.bind({});
Secondary.parameters = {
  nextRouter: {
    asPath: "/messages",
  },
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
