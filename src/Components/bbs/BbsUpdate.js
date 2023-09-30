import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { IdContext } from "../context/IdProvider";
import BuyerSelection from "./BuyerSelection";

function BbsUpdate() {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { tradeBoardDto } = location.state;

  
  const [status, setStatus] = useState(tradeBoardDto.status);

  const [id, setId] = useState(tradeBoardDto.id);
  const [title, setTitle] = useState(tradeBoardDto.title);
  const [content, setContent] = useState(tradeBoardDto.content);
  const [createBy, setCreateBy] = useState(tradeBoardDto.createBy);
  const [price, setPrice] = useState(tradeBoardDto.price);
console.log(status);
  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContent(event.target.value);
  };

  const changeStatus = (event) => {
    setStatus(event.target.value);
  };


  const changePrice = (event) => {
    setPrice(event.target.value);
  };
  const updateBbs = async () => {
    const req = {
      id: id,
      createBy: createBy,
      title: title,
      content: content,
      status: status, 
	    price: price
    };

    await axios
      .put(`/api/list/${tradeBoardDto.id}`, req, {
        headers: headers,
      })
      .then((resp) => {
        console.log("[BbsUpdate.js] updateBbs() success :D");
        console.log(resp.data);
        
      
        alert("게시글을 성공적으로 수정했습니다 :D");
        

        if (status === '거래완료') {
          navigate(`/bbsbuyer/${tradeBoardDto.id}`);
        }
        else{
          navigate(`/bbsdetail/${tradeBoardDto.id}`);
        }
      })
      .catch((err) => {
        console.log("[BbsUpdate.js] updateBbs() error :<");
        console.log(err);
      });
  };


  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th className="table-primary">작성자</th>
            <td>
              <input
                type="text"
                className="form-control"
                value={createBy}
                size="50px"
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th className="table-primary">제목</th>
            <td>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={changeTitle}
                size="50px"
              />
            </td>
          </tr>
          <tr>
            <th className="table-primary">내용</th>
            <td>
              <textarea
                className="form-control"
                value={content}
                onChange={changeContent}
                rows="10"
              ></textarea>
            </td>
          </tr>
          <tr>
            <th className="table-primary">거래 상태</th>
            <td>
              <select
                className="form-control"
                value={status}
                onChange={changeStatus}
              >
				<option value="판매중">판매중</option>
                <option value="거래완료">거래완료</option>
                
              </select>
            </td>
          </tr>
		  <tr>
            <th className="table-primary">제목</th>
            <td>
              <input
                type="text"
                className="form-control"
                value={price}
                onChange={changePrice}
                size="50px"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="my-3 d-flex justify-content-center">
        <button className="btn btn-dark" onClick={updateBbs}>
          <i className="fas fa-pen"></i> 수정하기
        </button>
      </div>
    </div>
  );
}

export default BbsUpdate;
