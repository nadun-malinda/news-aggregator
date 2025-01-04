import { format, startOfToday } from "date-fns";
import { useDispatch } from "react-redux";
import { setFilters, resetFilters } from "@/state/filterSlice";
import { DatePicker } from "@/shared/ui/date-picker";
import { Form, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/ui/button";
import { SOURCES, type SourceId } from "@/shared/consts/sources";
import {
  CATEGORIES,
  CategoryEnum,
  type CategoryId,
} from "@/shared/consts/categories";
import { useEffect, useState } from "react";
import { FilterFormLayout } from "../layout/FilterFormLayout";
import { CategoryFormField } from "../forms/CategoryFormField";
import { SourcesFormField } from "../forms/SourcesFormField";
import { DEFAULT_DATE_FORMAT } from "@/shared/consts/date";

const FormSchema = z.object({
  date: z.date(),
  sources: z
    .array(z.enum(SOURCES.map((source) => source.id) as [SourceId]))
    .refine((value) => value.some((item) => item)),
  category: z.enum(CATEGORIES.map((category) => category.id) as [CategoryId]),
});

export function Filters() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      date: startOfToday(),
      sources: SOURCES.map((source) => source.id),
      category: CategoryEnum["all"],
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const date = format(data.date || "", DEFAULT_DATE_FORMAT);

    dispatch(
      setFilters({
        from: date,
        to: date,
        category: data.category,
        sources: data.sources,
      })
    );

    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <FilterFormLayout
      title="Apply more filters"
      isOpen={mobileFiltersOpen}
      toggleOpen={() => setMobileFiltersOpen(!mobileFiltersOpen)}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-col uppercase mb-1 font-semibold">
                  Date
                </FormLabel>
                <DatePicker selected={field.value} onSelect={field.onChange} />
              </FormItem>
            )}
          />

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
            Apply Filters
          </Button>
        </form>
      </Form>
    </FilterFormLayout>
  );
}
