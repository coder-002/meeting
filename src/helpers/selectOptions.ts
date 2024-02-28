type OptionType = {
  id: string | number;
  name: string;
};
export const selectOptions = (options: OptionType[]) => {
  const newOption = options?.map((item) => {
    return { label: item.name, value: item.id };
  });
  return newOption;
};
