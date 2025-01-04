import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { SourceId, SOURCES } from "@/consts/sources";
import { CATEGORIES, CategoryId } from "@/consts/categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { setSavedFilter } from "@/state/savedFilterSlice";
import { RootState } from "@/state/store";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

const FormSchema = z.object({
  sources: z
    .array(z.enum(SOURCES.map((source) => source.id) as [SourceId]))
    .refine((value) => value.some((item) => item)),
  category: z.enum(CATEGORIES.map((category) => category.id) as [CategoryId]),
});

export function Personalize() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const savedFilters = useSelector((state: RootState) => state.savedFilters);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sources: savedFilters.sources,
      category: savedFilters.category,
    },
  });

  useEffect(() => {
    console.log("FORM ", form.formState);
  }, [form.formState]);

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
    <div className="sticky top-0">
      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
      >
        <SlidersHorizontal />
      </Button>

      <div
        className={`md:sticky md:top-4 fixed top-0 bg-white w-full h-full p-4 transition-['left'] md:p-0 ${
          mobileFiltersOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <p>Personalise your feed</p>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <X />
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                    ? field.onChange([
                                        ...field.value,
                                        source.id,
                                      ])
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
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                !form.formState.isDirty
              }
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
