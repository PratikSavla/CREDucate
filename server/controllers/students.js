import StudentModel from '../models/studentModel.js'

export const getStudentByDid = async (req, res) => {
  try {
    const student = await StudentModel.findOne({'did':req.params.id});
    if(!student) return res.status(404).json({message: 'User not in database'});
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const getStudentById = async (req, res) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    if(!student) return res.status(404).json({message: 'User not in database'});
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const createStudent = async (req, res) => {
  const student = req.body;

  const newStudent = new StudentModel(student);

  try {
    await newStudent.save();
    
    res.status(201).json(newStudent);
  } catch (error) {
    console.log(error)
    res.status(409).json({message: error.message});
  }
}

export const getStudentFromUsername = async (req, res) => {
  try {
    const student = await StudentModel.findOne({'username':req.params.id});
    res.status(200).json(student);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}