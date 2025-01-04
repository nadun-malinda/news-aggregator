import { ReactNode } from "react";
import { Button } from "@/shared/ui/button";
import { SlidersHorizontal, X } from "lucide-react";

export const FilterFormLayout = ({
  title,
  children,
  isOpen,
  toggleOpen,
}: {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
}) => (
  <div className="sticky top-0">
    <Button
      variant="outline"
      size="icon"
      className="md:hidden"
      onClick={toggleOpen}
    >
      <SlidersHorizontal />
    </Button>
    <div
      className={`md:sticky md:top-4 fixed top-0 bg-white w-full h-full p-4 transition-['left'] md:p-0 ${
        isOpen ? "left-0" : "-left-full"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <p>{title}</p>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={toggleOpen}
        >
          <X />
        </Button>
      </div>
      {children}
    </div>
  </div>
);
