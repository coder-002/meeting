import { useParams } from "react-router-dom";
import { useGetMemberById } from "../../services/service-members";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  Body2,
  Divider,
  Title3,
} from "@fluentui/react-components";
import RelationForm from "../../components/Forms/RelationForm";
import { useState } from "react";
import AddressForm from "../../components/Forms/AddressForm";
import ContactForm from "../../components/Forms/ContactForm";
import OfficeForm from "../../components/Forms/OfficeForm";
import IdentificationForm from "../../components/Forms/IdentificationForm";

const MemberDetails = () => {
  const [openItems, setOpenItems] = useState(["1"]);
  const { id } = useParams();
  const { data } = useGetMemberById(id || "");
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Title3>Member Details</Title3>
        <Divider />
        <div className=" flex gap-4">
          <Body2>Member Name :</Body2>
          <Body2>{data?.memberName}</Body2>
        </div>
        <div className=" flex gap-4">
          <Body2>Branch Code :</Body2>
          <Body2>{data?.branchCode}</Body2>
        </div>
        <div className=" flex gap-4">
          <Body2>Group Name :</Body2>
          <Body2>{data?.groupName}</Body2>
        </div>
      </div>
      <Accordion
        multiple
        collapsible
        openItems={openItems}
        onToggle={handleToggle}
      >
        <AccordionItem value="1" className="border-2 mb-4 shadow-md">
          <AccordionHeader
            style={{
              backgroundColor: "#CDD8EF",
            }}
          >
            Address
          </AccordionHeader>
          <AccordionPanel className="p-2">
            <AddressForm id={id || ""} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2" className="border-2 mb-4 shadow-md">
          <AccordionHeader
            style={{
              backgroundColor: "#CDD8EF",
            }}
          >
            Contact
          </AccordionHeader>
          <AccordionPanel>
            <ContactForm id={id || ""} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="3" className="border-2 mb-4 shadow-md">
          <AccordionHeader
            style={{
              backgroundColor: "#CDD8EF",
            }}
          >
            Office
          </AccordionHeader>
          <AccordionPanel>
            <OfficeForm id={id || ""} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="4" className="border-2 mb-4 shadow-md">
          <AccordionHeader
            style={{
              backgroundColor: "#CDD8EF",
            }}
          >
            Identification
          </AccordionHeader>
          <AccordionPanel>
            <IdentificationForm id={id || ""} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="5" className="border-2 mb-4 shadow-md">
          <AccordionHeader
            style={{
              backgroundColor: "#CDD8EF",
            }}
          >
            Relations
          </AccordionHeader>
          <AccordionPanel>
            <RelationForm id={id || ""} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MemberDetails;
