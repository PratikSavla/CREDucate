import express from 'express';

import { getVerifierById, getVerifierByDid, createVerifier, getVerifierFromUsername } from '../controllers/verifier.js';

const router = express.Router();

router.get('/detailsFromUsername/:id', getVerifierFromUsername);
router.get('/did/:id', getVerifierByDid);
router.get('/id/:id', getVerifierById);
router.post('/', createVerifier);


export default router;