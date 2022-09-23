const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const {DaySchema} = require("./Day")
const {QueueSchema} = require("./Queue")
const {ToDoSchema} = require("./ToDo")

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
birthdate: {
    type:Date,
    required:true
},
habits:[{
  type:Schema.Types.ObjectId,
  ref:"Habit",
}],
assessments:[{
  type:Schema.Types.ObjectId,
  ref:"Assessment"
}],
orientated:{
  type:Boolean,
  default:false
},
lastPopulated:{
  type:Date
},
lastAssessed:{
  type:Date
},
lastReviewed:{
  type:Date
},
lastSetting:{
  type:Date
},
days:[DaySchema],
queue:[QueueSchema],
toDos:[ToDoSchema],
settings:[{
  type:Schema.Types.ObjectId,
  ref:"Setting"
}],
journal:[{
  type:Schema.Types.ObjectId,
  ref:"Journal"
}]
});

// set up pre-save middleware to create password
UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = {UserSchema,User};
