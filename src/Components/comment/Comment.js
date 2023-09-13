import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import CommentWrite from "./CommentWrite";
import "../../css/comment.css"
function Comment(props) {
	const { auth, setAuth } = useContext(AuthContext);
	const { headers, setHeaders } = useContext(HttpHeadersContext);
	const comment = props.obj;
	const [showReplyForm, setShowReplyForm] = useState(false);
	const tradeId=props.tradeBoardId;
	console.log(tradeId);
	const navigate = useNavigate();
	const tradeBoardId = comment.tradeBoardId;
	const [show, setShow] = useState(false);
	const [content, setContent] = useState(comment.content);

	const username=localStorage.getItem("username");
	
	const currentUserId = localStorage.getItem("id");

	const changeContent = (event) => {
	  setContent(event.target.value);
	};
	const isSecretComment = comment.secret === 'yes';

	const toggleReplyForm = () => {
	  setShowReplyForm(!showReplyForm);
	};
  
	const updateComment = async () => {
	  const req = {
		content: content,
		id: comment.id,
		tradeBoardId: tradeBoardId,
		memberId: comment.memberId
	  };
  console.log(req);
	  await axios
		.put(`/api/comment/${comment.id}`, req, { headers: headers })
		.then((resp) => {
		  console.log("[Comment.js] updateComment() success :D");
		  console.log(resp);
  
		  alert("댓글을 성공적으로 수정했습니다 !");
		  navigate(0);
		})
		.catch((err) => {
		  console.log("[Comment.js] updateComment() error :<");
		  console.log(err);
  
		  alert(err);
		});
  
	  updateToggle();
	};
  
	const deleteComment = async () => {
	  await axios
		.delete(`/api/comment/${comment.id}`)
		.then((resp) => {
		  console.log("[BbsComment.js] deleteComment() success :D");
		  console.log(resp.data);
  
		  
			alert("답글을 성공적으로 삭제했습니다 :D");
			navigate(0);
		  
		})
		.catch((err) => {
		  console.log("[BbsComment.js] deleteComment() error :<");
		  console.log(err);
		});
	};
  
	const data = {
	  id: comment.id,
	  tradeBoardId: tradeBoardId,
	  memberId: comment.memberId,
	  parentId: comment.id
	};
  
	function updateToggle() {
	  setShow((show) => !show);
	}

  
	return (
	  <div className="comment-container">
		{/* 상단 영역 (프로필 이미지, 댓글 작성자, 댓글 작성시간) */}
		<div className="my-1 d-flex justify-content-center">
		  <div className="col-1">
			<img
			  src="/images/profile-placeholder.png"
			  alt="프로필 이미지"
			  className="profile-img"
			/>
		  </div>
		  <div className="col-5">
			<div className="row">
			  <span className="comment-id">{comment.nickname}</span>
			</div>
			<div className="row">
			  <span>{comment.createdAt}</span>
			</div>
		  </div>
		
		  <div className="col-4 d-flex justify-content-end">
			{localStorage.getItem("id") == comment.memberId ? (
			  <>
				<button className="btn btn-outline-secondary" onClick={updateToggle}>
				  <i className="fas fa-edit"></i> 수정
				</button>{" "}
				&nbsp;
				<button className="btn btn-outline-danger" onClick={deleteComment}>
				  <i className="fas fa-trash-alt"></i> 삭제
				</button>
			  </>
			) : null}
  
			{/* 대댓글 작성 토글 버튼 */}
			{!showReplyForm && localStorage.getItem("id")!="undefined" && (
			  <button
				className="btn btn-outline-secondary btn-sm"
				onClick={toggleReplyForm}
			  >
				<i className="fas fa-reply"></i> 대댓글 작성
			  </button>
			)}
		  </div>
		</div>
  
		{/* 대댓글 작성 폼 */}
		{showReplyForm && (
		  <div className="reply-form">
			<CommentWrite data={data} />
		  </div>
		)}
  
		{/* 댓글 수정 또는 내용 */}
		{show ? (
		  <>
			{/* 댓글 수정 */}
			<div className="my-3 d-flex justify-content-center">
			  <textarea
				className="col-10"
				rows="5"
				value={content}
				onChange={changeContent}
			  ></textarea>
			</div>
			<div className="my-1 d-flex justify-content-center">
			  <button className="btn btn-dark" onClick={updateComment}>
				<i className="fas fa-edit"></i> 수정 완료
			  </button>
			</div>
		  </>
		) : (
		  <>
			{/* 댓글 내용 */}
			<div className="my-3 d-flex justify-content-center">
			<div className="col-10 comment">
			{((comment.memberId == currentUserId) || (tradeId == username) ) ? content : (isSecretComment ? "비밀 댓글입니다" : content)}
			</div>
			</div>
		  </>
		)}
  
		{/* 대댓글 목록 */}
		{comment.children.length > 0 &&
		  comment.children.map(function (childComment, childIdx) {
			return (
			  <div className="reply-container" key={childIdx}>
				<Comment obj={childComment}   key={childIdx} />
			  </div>
			);
		  })}
	  </div>
	);
  }
  
  export default Comment;