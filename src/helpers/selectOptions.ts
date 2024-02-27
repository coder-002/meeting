type OptionType = {
  id: string;
  name: string;
};
export const selectOptions = (options: OptionType[]) => {
  const newOption = options.map((item) => {
    return { label: item.name, value: item.id };
  });
  return newOption;
};
