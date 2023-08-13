import mongoose from 'mongoose'
const doctorSchema = new mongoose.Schema({
    doctorName:{
        type: String,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    unit: {
        type:String,
        reqiured: true
    },
    address: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        undefined: true
    },
    gender: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    // img:{
    //     type: String,
    //     required: true
    // },
    salary:{
        type: Number,
        required: true
    }
})

const Doctor = mongoose.model('Doctor', doctorSchema)

export default Doctor