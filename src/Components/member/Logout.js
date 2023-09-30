import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import { Cookies } from 'react-cookie';


function Logout() {

	const { auth, setAuth } = useContext(AuthContext);

	const navigate = useNavigate();
	const cookies = new Cookies();
	const logout = () => {
		localStorage.removeItem("username");
		localStorage.removeItem("bbs_access_token");
		localStorage.removeItem("id");
		
		cookies.remove("bbs_refresh_token");
		
		alert(auth + "님, 성공적으로 로그아웃 됐습니다 🔒");
		setAuth(null);
		
		navigate("/");
	};

	useEffect(() => {
		logout();
	}, []);

}

export default Logout;