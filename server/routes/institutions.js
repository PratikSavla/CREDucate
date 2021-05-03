import express from 'express';

import { createInstitution, getAllInstitutions, getInstitutionByDid, getInstitutionById } from '../controllers/institutions.js';

const router = express.Router();

router.get('/',getAllInstitutions);
router.get('/did/:id', getInstitutionByDid);
router.get('/id/:id', getInstitutionById);
router.post('/', createInstitution);


export default router;