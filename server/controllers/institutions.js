import InstitutionModel from '../models/institutionModel.js'

export const getInstitutionByDid = async (req, res) => {
  try {
    const institution = await InstitutionModel.findOne({'did':req.params.id});
    if(!institution) return res.status(404).json({message: 'User not in database'})
    res.status(200).json(institution);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const getInstitutionById = async (req, res) => {
  try {
    const institution = await InstitutionModel.findById(req.params.id);
    if(!institution) return res.status(404).json({message: 'User not in database'});
    res.status(200).json(institution);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const createInstitution = async (req, res) => {
  const institution = req.body;

  const newInstitution = new InstitutionModel(institution);

  try {
    await newInstitution.save();
    
    res.status(201).json(newInstitution);
  } catch (error) {
    console.log(error)
    res.status(409).json({message: error.message});
  }
}

export const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await InstitutionModel.find();
    res.status(200).json(institutions)
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}