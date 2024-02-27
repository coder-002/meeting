import {
  TabList as FluentTabs,
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabValue,
  makeStyles,
} from "@fluentui/react-components";
import { Link } from "react-router-dom";

export type TabValues = {
  id: string;
  value: string;
  label: string;
  icon?: any;
  url: string;
};

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: "20px",
  },
});

const TabList = ({
  tabs,
  selectedValue,
  onTabSelect,
  vertical,
}: {
  tabs: TabValues[];
  onTabSelect: (event: SelectTabEvent, data: SelectTabData) => void;
  selectedValue: TabValue;
  vertical?: boolean;
}) => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <FluentTabs
        selectedValue={selectedValue}
        onTabSelect={onTabSelect}
        vertical={vertical}
      >
        {tabs.map((item) => {
          return (
            <Link to={item.url}>
              <Tab id={item.id} value={item.value} icon={item.icon}>
                {item.label}
              </Tab>
            </Link>
          );
        })}
      </FluentTabs>
    </div>
  );
};

export default TabList;
