import { Badge } from "@fluentui/react-components";
import { TableComp } from "../../components/DataGrid/TableComp";
import { useGetCommittee } from "../../services/setup/service-committee";

const Committee = () => {
  const { data } = useGetCommittee();
  const cols = [
    { dataKey: "unitName", title: "Unit Name" },
    { dataKey: "branchName", title: "Branch Name" },
    { dataKey: "committeeCode", title: "Committee Code" },
    { dataKey: "committeeName", title: "Committee Name" },
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
    { dataKey: "description", title: "Description" },
  ];
  return <TableComp columns={cols} data={data || []} />;
};

export default Committee;
