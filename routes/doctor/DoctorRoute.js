import express from 'express'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import { createDoctor, deleteDoctor, getAllDoctors, getDoctorById } from '../../controllers/doctor/DoctorController.js'

const doctorRoute = express.Router()

doctorRoute.post('/doctor/add', authMiddleware, createDoctor)
doctorRoute.put('/doctor/edit/:id', authMiddleware, createDoctor)
doctorRoute.get('/doctor/all', authMiddleware, getAllDoctors)
doctorRoute.get('/doctor/:id', authMiddleware, getDoctorById)
doctorRoute.delete('/doctor/delete/:id', authMiddleware, deleteDoctor)

export default doctorRoute