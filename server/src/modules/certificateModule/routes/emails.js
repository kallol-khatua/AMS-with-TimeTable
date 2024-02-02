const express = require("express");
const router = express.Router();
const addEvent = require("../../../models/certificateModule/addevent");

const { sendEmailsToParticipants } = require("../controllers/emails");
const { sendEmail } = require("../controllers/participantemail");
const ecmadminRoute = require("../../usermanagement/ecmadminroute");
const { verifyOTP } = require("../controllers/sendotp");
const { sendOTP } = require("../controllers/sendotp");

const User = require("../../../models/usermanagement/user");

router.post("/send-emails", async (req, res) => {
  console.log("ho");
  const eventId = req.body.eventId;
  const referer = req.get("Referer");
  // Extract the host from the Referer URL
  //const baseURL = new URL(referer).origin;
  const baseURL = "xyz";
  console.log(eventId);
  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Event ID is required in the request body",
    });
  }

  const event = await addEvent.findOne({ name: eventId });

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }
  console.log(event);
  // console.log(event.email);
  const user = await User.findOne({ username: event.email });
  console.log(user);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found for the given event",
    });
  }
  console.log(user);
  console.log(user.get("email"));

  try {
    // Send OTP to user's email

    const otpResponse = await sendOTP(user.get("email"));
    console.log("hi");
    console.log(otpResponse);
    if (!otpResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Failed to send OTP",
      });
    }
    console.log("hi2");

    // Redirect user to a new page for OTP verification
    // Assuming you have logic to handle this redirection in your frontend

    // Upon successful OTP verification, call sendEmailsToParticipants
    res.redirect(
      `/otp-verification?eventId=${eventId}&email=${user.email}&baseURL=${baseURL}`
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/send-email/:participantId", ecmadminRoute, async (req, res) => {
  try {
    const participantId = req.params.participantId;
    const referer = req.get("Referer");
    // Extract the host from the Referer URL
    const baseURL = new URL(referer).origin;
    console.log(baseURL);
    if (!participantId) {
      return res
        .status(400)
        .json({ error: "Participant ID is required in the request params." });
    }

    // Call the sendEmailToParticipant function with the participantId
    await sendEmail(participantId, baseURL);

    // Respond with a success message
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/otp-verification", async (req, res) => {
  const { otp } = req.body;
  console.log(otp);
  console.log("hi");
  const { eventId, email, baseURL } = req.query;

  if (!eventId || !email || !otp || !baseURL) {
    return res.status(400).json({
      success: false,
      message: "Event ID, email, and OTP are required",
    });
  }

  try {
    // Verify OTP
    const otpVerificationResult = await verifyOTP(email, otp);

    if (!otpVerificationResult) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP verification successful, proceed to send emails to participants
    await sendEmailsToParticipants(eventId, baseURL);

    res.status(200).json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
