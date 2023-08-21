import express from 'express'
import {admitPatient, deletePatient, editPatient, getAllPatient, getPatient, getPatientBySearch} from '../../controllers/admitPatient/AdmitPatient.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const PatientRoute = express.Router()

PatientRoute.post('/patient/admit',authMiddleware, admitPatient)
PatientRoute.get('/patient/all', authMiddleware, getAllPatient)
PatientRoute.get('/patient/:id', authMiddleware, getPatient)
PatientRoute.get('/patient/search/:title', authMiddleware, getPatientBySearch)
PatientRoute.put('/patient/update/:id', authMiddleware, editPatient)
PatientRoute.delete('/patient/delete/:id', authMiddleware, deletePatient)

export default PatientRoute