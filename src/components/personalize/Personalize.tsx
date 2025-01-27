import { z } from "zod";
import { Button } from "@/shared/ui/button";
import { Form } from "@/shared/ui/form";
import { SOURCES } from "@/shared/consts/sources";
import { CATEGORIES } from "@/shared/consts/categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { setSavedFilter } from "@/state/savedFilterSlice";
import { RootState } from "@/state/store";
import { toast } from "sonner";
import { useState } from "react";
import { FilterFormLayout } from "../layout/FilterFormLayout";
import { SourcesFormField } from "../forms/SourcesFormField";
import { CategoryFormField } from "../forms/CategoryFormField";
import { CategoryId } from "@/types/category";
import { SourceId } from "@/types/source";

const FormSchema = z.object({
  sources: z
    .array(z.enum(SOURCES.map((source) => source.id) as [SourceId]))
    .refine((value) => value.length > 0, {
      message: "At least one source must be selected.",
    }),
  category: z
    .array(z.enum(CATEGORIES.map((category) => category.id) as [CategoryId]))
    .refine((value) => value.length > 0, {
      message: "At least one category must be selected.",
    }),
});

export function Personalize() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const savedFilters = useSelector((state: RootState) => state.savedFilters);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      sources: savedFilters.sources,
      category: savedFilters.category,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast("Preferences saved successfully!", {
      description: "Your feed is now personalised based on your filters.",
      action: {
        label: "Ok",
        onClick: () => {},
      },
    });

    dispatch(
      setSavedFilter({
        sources: data.sources,
        category: data.category,
        authors: [],
      })
    );

    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <FilterFormLayout
      title="Personalize your feed"
      isOpen={mobileFiltersOpen}
      toggleOpen={() => setMobileFiltersOpen(!mobileFiltersOpen)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <SourcesFormField />
          <CategoryFormField />

          <Button
            type="submit"
            disabled={
              !form.formState.isDirty ||
              Object.keys(form.formState.errors).length > 0 ||
              form.formState.isSubmitting
            }
          >
            Save
          </Button>
        </form>
      </Form>
    </FilterFormLayout>
  );
}
