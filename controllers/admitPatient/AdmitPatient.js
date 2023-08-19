import Patient from "../../models/PatientModel.js";

// admit patient
export const admitPatient = async (req, res) => {
  const { patientName, age, blood_group, phone_number, email, gender } =
    req.body;

  try {
    if (!patientName || !age || !phone_number || !email || !gender) {
      return res.status(400).json({
        status: "Failed",
        message:
          "Patient name, age, phone_number, email and gender are required",
      });
    }
    const newPatient = await Patient.create({
      patientName,
      age,
      blood_group,
      phone_number,
      email,
      gender,
    });
    res.status(200).json({
      status: "success",
      message: "Patient admitted successfully",
      data: newPatient,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// get all patients
export const getAllPatient = async (req, res) => {
  try {
    const allPatient = await Patient.find();
    res.status(200).json({
      status: "success",
      message: "All Patient",
      data: allPatient,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// get patient by ID
export const getPatient = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "Patient id is required",
      });
    }
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({
        status: "failed",
        message: "Patient not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Patient details retrieved successfully",
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// update Patient
export const editPatient = async (req, res) => {
  const { id } = req.params;
  const { patientName, age, blood_group, phone_number, email, gender } =
    req.body;

  try {
    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "Patient id is required",
      });
    }
    if (
      !patientName ||
      !age ||
      !blood_group ||
      !phone_number ||
      !email ||
      !gender
    ) {
      return res.status(400).json({
        status: "failed",
        message:
          "Patient name, age, phone_number, email and gender are required",
      });
    }
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      {
        patientName,
        age,
        blood_group,
        phone_number,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPatient) {
      return res.status(404).json({
        status: "failed",
        message: "Patient not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Patient updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

// delete patient
export const deletePatient = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        status: "failed",
        message: "Patient id is required",
      });
    }
    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({
        status: "failed",
        message: "Patient not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: `${deletedPatient.patientName} deleted successfully`, // Corrected this line
      data: deletedPatient,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
