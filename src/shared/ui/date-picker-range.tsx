import * as React from "react";
import { format, isToday, startOfToday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange as RDPDateRange } from "react-day-picker";

import { cn } from "@/shared/utils/style";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export type DateRange = RDPDateRange;

export function DatePickerWithRange({
  className,
  onDateChange,
}: {
  className?: string;
  onDateChange?: (dateRange: DateRange) => void;
}) {
  const today = startOfToday();

  const [date, setDate] = React.useState<DateRange>({
    from: today,
    to: today,
  });

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    if (!selectedDate) return;

    const validatedDate = {
      from: selectedDate.from ? selectedDate.from : today,
      to: selectedDate.to && isToday(selectedDate.to) ? selectedDate.to : today,
    };

    setDate(validatedDate);
    onDateChange && onDateChange(validatedDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
            toDate={today} // Restrict dates to today or earlier
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
