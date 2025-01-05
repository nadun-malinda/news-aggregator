import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/shared/utils/style";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export function DatePicker({
  selected,
  onSelect,
  maxDate,
}: {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  maxDate?: Date;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={(date) =>
            date > new Date() || (maxDate ? date > maxDate : false)
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
