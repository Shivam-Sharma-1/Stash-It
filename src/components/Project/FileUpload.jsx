"use client";

import { handleUpload } from "@/server/handle-upload";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ groupId }) => {
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
    onDrop: async (acceptFiles, fileRejections) => {
      if (acceptFiles.length > 0) {
        console.log("accepted");
        handleUpload(acceptFiles[0], groupId);
      }

      if (fileRejections.length) {
        console.log("rejected");
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
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
