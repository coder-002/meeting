import { Badge, Spinner } from "@fluentui/react-components";
import { TableComp } from "../../components/DataGrid/TableComp";
import { useGetDesignation } from "../../services/setup/service-designation";

const Designation = () => {
  const { data, isLoading } = useGetDesignation();
  const cols = [
    { dataKey: "designationName", title: "Designation Name" },
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
  if (isLoading) {
    return <Spinner />;
  }

  return <TableComp columns={cols} data={data || []} />;
};

export default Designation;
