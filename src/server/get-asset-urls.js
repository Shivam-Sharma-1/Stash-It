'use server';
import { checkUser } from '@/lib/checkUser';
import { pinata } from '@/utils/config';

export async function getAssetUrls(cids) {
  await checkUser();
  console.log(cids);
  const urls = {};
  await Promise.all(
    cids.map(async (cid) => {
      const result = await pinata.gateways.convert(cid);
      urls[cid] = result;
    })
  );
  return urls;
}
