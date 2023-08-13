import Patient from "../../models/PatientModel.js";

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
