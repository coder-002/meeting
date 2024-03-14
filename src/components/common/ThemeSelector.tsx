import {
  Caption1,
  Divider,
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
        <Caption1>Light Theme</Caption1>
        <div className="grid grid-cols-3">
          <ToolbarButton
            icon={<DarkTheme24Filled color="#00008B" />}
            onClick={() => setThemeName("oceanLightThemes")}
          />

          <ToolbarButton
            icon={<DarkTheme24Filled color=" #800080" />}
            onClick={() => setThemeName("purpleLightThemes")}
          />

          <ToolbarButton
            icon={<DarkTheme24Filled color="#006400" />}
            onClick={() => setThemeName("forestLightThemes")}
          />
        </div>
        <Divider />
        <Caption1>Dark Theme</Caption1>
        <div>
          <ToolbarButton
            icon={<DarkTheme24Filled color="#00008B" />}
            onClick={() => setThemeName("oceanDarkThemes")}
          />

          <ToolbarButton
            icon={<DarkTheme24Filled color=" #800080" />}
            onClick={() => setThemeName("purpleDarkThemes")}
          />

          <ToolbarButton
            icon={<DarkTheme24Filled color="#006400" />}
            onClick={() => setThemeName("forestDarkThemes")}
          />
        </div>
      </PopoverSurface>
    </Popover>
  );
};

export default ThemeSelector;
