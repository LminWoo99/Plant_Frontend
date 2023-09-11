import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/MyTradeInfo.css"

function MyTradeInfo() {
  const [tradeList, setTradeList] = useState([]);
  const [activeTab, setActiveTab] = useState("판매중");
  const memberId = localStorage.getItem("id");

  useEffect(() => {
    if (memberId) {
      fetchTradeList(memberId);
    } else {
      alert("판매중인 내역이 없습니다.");
    }
  }, [memberId]);

  const fetchTradeList = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/tradeInfo/${id}`);
      setTradeList(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching trade list:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredTradeList = tradeList.filter(trade => {
    if (activeTab === "판매중") {
      return trade.status === "판매중";
    } else if (activeTab === "거래완료") {
      return trade.status === "거래완료";
    }
    return false;
  });

  return (
    <div className="my-trade-info">
      <h2>나의 판매 내역</h2>
      <div className="tabs">
        <button className={`tab ${activeTab === "판매중" ? "active" : ""}`} onClick={() => handleTabChange("판매중")}>판매중</button>
        <button className={`tab ${activeTab === "거래완료" ? "active" : ""}`} onClick={() => handleTabChange("거래완료")}>거래완료</button>
      </div>
      <div className="trade-list">
        {filteredTradeList.map((trade) => (
          <div key={trade.id} className="trade-card">
            <div className="title">
              <Link to={`/bbsdetail/${trade.id}`} className="bbs-title">
                {trade.title}
              </Link>
            </div>
            <div className="status">
              상태: {trade.status}
            </div>
            <div className="created-at">
              작성일: {trade.createdAt}
            </div>
          </div>
        ))}
        {filteredTradeList.length === 0 && <p>해당 상태의 게시글이 없습니다.</p>}
      </div>
    </div>
  );
}

export default MyTradeInfo;
