import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { token } from "morgan";

const verificationTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

verificationTokenSchema.methods.matchToken = async function(token){
  return await bcrypt.compare(token, this.token)
}


verificationTokenSchema.pre('save', async function (next) {
  if (!this.isModified('token')) return next
  const salt = await bcrypt.genSalt(10)
  this.token = await bcrypt.hash(this.token, salt)
})

const VerifyToken = mongoose.model("VerifyToken", verificationTokenSchema);

export default VerifyToken;
