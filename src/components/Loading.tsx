import { Spinner } from "@fluentui/react-components";

const Loading = () => {
  return (
    <div className=" h-screen w-full flex justify-center items-center">
      <Spinner size="extra-large" labelPosition="below" label={"Loading..."} />
    </div>
  );
};

export default Loading;
