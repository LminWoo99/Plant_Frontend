import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/WishList.css"; // 리사이클러뷰 스타일링을 위한 CSS 파일

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const memberId = localStorage.getItem("id");

  useEffect(() => {
    if (memberId) {
      fetchWishlist(memberId);
    } else {
      alert("찜한 내역이 없습니다.");
    }
  }, [memberId]);

  const fetchWishlist = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/goods/${id}`);
      setWishlist(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  return (
    <div className="wishlist-container">
      <h2>내 찜 목록</h2>
      <div className="wishlist-list">
        {wishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <Link to={`/bbsdetail/${item.id}`} className="bbs-title">
              <div className="item-title">{item.title}</div>
              <div className="item-status">{item.status}</div>
              <div className="item-status">{item.createBy}</div>
              <div className="item-date">{item.createdAt}</div>
            </Link>
          </div>
        ))}
        {wishlist.length === 0 && <p>찜한 내역이 없습니다.</p>}
      </div>
    </div>
  );
}

export default WishList;
