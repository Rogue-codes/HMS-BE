import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'name is required!']
    },
    email: {
        type: String,
        required: [true, 'email is required!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required!']
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

// Match user entered password to hashed password in database
// verify encrypted password before login
AdminSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})



const Admin = mongoose.model('Admin',AdminSchema)

export default Admin


