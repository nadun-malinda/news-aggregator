import { CATEGORIES, CategoryEnum } from "@/shared/consts/categories";
import { UseFormReturn } from "react-hook-form";

const NON_ALL_CATEGORIES = CATEGORIES.filter(
  (cat) => cat.id !== CategoryEnum.all
).map((cat) => cat.id);

export function useCategorySelection(form: UseFormReturn<any>) {
  const handleCategoryChange = async (checked: boolean, categoryId: string) => {
    const currentCategories = form.getValues("category") || [];

    if (categoryId === CategoryEnum.all) {
      // Handle "All" checkbox
      const newCategories = checked ? [CategoryEnum.all] : [];
      form.setValue("category", newCategories, { shouldDirty: true });
    } else {
      // Handle individual category selection
      let newCategories = checked
        ? [...currentCategories, categoryId]
        : currentCategories.filter((cat: string) => cat !== categoryId);

      // If all individual categories are selected, add "All"
      if (
        NON_ALL_CATEGORIES.every((cat) => newCategories.includes(cat)) &&
        !newCategories.includes(CategoryEnum.all)
      ) {
        newCategories = [CategoryEnum.all];
      }

      // If "All" is currently selected, and an individual checkbox is toggled, remove "All"
      if (
        currentCategories.includes(CategoryEnum.all) &&
        !checked &&
        categoryId !== CategoryEnum.all
      ) {
        newCategories = NON_ALL_CATEGORIES.filter((cat) => cat !== categoryId);
      }

      form.setValue("category", newCategories, { shouldDirty: true });
    }

    // Trigger validation
    await form.trigger("category");
  };

  return {
    handleCategoryChange,
  };
}
