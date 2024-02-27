import { Badge } from "@fluentui/react-components";
import { TableComp } from "../../components/DataGrid/TableComp";
import { useGetUnits } from "../../services/setup/service-unit";

const Unit = () => {
  const { data } = useGetUnits();
  const cols = [
    {
      dataKey: "unitName",
      title: "Unit Name",
    },
    {
      dataKey: "registrationDate",
      title: "Registration Date",
      render: (item: any) => {
        return <>{item.registrationDate.slice(0, 10)}</>;
      },
    },
    {
      dataKey: "address",
      title: "Address",
    },
    {
      dataKey: "isActive",
      title: "Status",
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
            color={item.isActive ? "success" : "danger"}
          >
            {item.isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
  ];
  return <TableComp columns={cols} data={data || []} />;
};

export default Unit;
