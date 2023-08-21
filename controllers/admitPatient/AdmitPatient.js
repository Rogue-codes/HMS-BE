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
    let query = Patient.find();
    if (!req.query.sort) {
      query = query.sort("-createdAt");
    }
    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    const patientCount = await Patient.countDocuments();
    const last_page = patientCount / limit;
    if (req.query.page) {
      if (skip >= patientCount) throw new Error("This page does not exist");
    }

    const allPatient = await query.select("-__v");
    res.status(200).json({
      status: "success",
      message: "All Patient",
      data: allPatient,
      meta: {
        per_page: limit,
        current_page: page,
        last_page: Math.ceil(last_page),
        total: patientCount,
      },
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

export const getPatientBySearch = async (req, res) => {
  const {title} = req.params;

  try {
    if (!title) {
      return res.status(400).json({
        status: "failed",
        message: "Empty search query",
      });
    }
    
    const searchResult = await Patient.find({ patientName: new RegExp(title, "i") }).select("-__v");

    if (searchResult.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Patient not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Search result retrieved...",
      data: searchResult,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Error processing request",
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
