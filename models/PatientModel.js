import mongoose from 'mongoose'
const patientSchema = new mongoose.Schema({
    patientName:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    // doctor: string;
    fee_status: {
        type:Boolean,
        default: false
    },
    blood_group: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required:true
    },
    // img: {
    //     type: String
    // },
    admitted:{
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    dateDischarged: {
        type:Date
    }
})

const Patient = mongoose.model('Patient', patientSchema)

export default Patient