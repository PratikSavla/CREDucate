import axios from 'axios';

const accessApiKey = process.env.REACT_APP_API_KEY;
export const cloudWalletBaseUrl  = `https://cloud-wallet-api.prod.affinity-project.org/api/v1`;
export const issuerBaseUrl = `https://affinity-issuer.prod.affinity-project.org/api/v1`;
export const verifierBaseUrl = `https://affinity-verifier.prod.affinity-project.org/api/v1`;
export const messageBaseUrl = `https://affinidi-messages.prod.affinity-project.org/api/v1`
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

export const messagerApi = axios.create({
  baseURL: messageBaseUrl,
  headers: {
    'Api-Key': accessApiKey,
    'Content-Type': 'application/json',
  },
});

export const apiInstances = [cloudWalletApi, issuerApi, verifierApi, messagerApi];