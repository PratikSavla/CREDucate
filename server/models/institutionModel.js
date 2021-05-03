import mongoose from 'mongoose';

const institutionSchema = mongoose.Schema({
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
  },
  VCIssued: {
    type: Number,
    default: 0
  }
});

const InstitutionModel = mongoose.model('institution', institutionSchema);

export default InstitutionModel;