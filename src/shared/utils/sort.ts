type SortOrder = "asc" | "desc";

export function sortByDate<T>(
  array: T[],
  dateKey: keyof T,
  order: SortOrder = "desc"
): T[] {
  return array.sort((a, b) => {
    const dateA = new Date(a[dateKey] as unknown as string);
    const dateB = new Date(b[dateKey] as unknown as string);

    if (order === "desc") {
      return dateB.getTime() - dateA.getTime();
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });
}
