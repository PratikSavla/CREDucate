import VerifierModel from '../models/verifierModel.js'

export const getVerifierByDid = async (req, res) => {
  try {
    const verifier = await VerifierModel.findOne({'did':req.params.id});
    if (!verifier) return res.status(404).json({message: 'User not in database'});
    res.status(200).json(verifier);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const getVerifierById = async (req, res) => {
  try {
    const verifier = await VerifierModel.findById(req.params.id);
    if (!verifier) return res.status(404).json({message: 'User not in database'});

    res.status(200).json(verifier);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

export const createVerifier = async (req, res) => {
  const verifier = req.body;

  const newVerifier = new VerifierModel(verifier);

  try {
    await newVerifier.save();
    
    res.status(201).json(newVerifier);
  } catch (error) {
    console.log(error)
    res.status(409).json({message: error.message});
  }
}

export const getVerifierFromUsername = async (req, res) => {
  try {
    const verifier = await VerifierModel.findOne({'username':req.params.id});
    res.status(200).json(verifier);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}