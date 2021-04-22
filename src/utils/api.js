import axios from 'axios';
import env from "react-dotenv";

const accessApiKey = env.API_KEY;
const cloudWalletBaseUrl  = `https://cloud-wallet-api.prod.affinity-project.org/api/v1`;
const issuerBaseUrl = `https://affinity-issuer.prod.affinity-project.org/api/v1`;
const verifierBaseUrl = `https://affinity-verifier.prod.affinity-project.org/api/v1`;

export const cloudWalletApi = axios.create({
  baseURL: cloudWalletBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export const issuerApi = axios.create({
  baseURL: issuerBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export const verifierApi = axios.create({
  baseURL: verifierBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export const apiInstances = [cloudWalletApi, issuerApi, verifierApi];