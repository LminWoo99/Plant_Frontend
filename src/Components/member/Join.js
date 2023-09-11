import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Join() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckpassword] = useState("");

  const [email, setEmail] = useState("");

  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [requiredFieldsMissing, setRequiredFieldsMissing] = useState(false);

  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [nicknameAvailable, setNicknameAvailable] = useState(false);

  const [validEmail, setValidEmail] = useState(true);

  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState("");

  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const changeUsername = (event) => {
    setUsername(event.target.value);
    setUsernameAvailable(false); 
  };

  const changeNickname = (event) => {
    setNickname(event.target.value);
    setNicknameAvailable(false); 
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeCheckPassword = (event) => {
    setCheckpassword(event.target.value);
  };

  const changeEmail = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);


    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setValidEmail(emailPattern.test(emailValue));
  };

  const checkPasswordMatch = () => {
    setPasswordMismatch(password !== checkpassword);
  };
  const handleEmailConfirmationChange = (event) => {
    setEmailVerificationCode(event.target.value);
  };

  /* 아이디 중복 체크 */
  const checkUsernameDuplicate = async () => {
    await axios
      .get("http://localhost:8080/api/duplicate", { params: { username: username } })
      .then((resp) => {
        console.log("[Join.js] checkUsernameDuplicate() success :D");
        console.log(resp.data);

        if (resp.status === 200) {
          setUsernameAvailable(true);
        }
      })
      .catch((err) => {
        console.log("[Join.js] checkUsernameDuplicate() error :<");
        console.log(err);

        const resp = err.response;
        if (resp.status === 400) {
          alert("이미 사용중인 아이디입니다");
        }
      });
  };

  /* 닉네임 중복 체크 */
  const checkNicknameDuplicate = async () => {
    await axios
      .get("http://localhost:8080/api/duplicate/nickname", { params: { nickname: nickname } })
      .then((resp) => {
        console.log("[Join.js] checkNicknameDuplicate() success :D");
        console.log(resp.data);

        if (resp.status === 200) {
          setNicknameAvailable(true);
        }
      })
      .catch((err) => {
        console.log("[Join.js] checkNicknameDuplicate() error :<");
        console.log(err);

        const resp = err.response;
        if (resp.status === 400) {
          alert("이미 사용중인 닉네임입니다");
        }
      });
  };

  /* 회원가입 */
  const join = async () => {
    if (!username || !nickname || !password || !checkpassword || !email || !validEmail) {
      setRequiredFieldsMissing(true);
      return;
    }
    if (password !== checkpassword) {
      setPasswordMismatch(true);
      return; // 비밀번호 불일치 시 함수 종료
    }
    if (!usernameAvailable && !nicknameAvailable) {
      alert("아이디와 닉네임 중복 확인을 해주세요");
      return;
    } else if (!usernameAvailable) {
      alert("아이디 중복 확인을 해주세요");
      return;
    } else if (!nicknameAvailable) {
      alert("닉네임 중복 확인을 해주세요");
      return;
    }
    
    // 인증번호 확인 여부 검사
    if (!emailVerificationCode) {
      alert("이메일 본인인증이 필요합니다. 인증번호를 입력해주세요.");
      return;
    }
    
    // 인증번호 확인
    if (emailVerificationCode !== code) {
      alert("인증번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
    }
  
    const req = {
      username: username,
      nickname: nickname,
      password: password,
      checkpassword: checkpassword,
      email: email,
    };

    await axios
      .post("http://localhost:8080/api/user/save", req)
      .then((resp) => {
        console.log("[Join.js] join() success :D");
        console.log(resp.data);

        alert(resp.data.nickname + "님 회원가입을 축하드립니다 🎊");
        navigate("/login");
      })
      .catch((err) => {
        console.log("[Join.js] join() error :<");
        console.log(err);

        const resp = err.response;
        if (resp.status === 400) {
          alert(resp.data);
        }
      });
  };
  const handleEmailVerificationClick = () => {
    setShowEmailVerification(true);
    axios
      .post("http://localhost:8080/api/mailConfirm", { email: email } )
      .then((resp) => {
        alert("해당 이메일로 인증번호 발송이 완료되었습니다. 확인부탁드립니다.");
        setCode(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleEmailConfirmationCheck = () => {
    if (emailVerificationCode !== code) {
      console.error("인증번호가 일치하지 않습니다.");
      alert("인증번호가 일치하지 않습니다.")
    } else {
      console.log("인증번호 확인 완료");
      alert("인증번호 확인 완료");
    }
  };
  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th className="col-2">아이디</th>
            <td>
              <input type="text" value={username} onChange={changeUsername} size="50px" /> &nbsp; &nbsp;
              <button
                className={`btn ${usernameAvailable ? "btn-success" : "btn-outline-danger"}`}
                onClick={checkUsernameDuplicate}
              >
                {usernameAvailable ? "사용 가능" : "아이디 중복 확인"}
              </button>
            </td>
          </tr>

          <tr>
            <th>닉네임</th>
            <td>
              <input type="text" value={nickname} onChange={changeNickname} size="50px" />&nbsp; &nbsp; &nbsp;
              <button
                className={`btn ${nicknameAvailable ? "btn-success" : "btn-outline-danger"}`}
                onClick={checkNicknameDuplicate}
              >
                {nicknameAvailable ? "사용 가능" : "닉네임 중복 확인"}
              </button>
            </td>
          </tr>

          <tr>
            <th>비밀번호</th>
            <td>
              <input type="password" value={password} onChange={changePassword} size="50px" />
            </td>
          </tr>

          <tr>
            <th>비밀번호 확인</th>
            <td>
              <input type="password" value={checkpassword} onChange={changeCheckPassword} size="50px" />
            </td>
          </tr>

          <tr>
            <th>이메일</th>
            <td>
              <input type="text" value={email} onChange={changeEmail} size="100px" placeholder="aaaa@example.com" />
              {!validEmail && (
                <span className="text-danger">이메일 형식이 옳지 않습니다.</span>
              )}
               {/* 이메일 인증번호 입력 칸 */}
          {showEmailVerification && (
            <div>
              <input
                type="text"
                value={emailVerificationCode}
                onChange={handleEmailConfirmationChange}
                placeholder="인증번호 입력"
              />
              <button onClick={handleEmailConfirmationCheck}>인증 확인</button>
            </div>
          )}
          <button onClick={handleEmailVerificationClick}>
            이메일 본인인증 하기
          </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      {/* 비밀번호 불일치 시 경고 메시지 표시 */}
      {passwordMismatch && (
        <div className="my-2 d-flex justify-content-center">
          <span className="text-danger">비밀번호가 일치하지 않습니다.</span>
        </div>
      )}
      <div className="my-2 d-flex justify-content-center">
        {requiredFieldsMissing && (
          <span className="text-danger">모든 필수 정보를 입력해주세요.</span>
        )}
      </div>

      <div className="my-3 d-flex justify-content-center">
        <button className="btn btn-outline-secondary" onClick={join}><i className="fas fa-user-plus"></i> 회원가입</button>
      </div>
    </div>
  );
}

export default Join;