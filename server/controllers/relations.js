import RelationModel from '../models/relationModel.js'

export const addStudentToInstitution = async (req, res) => {
  const {studentID} = req.body;
  const newRelation = new RelationModel({institutionID:req.params.id, studentID})

  try {
    await newRelation.save();
    res.status(201).json(newRelation);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const addVCToStudent = async (req, res) => {
  const {vc_url} = req.body;

  try {
    const relation = await RelationModel.findByIdAndUpdate(req.params.id, {$addToSet: {claims:vc_url}});
    res.status(201).json(relation);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const getVerifiedStudents = async (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10,
  }
  const institutionID = req.params.id;
  try {
    const relations = await RelationModel.find({
      'institutionID':institutionID, 
      'isVerified':true, 
    }).skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);
    res.status(200).json(relations);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const getUnverifiedStudents = async (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 10
  }
  const institutionID = req.params.id;
  try {
    const relations = await RelationModel.find({'institutionID':institutionID, 'isVerified':false})
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit);
    res.status(200).json(relations);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const getVerifiedInstitutions = async (req, res) => {
  // const pageOptions = {
  //   page: parseInt(req.query.page, 10) || 0,
  //   limit: parseInt(req.query.limit, 10) || 10
  // }
  const studentID = req.params.id;
  try {
    const relations = await RelationModel.find({'studentID':studentID, 'isVerified':true})
      // .skip(pageOptions.page * pageOptions.limit)
      // .limit(pageOptions.limit);
    res.status(200).json(relations);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const getUnverifiedInstitutions = async (req, res) => {
  // const pageOptions = {
  //   page: parseInt(req.query.page, 10) || 0,
  //   limit: parseInt(req.query.limit, 10) || 10
  // }
  const studentID = req.params.id;
  try {
    const relations = await RelationModel.find({'studentID':studentID, 'isVerified':false})
      // .skip(pageOptions.page * pageOptions.limit)
      // .limit(pageOptions.limit);
    res.status(200).json(relations);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const getInstitution = async (req, res) => {
  const studentID = req.params.id;
  try {
    const relations = await RelationModel.find({'studentID':studentID});
    res.status(200).json(relations);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const verifyStudent = async (req, res) => {

  try {
    const relation = await RelationModel.findByIdAndUpdate(req.params.id, {'isVerified':true});
    res.status(201).json(relation);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const getRelationById = async (req, res) => {
  try {
    const relation = await RelationModel.findById(req.params.id);
    res.status(200).json(relation);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const deleteClaim = async (req, res) => {
  const {credentials} = req.body;
  try {
    const relation = await RelationModel.findByIdAndUpdate(req.params.id, {claims:credentials});
    res.status(202).json(relation);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}
