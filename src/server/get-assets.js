"use server";

import { checkUser } from "@/lib/checkUser";
import { pinata } from "@/utils/config";
import { getAssetUrls } from "./get-asset-urls";

const getAssets = async ({ groupId, page }) => {
  const itemsPerPage = 10;

  try {
    const response = await pinata
      .listFiles()
      .group(groupId)
      .pageLimit(itemsPerPage + 1) // Request 11 items
      .pageOffset(page * itemsPerPage); // Correct offset when page starts at 0

    let files = response;
    let hasNextPage = false;

    // Check if we received more than itemsPerPage items
    if (files.length > itemsPerPage) {
      // Remove the extra item
      files.pop();
      hasNextPage = true;
    }
    // Get urls for the files
    const urlsObject = await getAssetUrls(
      files.map((file) => file.ipfs_pin_hash)
    );

    // Combine file data with urls
    const filesWithUrls = files.map((file) => ({
      ...file,
      url: urlsObject[file.ipfs_pin_hash] || null, // Use null if URL is not found
    }));

    console.log("Assets fetched from database", filesWithUrls);
    return { files: filesWithUrls, page, hasNextPage };
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw new Error(`Failed to fetch assets: ${error.message}`);
  }
};

export default getAssets;
