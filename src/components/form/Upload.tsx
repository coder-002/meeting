import { Button } from "@fluentui/react-components";
import { useDropzone } from "react-dropzone";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useUploadAttachment } from "../../services/service-attachment";
import { useState } from "react";

const Upload = ({ id }: { id: string }) => {
  const { register, handleSubmit } = useForm();
  const { mutateAsync: upload } = useUploadAttachment();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
    },
    onDrop: (acceptedFiles) => {
      setSelectedImages(acceptedFiles);
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
    },
  });

  const handleUpload = async (data: any) => {
    if (!selectedImages) {
      return;
    }

    try {
      await upload({
        tableName: "meetings",
        rowId: +id,
        attachmentType: data.attachmentType,
        file: selectedImages,
      });

      console.log("Upload successful");
    } catch (error) {
      console.error("Error uploading attachment:", error);
    }
  };
  const handleRemoveImage = () => {
    setSelectedImages([]);
    setImagePreview(null);
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
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Preview" />
              <Button onClick={handleRemoveImage}>Remove</Button>
            </div>
          )}
          <aside>
            <h4>Files</h4>
            {selectedImages.map((file) => (
              <div key={file.name}>
                {file.name} - {file.size} bytes
              </div>
            ))}
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
