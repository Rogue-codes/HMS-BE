import Doctor from "../../models/DoctorModel.js";

export const createDoctor = async (req, res) => {
  const {
    doctorName,
    level,
    age,
    unit,
    address,
    phone_number,
    email,
    gender,
    salary,
  } = req.body;

  try {
    if (
      !doctorName ||
      !level ||
      !age ||
      !unit ||
      !address ||
      !phone_number ||
      !email ||
      !gender ||
      !salary
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Please enter all required fields",
      });
    }
    // confirm there are no email duplicates
    const alreadyExistingDoctor = await Doctor.findOne({
      email,
    });
    // if there are duplicates
    if (alreadyExistingDoctor) {
      return res.status(400).json({
        status: "failed",
        message: `Doctor email: ${alreadyExistingDoctor.email} already exists`,
      });
    }
    const newDoctor = await Doctor.create({
      doctorName,
      level,
      age,
      unit,
      address,
      phone_number,
      email,
      gender,
      salary,
    });
    res.status(201).json({
      status: "success",
      message: "Doctor created successfully",
      data: newDoctor,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const updateDoctor = async (req, res) => {
  const { id } = req.params;
  const {
    doctorName,
    level,
    age,
    unit,
    address,
    phone_number,
    email,
    gender,
    salary,
  } = req.body;

  try {
    if (!id) {
      return res.status(404).json({
        status: "failed",
        message: "Id is reqiured",
      });
    }

    const validId = await Doctor.findById(id);

    if (!validId) {
      return res.status(404).json({
        status: "failed",
        message: "Doctor not found",
      });
    }

    if (
      !doctorName ||
      !level ||
      !age ||
      !unit ||
      !address ||
      !phone_number ||
      !email ||
      !gender ||
      salary
    ) {
      return res.status(400).json({
        status: "Failed",
        message: "Please enter all required fields",
      });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      {
        doctorName,
        level,
        age,
        unit,
        address,
        phone_number,
        email,
        gender,
        salary,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Doctor updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const getDoctorById = async (req, res) => {
  const { id } = req.params;
  try {
    // check if ID is passed from clientSide
    if (!id) {
      return res.status(400).json({
        status: "Failed",
        message: "Id is required",
      });
    }
    // check if id is valid
    const validDoctor = await Doctor.findById(id);
    if (!validDoctor) {
      return res.status(400).json({
        status: "Failed",
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Doctor info retrieved successfully",
      data: validDoctor,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (!doctors.length) {
      return res.status(200).json({
        status: "Success",
        message: "No doctor created yet",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Doctors list retrieved",
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }

  // todo: pagination
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    //check for ID
    if (!id) {
      return res.status(400).json({
        staus: "failed",
        message: "Id is required...",
      });
    }
    //check if Id is valid
    const validId = await Doctor.findById(id);
    if (!validId) {
      return res.status(404).json({
        status: "Failed",
        message: "Doctor not found",
      });
    }
    validId.deleteOne();
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};
