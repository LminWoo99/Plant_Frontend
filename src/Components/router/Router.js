import { Routes, Route } from "react-router-dom";

import Home from "../app/Home"
import BbsList from "../bbs/BbsList"
import BbsWrite from "../bbs/BbsWrite"
import BbsDetail from "../bbs/BbsDetail"
import BbsUpdate from "../bbs/BbsUpdate"

import Join from "../member/Join"
import Login from "../member/Login"
import Logout from "../member/Logout"
import LoginHandler from '../kakao/LoginHandler';
import MyTradeInfo from "../member/MyTradeInfo";
import WishList from "../member/WishList";
import PlantList from "../plantInfo/PlantList";
import PlantDetail from "../plantInfo/PlantDetail";
import BuyerSelection from "../bbs/BuyerSelection";
import FindId from "../member/FindId";
import ResetPassword from "../member/ResetMember";
import BuyInfo from "../member/BuyInfo";
import BbsVer from "../bbs/BbsVer";


function Router() {

	return (
			<Routes>
				<Route path="/api" element={<BbsVer />}></Route>
				<Route path="/" element={<Home />}></Route>
				<Route path="/oauth2/login/kakao" element={<LoginHandler />}></Route>
				<Route path="/findId" element={<FindId />}></Route>
				<Route path="/resetmember" element={<ResetPassword />}></Route>
				<Route path="/bbslist" element={<BbsList />}></Route>

				
				<Route path="/bbswrite" element={<BbsWrite />}></Route>
				<Route path="/bbsdetail/:id" element={<BbsDetail />}></Route>
				
				<Route path="/plantlist" element={<PlantList />}></Route>
				<Route path="/plantdetail/:id" element={<PlantDetail />}></Route>
				<Route path="/bbsupdate" element={<BbsUpdate />}></Route>
				<Route path="/bbsbuyer/:id" element={<BuyerSelection />}></Route>

				<Route path="/sales" element={<MyTradeInfo />}> </Route>
				<Route path="/wishlist" element={<WishList />}> </Route>
				<Route path="/buyInfo" element={<BuyInfo />}> </Route>

				<Route path="/login" element={<Login />}></Route>
				<Route path="/join" element={<Join />}></Route>
				<Route path="/logout" element={<Logout />}></Route>
			</Routes>
	);
}

export default Router;