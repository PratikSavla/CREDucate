import express from 'express';

import { addVCToStudent, 
  addStudentToInstitution,
  verifyStudent,
  getRelationById,
  getVerifiedStudents,
  getUnverifiedStudents,
  getVerifiedInstitutions,
  getUnverifiedInstitutions,
  getInstitution,
  deleteClaim,
  deleteRelation
} from '../controllers/relations.js';

const router = express.Router();

router.put('/VC/:id', addVCToStudent);
router.delete('/:id', deleteRelation);
router.put('/deleteClaim/:id', deleteClaim);
router.post('/add/:id', addStudentToInstitution);
router.put('/verify/:id', verifyStudent);
router.get('/verified-students/:id', getVerifiedStudents);
router.get('/institution/:id', getInstitution);
router.get('/unverified-students/:id', getUnverifiedStudents);
router.get('/verified-institutions/:id',getVerifiedInstitutions);
router.get('/unverified-institutions/:id',getUnverifiedInstitutions);
router.get('/byid/:id', getRelationById);

export default router;