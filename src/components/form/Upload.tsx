import { Button } from "@fluentui/react-components";
import { useDropzone } from "react-dropzone";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useUploadAttachment } from "../../services/service-attachment";
import httpStatus from "http-status";

const Upload = ({ id }: { id: string }) => {
  const { register, handleSubmit } = useForm();
  const { mutateAsync: upload } = useUploadAttachment();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
    },
  });

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const formData = new FormData();
  acceptedFiles.forEach((file) => {
    formData.append("files", file[0]);
  });

  const handleUpload = async (data) => {
    const response = await upload({
      formData,
      tableName: "meetings",
      rowId: id,
      ...data,
    });
    if (response.status === httpStatus.OK) {
      console.log("upload");
    }
  };
  return (
    <form onSubmit={handleSubmit(handleUpload)}>
      <Input
        name="attachmentType"
        register={register}
        label="Attachment Type"
      />
      <div className="p-8">
        <section className="flex flex-col items-center p-20 border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 outline-none transition duration-200">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
        </section>
      </div>
      <Button appearance="primary" type="submit">
        Upload
      </Button>
    </form>
  );
};

export default Upload;
