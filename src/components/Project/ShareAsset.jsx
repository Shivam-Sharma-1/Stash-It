import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import shareAsset from "@/server/share-asset";

const createUrl = async (cid) => {
  const shareUrl = await shareAsset(cid);

  return shareUrl;
};

const ShareAsset = ({ cid }) => {
  const shareUrl = createUrl(cid);

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-gray-500 rounded-md">
        Share
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share this url</DialogTitle>
          <DialogDescription>{shareUrl}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareAsset;
