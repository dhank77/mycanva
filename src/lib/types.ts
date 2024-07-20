import * as material from "material-colors";

export type ActiveToolTypes =
   //navbar
   | "select"

   // topbar menu
   | "fill"
   | "stroke-color"
   | "stroke-width"
   | "bring-front"
   | "send-back"
   | "opacity"
   | "font"
   | "bold"
   | "italic"
   | "underline"
   | "linethrough"
   | "filter"
   | "remove-bg"

   // side menu
   | "design"
   | "image"
   | "text"
   | "shapes"
   | "ai"
   | "draw"
   | "settings";

export const fonts = [
   "Arial",
   "Arial Black",
   "Verdana",
   "Helvetica",
   "Tahoma",
   "Trebuchet MS",
   "Times New Roman",
   "Georgia",
   "Garamond",
   "Courier New",
   "Brush Script MT",
   "Palatino",
   "Bookman",
   "Comic Sans MS",
   "Impact",
   "Lucida Sans Unicode",
   "Geneva",
   "Lucida Console",
];

export const colors = [
   material.red["500"],
   material.pink["500"],
   material.purple["500"],
   material.deepPurple["500"],
   material.indigo["500"],
   material.blue["500"],
   material.lightBlue["500"],
   material.cyan["500"],
   material.teal["500"],
   material.green["500"],
   material.lightGreen["500"],
   material.lime["500"],
   material.yellow["500"],
   material.amber["500"],
   material.orange["500"],
   material.deepOrange["500"],
   material.brown["500"],
   material.blueGrey["500"],
   "transparent",
];

export const closeSideBarTools = [
   "fill",
   "stroke-color",
   "stroke-width",
   "opacity",
   "remove-bg",
];

export const filters = [
   "none",
   "polaroid",
   "sepia",
   "kodachrome",
   "contrast",
   "brightness",
   "greyscale",
   "brownie",
   "vintage",
   "technicolor",
   "pixelate",
   "invert",
   "blur",
   "sharpen",
   "emboss",
   "removecolor",
   "blacknwhite",
   "vibrance",
   "blendcolor",
   "huerotate",
   "resize",
   "saturation",
   "gamma",
 ];
 