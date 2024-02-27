import { TableComp } from "../../components/DataGrid/TableComp";
import { useGetDeduct } from "../../services/setup/service-deduct";

const Deduction = () => {
  const { data } = useGetDeduct();
  const cols = [
    { dataKey: "deductTitle", title: "Deduct Title" },
    { dataKey: "rate", title: "Rate" },
  ];

  return <TableComp columns={cols} data={data || []} />;
};

export default Deduction;
