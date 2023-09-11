import React, { useState } from "react";
import axios from "axios";

function FindId() {
  const [email, setEmail] = useState("");
  const [foundId, setFoundId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFindId = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/findId?email=${email}`);
      const { username } = response.data.username;
      console.log(response.data.username);
      setFoundId(response.data.username);
      console.log(foundId);
      setErrorMessage("");
    } catch (error) {
      setFoundId("");
      setErrorMessage("해당 이메일로 등록된 아이디를 찾을 수 없습니다.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2>아이디 찾기</h2>
      <div>
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmailChange}
          style={{ width: "300px", marginBottom: "10px" }}
        />
        <button onClick={handleFindId}>아이디 찾기</button>
      </div>
      {foundId && <p>찾은 아이디: {foundId}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default FindId;
