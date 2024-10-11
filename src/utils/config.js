"server only";

import { PINATA_GATEWAY_URL, PINATA_JWT } from "@/lib/constants";
import { PinataSDK } from "pinata-web3";

export const pinata = new PinataSDK({
  pinataJwt: PINATA_JWT,
  pinataGateway: PINATA_GATEWAY_URL,
});
