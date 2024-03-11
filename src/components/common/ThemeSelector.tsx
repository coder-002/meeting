import {
  Popover,
  PopoverProps,
  PopoverSurface,
  PopoverTrigger,
  ToolbarButton,
} from "@fluentui/react-components";
import { DarkTheme24Filled } from "@fluentui/react-icons";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

const ThemeSelector = () => {
  const [open, setOpen] = useState(false);
  const setThemeName = useContext(ThemeContext);

  const handleOpenChange: PopoverProps["onOpenChange"] = (e, data) =>
    setOpen(data.open || false);
  return (
    <Popover open={open} onOpenChange={handleOpenChange} withArrow>
      <PopoverTrigger>
        <ToolbarButton icon={<DarkTheme24Filled />} />
      </PopoverTrigger>

      <PopoverSurface style={{ maxWidth: "400px" }}>
        <div className="grid grid-cols-3">
          <ToolbarButton
            icon={<DarkTheme24Filled color="#00008B" />}
            onClick={() => setThemeName("oceanLightThemes")}
          />
          <ToolbarButton
            icon={<DarkTheme24Filled color="#301934" />}
            onClick={() => setThemeName("purpleLightThemes")}
          />
          <ToolbarButton
            icon={<DarkTheme24Filled color="#006400" />}
            onClick={() => setThemeName("forestLightThemes")}
          />
        </div>
      </PopoverSurface>
    </Popover>
  );
};

export default ThemeSelector;
