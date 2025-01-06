import { CATEGORIES } from "@/shared/consts/categories";
import { CategoryEnum } from "@/types/category";
import { UseFormReturn } from "react-hook-form";

const NON_ALL_CATEGORIES = CATEGORIES.filter(
  (cat) => cat.id !== CategoryEnum.all
).map((cat) => cat.id);

/**
 * Custom hook to manage category selection in a form.
 *
 * This hook handles the selection logic for categories, including:
 * - The "All" category, which represents selecting or deselecting all categories.
 * - Individual category toggling and its interaction with the "All" category.
 *
 * The hook ensures that:
 * - Selecting "All" deselects all other categories.
 * - Selecting all individual categories automatically selects "All."
 * - Toggling any category when "All" is selected removes "All" and selects the remaining categories.
 *
 * @param {UseFormReturn<any>} form - The React Hook Form instance used to manage form state.
 *
 * @returns {Object} An object containing:
 *   - `handleCategoryChange` (Function): A function to handle category selection changes.
 *      - @param {boolean} checked - Whether the category is being selected or deselected.
 *      - @param {string} categoryId - The ID of the category being toggled.
 *
 * @example
 * // Example usage in a React component:
 * const form = useForm();
 * const { handleCategoryChange } = useCategorySelection(form);
 *
 * <input
 *   type="checkbox"
 *   onChange={(e) => handleCategoryChange(e.target.checked, categoryId)}
 * />
 */
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
