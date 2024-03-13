import { Button, Subtitle1 } from "@fluentui/react-components";

import { TableComp } from "../../components/DataGrid/TableComp";
import { useGetDefaultAllowance } from "../../services/service-allowance";

// const initialValues = {
//   memberId: "",
//   committeeId: "",
//   meetingId: "",
//   allowanceName: "",
//   amount: "",
//   rate: "",
// };

const Allowance = () => {
  const { data } = useGetDefaultAllowance();
  //   const [isOpen, setIsOpen] = useState(false);
  //   const { register, handleSubmit, reset } = useForm({
  //     defaultValues: initialValues,
  //   });

  //   const { mutateAsync: addAllowance } = useAddAllowance();

  const cols = [
    {
      dataKey: "allowanceName",
      title: "Allowance",
    },

    {
      dataKey: "amount",
      title: "Amount",
    },
    {
      dataKey: "rate",
      title: "Rate",
    },
  ];

  //   const submitHandler = async (data: any) => {
  //     const committee = committeeId || "";
  //     const response = await addAllowance({
  //       ...data,
  //       amount: +data.amount,
  //       rate: +data.rate,
  //       meetingId: +data.meetingId,
  //       committeeId: +committee,
  //       memberId: +id,
  //     });

  //     if (response.status === httpStatus.OK) {
  //       alert("Posted");
  //     }
  //     console.log({ ...data, committeeId: committeeId || "", memberId: id });
  //   };

  return (
    <div>
      <div className="flex justify-between">
        <Subtitle1>Allowance </Subtitle1>
        {/* <Button onClick={() => setIsOpen(!isOpen)}>Add Allowance</Button> */}
      </div>
      {/* <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Allowance">
        <form onSubmit={() => {}}>
          <Input name="allowanceName" register={register} label="Allowance" />
          <Input name="amount" register={register} label="Amount" />

          <Input name="rate" register={register} label="Rate" />
          <div className=" flex gap-3 mt-3">
            <Button appearance="primary" type="submit">
              Create
            </Button>
            <Button
              onClick={() => {
                setIsOpen(!open);
                reset(initialValues);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Drawer> */}
      <TableComp columns={cols} data={data || []} />
    </div>
  );
};

export default Allowance;
