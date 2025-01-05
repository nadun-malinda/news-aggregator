import { format, startOfToday } from "date-fns";
import { useDispatch } from "react-redux";
import { setFilters, resetFilters } from "@/state/filterSlice";
import { DatePicker } from "@/shared/ui/date-picker";
import { Form, FormField, FormItem } from "@/shared/ui/form";
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
  from: z.date().optional(),
  to: z.date(),
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

export function Filters() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      from: undefined,
      to: startOfToday(),
      sources: SOURCES.map((source) => source.id),
      category: [CategoryEnum["all"]],
    },
  });

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, [dispatch]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const fromDate = data.from && format(data.from, DEFAULT_DATE_FORMAT);
    const toDate = format(data.to || "", DEFAULT_DATE_FORMAT);

    dispatch(
      setFilters({
        from: fromDate,
        to: toDate,
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
          <div>
            <p className="flex flex-col uppercase mb-2 font-semibold">Date</p>

            <div className="flex flex-col gap-2">
              {/* From Date Picker */}
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <p className="text-sm">From</p>
                    <DatePicker
                      selected={field.value}
                      onSelect={field.onChange}
                      maxDate={form.getValues("to")}
                    />
                  </FormItem>
                )}
              />

              {/* To Date Picker */}
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <p className="text-sm">To</p>
                    <DatePicker
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);

                        // Adjust "from" date if it's after the new "to" date
                        const fromDate = form.getValues("from");

                        if (fromDate && date && fromDate > date) {
                          form.setValue("from", undefined); // Reset "from" date
                        }
                      }}
                    />
                  </FormItem>
                )}
              />
            </div>
          </div>

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
