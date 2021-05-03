import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
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

const StudentModel = mongoose.model('student', studentSchema);

export default StudentModel;