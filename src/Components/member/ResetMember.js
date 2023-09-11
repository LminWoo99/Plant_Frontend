import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [memberExists, setMemberExists] = useState(false);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setMemberExists(false);
    setErrorMessage("");
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFindUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/findPassword?userId=${userId}`);
      const memberDto = response.data;

      if (!memberDto) {
        setErrorMessage("존재하지 않는 아이디입니다.");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage("");
        setMemberExists(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/findPassword?userId=${userId}`);
      const memberDto = response.data;
  
      if (newPassword !== confirmPassword) {
        setSuccessMessage("");
        setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      } else {
        memberDto.password = newPassword;
  
        await axios.post("http://localhost:8080/api/findPassword", memberDto);
  
        setSuccessMessage("비밀번호가 재설정되었습니다.");
        setErrorMessage("");
  
        // 비밀번호 재설정 완료 후 '/'로 이동
        navigate("/");
  
        // 비밀번호 재설정 완료 후 alert 메시지 표시
        alert("비밀번호가 재설정되었습니다.");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("비밀번호 재설정에 실패했습니다.");
    }
  };
  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>비밀번호 재설정</h2>
      <div>
        {!memberExists && (
          <div>
            <input
              type="text"
              placeholder="아이디 입력"
              value={userId}
              onChange={handleUserIdChange}
              style={{ width: "300px", marginBottom: "10px" }}
            />
            <button onClick={handleFindUser}>사용자 조회하기</button>
          </div>
        )}
        {errorMessage && <p>{errorMessage}</p>}
        {memberExists && (
          <div>
            <input
              type="password"
              placeholder="새로운 비밀번호 입력"
              value={newPassword}
              onChange={handleNewPasswordChange}
              style={{ width: "300px", marginBottom: "10px" }}
            />
            <input
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{ width: "300px", marginBottom: "10px" }}
            />
            <button onClick={handleResetPassword}>비밀번호 재설정</button>
          </div>
        )}
        {successMessage && <p>{successMessage}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
