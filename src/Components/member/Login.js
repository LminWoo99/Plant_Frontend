/* 로그인 컴포넌트 */

import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import myImage from './kakao_login_small.png';
import { Link } from "react-router-dom";
import '../../css/style.css';
const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?
client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
function Login() {

	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);

	const navigate = useNavigate();

	const [username, setusername] = useState("");
	const [password, setPassword] = useState("");
	
	const changeId = (event) => {
		setusername(event.target.value);
	}

	const changePwd = (event) => {
		setPassword(event.target.value);
	}
	const kakaoLogin = () => {
		navigate("/kakao");
	}
	const login = async () => {

		const req = {
			username: username,
			password: password
		}

		await axios.post("/api/login", req)
		.then((resp) => {
			console.log("[Login.js] login() success :D");
			console.log(resp.data);

				alert(resp.data.username + "님, 성공적으로 로그인 되었습니다 🔐");

				// JWT 토큰 저장
				localStorage.setItem("id", parseInt(resp.data.id));
				localStorage.setItem("bbs_access_token", resp.data.access_token);
				localStorage.setItem("username", resp.data.nickname);
				
				
				setAuth(resp.data.id); // 사용자 인증 정보(아이디 저장)
				setHeaders({"Authorization": `Bearer ${resp.data.jwt}`}); // 헤더 Authorization 필드 저장
				
				navigate("/bbslist");
				window.location.reload()

		}).catch((err) => {
			console.log("[Login.js] login() error :<");
			console.log(err);

			alert("⚠️ " + err.response.data);
		});
	}

	return (
		<div>
			<table className="table">
				<tbody>
					<tr>
						<th className="col-3">아이디</th>
						<td>
							<input type="text" value={username} onChange={changeId} size="50px" />
						</td>
					</tr>

					<tr>
						<th>비밀번호</th>
						<td>
							<input type="password" value={password} onChange={changePwd} size="50px" />
						</td>
					</tr>
				</tbody>
			</table><br />

			<div className="my-1 d-flex justify-content-center">
				<button className="btn btn-outline-secondary" onClick={login}><i className="fas fa-sign-in-alt"></i> 로그인</button>
				</div>
				<div className="text-center">
    			    <Link to="/findId">아이디 찾기</Link>
        			&nbsp;|&nbsp;
        			<Link to="/resetMember">비밀번호 찾기</Link>
      			</div>
    
				<div className="container text-center">
				<p style={{fontWeight: 'bold', fontSize: '2em'}}>소셜 로그인으로 시작하기!</p>
				</div>
				<div className="my-1 d-flex justify-content-center">
				<a href={KAKAO_AUTH_URL} className="kakaobtn">
				
				<img src={myImage} />
				
				</a>
				</div>
			</div>

		
	);
}

export default Login;