import { Spinner } from "@fluentui/react-components";

const Loading = () => {
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <Spinner size="extra-large" labelPosition="below" label={"Loading..."} />
    </div>
  );
};

export default Loading;
