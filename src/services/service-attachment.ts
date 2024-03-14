import { useMutation, useQueryClient } from "react-query";
import instance from "./apiService";
import { api } from "./service-api";

const uploadAttachment = ({
  tableName,
  rowId,
  attachmentType,
  file,
}: {
  tableName: string;
  rowId: number;
  attachmentType: string;
  file: any;
}) => {
  const formData = new FormData();
  formData.append("file", file);
  return instance.post(api.attachments.post, {
    tableName,
    rowId,
    attachmentType,
    formData,
  });
};

const useUploadAttachment = () => {
  return useMutation((file: any) => uploadAttachment(file), {
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("Error uploading attachment:", error);
      // Handle error and display message to user
    },
  });
};

export { useUploadAttachment };
