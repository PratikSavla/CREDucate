import mongoose from 'mongoose';

const relationSchema = mongoose.Schema({
  institutionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'institution',
    require: true
  },
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student',
    require: true
  },
  isVerified: {
    type: Boolean,
    require: true,
    default: false
  },
  claims:{
    type: [String],
    default:[],
    require: true
  }
});

const RelationModel = mongoose.model('relation', relationSchema);

export default RelationModel;