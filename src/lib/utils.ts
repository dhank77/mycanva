import { type ClassValue, clsx } from "clsx"
import { type RGBColor } from "react-color";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isTypeText(type : string | undefined){
  return type === 'text' || type === 'i-text' || type === 'textbox';
}

export function rgbaToString(rgba : RGBColor | "transparent"){
  if(rgba == "transparent") {
    return `rgba(0,0,0,0)`;
  }

  const alpha = rgba.a || 1;
  return `rgba(${rgba.r},${rgba.g},${rgba.b},${alpha})`;
}