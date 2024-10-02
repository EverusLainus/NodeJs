import { useState } from "react";
import axios from "axios";

export const OtpVerify = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/verifyotp", { email, otp });
      localStorage.setItem("token", res.data.token);
      setMessage("otp verified");
    } catch (err) {
      setMessage("Invalid otp", err);
    }
  };
  return (
    <div>
      <h1>Verify otp</h1>
      <form onSubmit={handleOtpVerification}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
