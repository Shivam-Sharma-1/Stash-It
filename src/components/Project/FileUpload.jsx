"use client";

import { handleUpload } from "@/server/handle-upload";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ groupId }) => {
  const [uploadStatus, setUploadStatus] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "video/mp4": [".mp4"],
      "video/mkv": [".mkv"],
      "audio/mp3": [".mp3"],
      "audio/wav": [".wav"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    onDrop: async (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length > 0) {
        setUploadStatus("Uploading...");
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("groupId", groupId);

        try {
          await handleUpload(formData);
          setUploadStatus("Upload successful!");
        } catch (error) {
          console.error("Upload failed:", error);
          setUploadStatus("Upload failed. Please try again.");
        }
      }

      if (fileRejections.length) {
        setUploadStatus(
          "File rejected. Please check the file type and try again."
        );
      }
    },
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "hover:cursor-pointer hover:bg-secondary hover:border-primary transition-all  ease-in-out",
        `${isDragActive ? "animate-pulse border-primary bg-secondary" : ""}`
      )}
    >
      <CardContent className="flex flex-col h-full items-center justify-center px-2 py-24 text-xs">
        <input {...getInputProps()} />
        <div className="flex items-center flex-col justify-center gap-4">
          <p className="text-muted-foreground text-2xl">
            {isDragActive
              ? "Drop your image here!"
              : "Start by uploading an image"}
          </p>
          <p className="text-muted-foreground">
            Supported formats .jpeg .jpg .webp .png
          </p>
          {uploadStatus && (
            <p
              className={
                uploadStatus.includes("successful")
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {uploadStatus}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
