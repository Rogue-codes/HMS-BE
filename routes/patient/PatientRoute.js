import express from 'express'
import {admitPatient} from '../../controllers/admitPatient/AdmitPatient.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'

const PatientRoute = express.Router()

PatientRoute.post('/patient/admit',authMiddleware, admitPatient)

export default PatientRoute