import { CATEGORIES } from "@/shared/consts/categories";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { useFormContext } from "react-hook-form";

export function CategoryFormField() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <p className="flex flex-col uppercase mb-3 font-semibold">
            Categories
          </p>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value || CATEGORIES[0].id}
              className="flex flex-col space-y-1"
            >
              {CATEGORIES.map((category) => (
                <FormItem
                  key={category.id}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={category.id} />
                  </FormControl>
                  <FormLabel className="font-normal">{category.name}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
