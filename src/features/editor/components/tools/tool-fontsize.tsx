import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React from "react";

export const ToolFontSize = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const decrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const increment = () => {
    onChange(value + 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)  && newValue > 0) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex">
      <Button
        onClick={decrement}
        disabled={value == 1}
        size="icon"
        variant="outline"
        className="rounded-r-none"
      >
        <Minus className="size-4" />
      </Button>
      <Input
        type="number"
        min="1"
        value={value}
        onChange={handleChange}
        className="w-16 h-8 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button 
        onClick={increment}
        size="icon" 
        variant="outline" className="rounded-l-none"
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
