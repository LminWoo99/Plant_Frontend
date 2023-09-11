import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import axios from "axios";

function CommentWrite(props) {
  const { headers, setHeaders } = useContext(HttpHeadersContext);
  const showReplyForm = props.data.parentId !== undefined;
  const username = localStorage.getItem("username");
  
  const id = props.data.id;
  const [isSecret, setIsSecret] = useState(false);

  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const memberId=localStorage.getItem("id");

  const changeContent = (event) => {
    setContent(event.target.value);
  };
  const toggleSecret = () => {
    setIsSecret(!isSecret);
  };
  const createComment = async () => {
    const requestDto = {
      username: username,
      memberId: memberId,
      content: content,
      tradeBoardId: props.data.tradeBoardId,
      parentId: props.data.parentId,
      secret: isSecret ? 'yes' : 'no',
    };
	console.log(requestDto);
    await axios
      .post(`http://localhost:8080/api/comment`, requestDto, { headers: headers })
      .then((resp) => {
        console.log("[CommentWrite.js] createComment() success :D");
        console.log(resp.data);

        if (resp.data.id != null) {
          alert("댓글을 성공적으로 등록했습니다 :D");
		  
          navigate(0);
        }
      })
      .catch((err) => {
        console.log("[CommentWrite.js] createComment() error :<");
        console.log(err);
        console.log(requestDto.parentId);
      });
  };

  useEffect(() => {
    console.log(props.data.parentId); // This will log only once when the component mounts
  }, []);

  return (
    <>
      {/* 상단 영역 (프로필 이미지, 댓글 작성자) */}
      <div className="my-1 d-flex justify-content-center">
        <div className="col-1">
          <img
            src="/images/profile-placeholder.png"
            alt="프로필 이미지"
            className="profile-img"
          />
        </div>

        <div className="col-7">
          <span className="comment-id">{username}</span>
        </div>
        <div className="col-2 my-1 d-flex justify-content-end">
        <label style={{ marginTop: 8, marginRight:3  }}>비밀댓글</label>
        <input
            style={{ marginRight: 5  }}
            type="checkbox"
            checked={isSecret}
            onChange={() => setIsSecret(!isSecret)}
          />
          
          <button className="btn btn-outline-secondary" onClick={createComment}>
            <i className="fas fa-comment-dots" ></i> 추가
          </button>
        </div>
      </div>
      {/* 하단 영역 (댓글 내용) */}
      <div className="my-3 d-flex justify-content-center">
        <textarea
          className="col-10"
          rows="5"
          value={content}
          onChange={changeContent}
        ></textarea>
      </div>

      <br />
      <br />
      
      
    </>
  );
}

export default CommentWrite;
