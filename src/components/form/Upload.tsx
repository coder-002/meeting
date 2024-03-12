import { Button } from "@fluentui/react-components";
import { useDropzone } from "react-dropzone";

const Upload = () => {
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

  const handleUpload = () => {};

  return (
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
      <Button appearance="primary" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default Upload;
