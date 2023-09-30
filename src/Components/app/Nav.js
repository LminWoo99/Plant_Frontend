import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import MyTradeInfo from "../member/MyTradeInfo"; 
import "../../css/nav.css";

function Nav() {
  const { auth, setAuth } = useContext(AuthContext);
  const [showMyFamily, setShowMyFamily] = useState(false);

 
  const toggleMyFamily = () => {
    setShowMyFamily(prevShowMyFamily => !prevShowMyFamily); 
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark sticky-top" style={{ backgroundColor: "#04B486", color: "" }}>
      <div className="container">

        <div className="navbar-collapse collapse justify-content-between" id="navbar-content">

          <ul className="navbar-nav mr-auto">
            {/* 메인 화면 */}
            <li className="nav-item">
              <Link className="nav-link" style={{ color: "#2F4F4F" }} to="/"><i className="fas fa-home" style={{ color: "#2F4F4F" }}></i> Home</Link>
            </li>

            {/* 게시판 */}
            <li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" id="navbarDropdown"
                role="button" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false" style={{ color: "#2F4F4F" }}>식구 거래</div>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ color: "#2F4F4F" }}>
                <Link className="dropdown-item" to="/bbslist">글목록</Link>
                <Link className="dropdown-item" to="/bbswrite">글추가</Link>
                
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{ color: "#2F4F4F" }} to="/plantlist">🍀식구도감🍀</Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            {/* 회원 정보 */}
            {auth &&
              <li className="nav-item" style={{ color: "#2F4F4F" }}>
                <span className="nav-link"> {auth} 님 반갑습니다 <i className="fab fa-ello"></i> &nbsp; </span>
              </li>
            }

            {/* 나의 식구 토글 */}
			<li className="nav-item dropdown">
              <div className="nav-link dropdown-toggle" id="navbarDropdown"
                role="button" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false" style={{ color: "#2F4F4F" }}>나의 식구</div>

              <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ color: "#2F4F4F" }}>
                <Link className="dropdown-item" to="/sales">판매 내역</Link>
                <Link className="dropdown-item" to="/wishlist">찜 내역</Link>
                <Link className="dropdown-item" to="/buyInfo">구매 내역</Link>
              </div>
            </li>

            {auth ? (
              // 로그아웃
              <li className="nav-item">
                <Link className="nav-link" style={{ color: "#2F4F4F" }} to="/logout"><i className="fas fa-sign-out-alt" style={{ color: "#2F4F4F" }}></i> 로그아웃</Link>
              </li>
            ) : (
              // 로그인 및 회원가입
              <>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: "#2F4F4F" }} to="/login">로그인</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={{ color: "#2F4F4F" }} to="/join">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
