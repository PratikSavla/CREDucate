import mongoose from 'mongoose';

const verifierSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  did: {
    type: String,
    require: true
  },
  contact:  {
    type: String,
    require: true
  },
  address:  {
    type: String,
    require: true
  }
});

const VerifierModel = mongoose.model('verifier', verifierSchema);

export default VerifierModel;