"use client";

import { handleUpload } from "@/server/handle-upload";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ groupId }) => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 10,
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

        const formData = new FormData();
        acceptedFiles.forEach((file, index) => {
          formData.append(`file${index}`, file);
        });
        formData.append("groupId", groupId);

        try {
          const result = await handleUpload(formData);
          setUploadStatus(
            `Successfully uploaded ${result.successCount} file(s)`
          );
          setUploadProgress(100);
        } catch (error) {
          console.error("Upload failed:", error);
          setUploadStatus("Upload failed. Please try again.");
          setUploadProgress(0);
        }
      }

      if (fileRejections.length) {
        setUploadStatus(
          `${fileRejections.length} file(s) rejected. Please check the file types and try again.`
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
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
