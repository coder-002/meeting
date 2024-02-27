import { Badge } from "@fluentui/react-components";
import { TableComp } from "../../components/DataGrid/TableComp";
import { useGetBranch } from "../../services/setup/service-branch";

const Branch = () => {
  const { data } = useGetBranch();
  const cols = [
    {
      dataKey: "orgUnitName",
      title: "Unit Name",
    },
    {
      dataKey: "branchName",
      title: "Branch Name",
    },
    {
      dataKey: "address",
      title: "Address",
    },
    {
      dataKey: "contactNumber",
      title: "Contact No.",
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

export default Branch;
