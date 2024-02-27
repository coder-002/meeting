import * as yup from "yup";

export const branchSchema = yup.object().shape({
  orgUnitId: yup.number().required("Org unit is required"),
  orgUnitName: yup.string().required("Orgnization unit Name is required"),
  branchName: yup.string().required("Branch Name is required"),
  branchCode: yup.string().required("Branch Code is required"),
  address: yup.string().required("Address is required"),
  contactNumber: yup.string().required("Contact Number is required"),
  isActive: yup.boolean().required(),
});
