import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

function BuyerSelection() {
  const [selectedBuyer, setSelectedBuyer] = useState('');
  const [comments, setComments] = useState([]);
  const { id } = useParams(); 
  let navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    
    axios.get(`/api/buyer/${id}`) 
      .then((response) => {
        
        const commentNicknames = response.data.map((comment) => comment.nickname);
        setComments(commentNicknames);
        console.log(commentNicknames);
      })
      .catch((error) => {
        console.error('댓글 데이터를 가져오는 중 오류 발생: ', error);
      });
  }, []);

  const handleBuyerChange = (event) => {
    setSelectedBuyer(event.target.value);
  };

  const setBuyer = async () => {
    const tradeBoardDto = {
      buyer: selectedBuyer,
    };
    console.log(tradeBoardDto);
    await axios
      .post(`/api/buyer/${id}`, tradeBoardDto)
      .then((response) => {
        console.log('구매자 정보 설정 완료: ', response.data);
        console.log(tradeBoardDto.buyer);
        navigate(`/bbsdetail/${id}`);
      })
      .catch((error) => {
        console.error('구매자 정보 설정 중 오류 발생: ', error);
      });
  };

  return (
    <div>
      <select value={selectedBuyer} onChange={handleBuyerChange}>
        <option value="">구매자 선택</option>
        {comments.map((comment, index) => (
          <option key={index} value={comment}>
            {comment}
          </option>
        ))}
      </select>
      <button onClick={setBuyer}>구매자 선택</button>

    </div>
  );
}

export default BuyerSelection;
