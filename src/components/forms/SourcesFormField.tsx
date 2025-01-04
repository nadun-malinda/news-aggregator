import { SOURCES, SourcesEnum } from "@/shared/consts/sources";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import { Checkbox } from "@/shared/ui/checkbox";
import { useFormContext } from "react-hook-form";

export function SourcesFormField() {
  const form = useFormContext();

  return (
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
                                  (value: SourcesEnum) => value !== source.id
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
  );
}
