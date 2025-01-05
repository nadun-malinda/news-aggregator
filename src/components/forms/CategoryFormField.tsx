import { CATEGORIES } from "@/shared/consts/categories";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Checkbox } from "@/shared/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { useCategorySelection } from "@/shared/hooks/useCategorySelection";
import { CategoryEnum } from "@/types/category";

export function CategoryFormField() {
  const form = useFormContext();
  const { handleCategoryChange } = useCategorySelection(form);
  const categories = form.watch("category") || [];

  // Check if "All" is selected or if all individual categories are selected
  const isAllSelected = categories.includes(CategoryEnum.all);

  return (
    <FormField
      control={form.control}
      name="category"
      render={() => (
        <FormItem>
          <p className="flex flex-col uppercase mb-3 font-semibold">
            Categories
          </p>
          <FormControl>
            <div className="flex flex-col space-y-3">
              {CATEGORIES.map((category) => (
                <FormItem
                  key={category.id}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={
                        isAllSelected || categories.includes(category.id) // Ensure "All" reflects all others
                      }
                      onCheckedChange={(checked) =>
                        handleCategoryChange(checked as boolean, category.id)
                      }
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{category.name}</FormLabel>
                </FormItem>
              ))}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
