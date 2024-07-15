import { colors } from "@/lib/types";
import { rgbaToString } from "@/lib/utils";
import {
   ChromePicker,
   CirclePicker,
} from "react-color";

export const ToolPickerColor = ({
   value,
   onChange,
}: {
   value: string;
   onChange: (value: string) => void;
}) => {
   return (
      <div className="w-full space-y-4">
         <ChromePicker
            color={value}
            onChange={(color) => {
               const colorToString = rgbaToString(color.rgb);
               onChange(colorToString);
            }}
         />
         <CirclePicker
            color={value}
            colors={colors}
            onChangeComplete={(color) => {
               const colorToString = rgbaToString(color.rgb);
               onChange(colorToString);
            }}
         />
      </div>
   );
};
