
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from 'dotenv';


import crypto from "crypto";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

dotenv.config();

export const awsAccessKeyId = process.env.AWS_ACCES_KEY as string;
export const awsSecret = process.env.AWS_SECRET as string;
export const awsBucket = process.env.BUCKET_NAME as string;
export const awsRegion = process.env.BUCKET_REGION as string;

const generateKey = () => { return crypto.randomBytes(32).toString('hex'); }
export const S3 = new S3Client({
    credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecret,
    },
    region: awsRegion,
});

export const uploadImg = async (file: Express.Multer.File, name?: string) => {
    let avatar = name;
    if (!name) avatar = crypto.randomBytes(32).toString('hex');

    const params = {
        Body: file.buffer,
        Bucket: awsBucket,
        Key: avatar,
        ContentType: file.mimetype
    };


    const command = new PutObjectCommand(params);
    await S3.send(command);

    return avatar;
}

export const readImg = async (fileName: string | null) => {
    if (!fileName) return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
    const getObjectParams = {
        Bucket: awsBucket,
        Key: fileName
    }
    const command = new GetObjectCommand(getObjectParams)
    return await getSignedUrl(S3, command, { expiresIn: 3600 });
}



export const createUploadLink = async () => {
    const Key = generateKey();
    const putObjectParams = {
        Bucket: awsBucket,
        Key
    }
    const command = new PutObjectCommand(putObjectParams);
    return {
        link: await getSignedUrl(S3, command, {
            expiresIn: 3600
        }),
        name: Key
    }
}