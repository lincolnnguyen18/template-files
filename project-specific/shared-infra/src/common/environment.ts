import * as dotenv from 'dotenv';

dotenv.config();

interface Environment {
  S3_BACKEND_BUCKET_NAME: string;
  AWS_REGION: string;
  PROJECT_NAME: string;
  HETZNER_TOKEN: string;
}

const environment: Environment = {
  S3_BACKEND_BUCKET_NAME: process.env.S3_BACKEND_BUCKET_NAME as string,
  AWS_REGION: process.env.AWS_REGION as string,
  PROJECT_NAME: process.env.PROJECT_NAME as string,
  HETZNER_TOKEN: process.env.HETZNER_TOKEN as string,
};

export default environment;
