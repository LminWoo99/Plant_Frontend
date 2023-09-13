import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "react-js-pagination";

import Comment from "./Comment.js"

function CommentList(props) {

	const tradeBoardId = props.id;
	console.log(tradeBoardId);
	// Paging
	const [pageable, setPageable] = useState(1);
	const [totalCnt, setTotalCnt] = useState(0);

	const [commentList, setCommentList] = useState([]);

	const changepageable = (pageable) => {
		setPageable(pageable);
		getCommentList(pageable);
	}

	const getCommentList = async (pageable) => {
		await axios.get(`/api/comment`, { params: { "tradeBoardId": tradeBoardId, "pageable": pageable-1 } })
			.then((resp) => {
				console.log("[BbsComment.js] getCommentList() success :D");
				console.log(resp.data);
				setCommentList(resp.data.content);
				setTotalCnt(resp.data.totalElements);

			}).catch((err) => {
				console.log("[BbsComment.js] getCommentList() error :<");
				console.log(err);

			});
	}

	useEffect(() => {
		getCommentList(1);
	}, []);

	return (
		<>

			<div className="my-1 d-flex justify-content-center">
				<h5><i className="fas fa-paperclip"></i> 댓글 목록 </h5>
			</div>

			<Pagination
				activepageable={pageable}
				itemsCountPerpageable={5}
				totalItemsCount={totalCnt}
				pageableRangeDisplayed={5}
				prevpageableText={"‹"}
				nextpageableText={"›"}
				onChange={changepageable} />
			{
				// 댓글 및 대댓글 순회
				commentList.map(function (comment, idx) {
					return (
					  <div className="my-5" key={idx}>
						{/* 댓글 컴포넌트 표시 */}
						{/* <Comment obj={comment} key={idx} /> */}
						{/* 대댓글이 존재하는 경우에 대댓글 컴포넌트 표시 */}
						{comment.children && comment.children.length > 0 && (
						  <div className="ml-4">
							{comment.children.map(function (childComment, childIdx) {
							  return (
								<div className="my-3" key={childIdx}>
								  {/* 대댓글 컴포넌트 표시 */}
								  <Comment obj={childComment} key={childIdx} />
								</div>
							  );
							})}
						  </div>
						)}
					  </div>
					);
				  })
				  
			}

		</>

	);
}


export default CommentList;