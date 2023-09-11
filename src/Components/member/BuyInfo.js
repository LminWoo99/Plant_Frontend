import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/BuyInfo.css"; 

function BuyInfo() {
  const [buyInfo, setBuyInfo] = useState([]);
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (id) {
      fetchBuyInfo(id);
    } else {
      alert("구매 내역이 없습니다.");
    }
  }, [id]);

  const fetchBuyInfo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/buyInfo/${id}`);
      setBuyInfo(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching buy info:", error);
    }
  };

  return (
    <div className="buyinfo-container">
      <h2>구매 내역</h2>
      <div className="buyinfo-list">
        {buyInfo.map((item) => (
          <div key={item.id} className="buyinfo-item">
            <Link to={`/bbsdetail/${item.id}`} className="bbs-title">
              <div className="item-title">{item.title}</div>
              <div className="item-status">{item.status}</div>
              <div className="item-status">{item.createBy}</div>
              <div className="item-date">{item.createdAt}</div>
            </Link>
          </div>
        ))}
        {buyInfo.length === 0 && <p>구매 내역이 없습니다.</p>}
      </div>
    </div>
  );

}

export default BuyInfo;
