import { TableComp } from "../../components/DataGrid/TableComp";
import { useGetOrganization } from "../../services/setup/service-organization";

const Organization = () => {
  const { data } = useGetOrganization();
  const cols = [
    { dataKey: "fullName", title: "Full name" },
    { dataKey: "nickName", title: "Nick name" },
    {
      dataKey: "registrationDate",
      title: "Registration Date",
    },
    { dataKey: "registrationNumber", title: "Registration Number" },
    { dataKey: "panNumber", title: "PAN No." },
    { dataKey: "contactPerson", title: "Contact Person" },
    { dataKey: "contactNumber", title: "Contact No." },
    { dataKey: "address", title: "Address" },
  ];

  return (
    <>
      <TableComp columns={cols} data={[data] || []} />
    </>
  );
};

export default Organization;
