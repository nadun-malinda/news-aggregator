import { format, startOfToday } from "date-fns";
import { useDispatch } from "react-redux";
import {
  resetFilters,
  setCategory,
  setFrom,
  setSource,
  setTo,
} from "@/state/filterSlice";
import { DatePicker } from "../ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SOURCES, type SourceId } from "@/consts/sources";
import { CATEGORIES, CategoryEnum, type CategoryId } from "@/consts/categories";
import { useEffect } from "react";

const FormSchema = z.object({
  date: z.date().optional(),
  sources: z
    .array(z.enum(SOURCES.map((source) => source.id) as [SourceId]))
    .refine((value) => value.some((item) => item)),
  category: z.enum(CATEGORIES.map((category) => category.id) as [CategoryId]),
});

export function Filters() {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
    const date = format(data.date || "", "yyyy-MM-dd");

    dispatch(setFrom(date));
    dispatch(setTo(date));
    dispatch(setCategory(data.category));
    dispatch(setSource(data.sources));
  };

  return (
    <div className="sticky top-4">
      <p className="mb-4">Apply more filters</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-col">Date</FormLabel>
                <DatePicker selected={field.value} onSelect={field.onChange} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sources"
            render={() => (
              <FormItem>
                <FormLabel className="flex flex-col">Sources</FormLabel>

                {SOURCES.map((source) => (
                  <FormField
                    key={source.id}
                    control={form.control}
                    name="sources"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={source.id}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(source.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, source.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== source.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {source.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex flex-col">Categories</FormLabel>
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
                        <FormLabel className="font-normal">
                          {category.name}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={
              Object.keys(form.formState.errors).length > 0 ||
              !form.formState.isDirty
            }
          >
            Apply Filters
          </Button>
        </form>
      </Form>
    </div>
  );
}
