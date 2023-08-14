import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import { createDoctor, deleteDoctor, getAllDoctors, getDoctorById } from '../../controllers/doctor/DoctorController.js'

const DoctorRoute = express.Router()

DoctorRoute.post('/doctor/add', authMiddleware, createDoctor)
DoctorRoute.put('/doctor/edit/:id', authMiddleware, createDoctor)
DoctorRoute.get('/doctor/all', authMiddleware, getAllDoctors)
DoctorRoute.get('/doctor/:id', authMiddleware, getDoctorById)
DoctorRoute.delete('/doctor/delete/:id', authMiddleware, deleteDoctor)

export default DoctorRoute