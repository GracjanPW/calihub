import path from "path";
import fs from "fs";
import { randomInt } from "crypto";

export function saveFile(
  file: File
): Promise<Partial<{ url: string; error: string }>> {
  return new Promise(async (resolve, reject) => {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      let name = file.name;
      if (!fs.existsSync(path.join(process.cwd(), "public/assets"))) {
        fs.mkdirSync(path.join(process.cwd(), "public/assets"));
      }
      while (fs.existsSync(path.join(process.cwd(), "public/assets/" + name))) {
        name = randomInt(0, 10).toString() + name;
      }
      let url = path.join("public/assets/", name);
      await fs.promises
        .writeFile(path.join(process.cwd(), url), new Uint8Array(buffer))
        .then(
          (value) => {
            console.log("val ", value);
          },
          (reason) => {
            console.log(reason);
            reject({ error: reason });
          }
        )
        .catch((error) => {
          console.log({ error });
          reject(error);
        })
        .finally(() => {
          resolve({ url });
        });
    } catch (error) {
      console.log(error);
      reject({ error });
    }
  });
}
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export default async function saveFileSupabase(file: File) {
  const client = new S3Client({
    forcePathStyle: true,
    region: process.env.SUPABASE_REGION,
    endpoint: process.env.SUPABASE_ENDPOINT_URL,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
  });
  const buffer = Buffer.from(await file.arrayBuffer());
  const command = new PutObjectCommand({
    Bucket: "images",
    Key: file.name + "1",
    Body: buffer,
    ContentType: file.type,
    ContentLength: file.size,
  });

  await client
    .send(command)
    .then((value) => {
      console.log(value);
    })
    .catch((error) => {
      console.log(error);
    });
  const getComand = new GetObjectCommand({
    Bucket: "images",
    Key: file.name + "1",
  });
  const url = await client
    .send(getComand)
    .then((value) => {
      return value;
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(url);
  client.destroy();
  return { url: process.env.SUPABASE_ENDPOINT + "/images/" + file.name };
}
