import React, { useState } from "react";
import axios from "axios";

function EmailVerification() {
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailVerified(false);
  };

  const handleEmailConfirmChange = (e) => {
    setEmailConfirm(e.target.value);
  };

  const sendEmailVerification = async () => {
    try {
      const response = await axios.post("/api/mailConfirm", {
        email: email,
      });
      const code = response.data;
      setVerificationCode(code);
      setEmailSent(true);
    } catch (error) {
      setErrorMessage("이메일 인증번호를 요청하는 동안 오류가 발생했습니다.");
    }
  };

  const checkEmailConfirmation = () => {
    if (emailConfirm !== verificationCode) {
      setEmailVerified(false);
    } else {
      setEmailVerified(true);
    }
  };

  return (
    <div>
      <div className="form-group last mb-4 email_input">
        <label htmlFor="memail" id="mailTxt">
          이메일을 입력해주세요
        </label>
        <input
          type="text"
          className="form-control"
          name="memail"
          id="memail"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={sendEmailVerification}
      >
        인증번호
      </button>
      {emailSent && (
        <div className="form-group last mb-4 check_input">
          <label htmlFor="memailconfirm" id="memailconfirmTxt">
            인증번호를 입력해주세요
          </label>
          <input
            type="text"
            className="form-control"
            id="memailconfirm"
            value={emailConfirm}
            onChange={handleEmailConfirmChange}
            onBlur={checkEmailConfirmation}
          />
          {!emailVerified && (
            <span
              id="emconfirmchk"
              style={{ color: "#FA3E3E", fontWeight: "bold", fontSize: "10px" }}
            >
              인증번호가 잘못되었습니다
            </span>
          )}
          {emailVerified && (
            <span
              id="emconfirmchk"
              style={{ color: "#0D6EFD", fontWeight: "bold", fontSize: "10px" }}
            >
              인증번호 확인 완료
            </span>
          )}
        </div>
      )}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default EmailVerification;
