import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CommentWrite from "../comment/CommentWrite";
import CommentList from "../comment/CommentList";
import { AuthContext } from "../context/AuthProvider";
import Comment from "../comment/Comment";
import "../../css/BbsDetail.css";
import ImageGalleryComponent from "./ImageGalleryComponent";

function BbsDetail() {
	
	const { auth, setAuth } = useContext(AuthContext)

	const [tradeBoardDto, setTradeBoardDto] = useState({});
	const { id } = useParams(); 
	const [tradeId, setTradeId]=useState(0);

	const [view, setView] = useState(0);
	const [replyList, setReplyList] = useState([]); 

	const [memberId, setMemberId] = useState(0);
	const [price, setPrice] = useState();
	const [goodStatus, setGoodStatus] = useState(false);
	const navigate = useNavigate();

	const [imageUrls, setImageUrls] = useState([]);
	const [showImage, setShowImage] = useState(false);

	const [status, setStatus] = useState("");

	
	function formatDate(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${year}/${month}/${day} ${hours}시 ${minutes}분`;
	}

    const getImageUrls = async () => {
        await axios.get(`/api/${id}/images`)
            .then((resp) => {
                console.log("[image.js] getImageUrls() success :D");
                console.log(resp);
				const imageUrls = resp.data.map(item => item.url); 

				console.log(imageUrls);
				setImageUrls(imageUrls)
            })
            .catch((err) => {
                console.log("[BbsDetail.js] getImageUrls() error :<");
                console.log(err);
            });
    };

	const getBbsDetail = async () => {

		await axios.get(`/api/list/${id}`)
		.then((resp) => {
			console.log("[BbsDetail.js] getBbsDetail() success :D");
			console.log(resp.data)

			setTradeBoardDto(resp.data);
			setTradeId(resp.data.id);
			setView(resp.data.view); // 조회수 값 업데이트
			setMemberId(resp.data.memberId);
			setStatus(resp.data.status);
			setPrice(resp.data.price);
			console.log(tradeId);
			console.log(memberId);
		})
		.catch((err) => {
			console.log("[BbsDetail.js] getBbsDetail() error :<");
			console.log(tradeBoardDto.id);
			console.log(err);
		});

	}
	const getBbsView = async () => {
		await axios
		  .get(`/api/read/${id}`)
		  .then((resp) => {
			console.log("[BbsDetail.js] getBbsView() success :D");
			setView(resp.data); // view 값 업데이트
		  })
		  .catch((err) => {
			console.log("[BbsDetail.js] getBbsView() error :<");
			console.log(err);
		  });
	  };

	const deleteBbs = async () => {

		await axios.delete(`/api/list/${id}`)
		.then((resp) => {
			console.log("[BbsDetail.js] deleteBbs() success :D");
			console.log(resp.data);

				alert("게시글을 성공적으로 삭제했습니다 :D");
				navigate("/bbslist");
			

		}).catch((err) => {
			console.log("[BbsDetail.js] deleteBbs() error :<");
			console.log(err);
		});

	}
	const handleLikeClick = async () => {
		try {
			if (!auth) {
				// 로그인하지 않았을 경우 로그인 페이지로 이동
				navigate("/login");
				return;
			}
	
			const goodsRequestDto = {
				memberId: localStorage.getItem("id"),
				tradeBoardId: tradeId,
			};
	
			if (!goodStatus) {
				const response = await axios.post(
					`/api/goods/${memberId}`,
					goodsRequestDto
				);
	
				// 찜 목록에 추가되었을 때 상태 업데이트
				setGoodStatus(true);
				alert("찜 목록에 추가되었어요!");
				window.location.reload();
				console.log(response.data);
			}
			else{
				const response = await axios.post(
					`/api/goods/${memberId}`,
					goodsRequestDto
				);
			// 찜 취소되었을 때 상태 업데이트
			setGoodStatus(false);
			alert("찜 취소하셨습니다!");
			window.location.reload();
			}
		} catch (error) {
			console.error("Error adding to wishlist:", error);
		}
	};
    const getReplyList = async () => {
        await axios.get(`/api/comment/reply` , { params: { "tradeBoardId": id}} )
            .then((resp) => {
                console.log("[BbsDetail.js] getReplyList() success :D");
                console.log(resp.data);

                setReplyList(resp.data); // 대댓글 목록 설정

            })
            .catch((err) => {
                console.log("[BbsDetail.js] getReplyList() error :<");
                console.log(err);
            });
    };
	const getGoodsStatus = async () => {
		try {
			const response = await axios.get(`/api/goods/status`, {
				params: { "memberId": localStorage.getItem("id"), "tradeBoardId": id },
			});

			if (response.data !== null) {
				console.log(response.data);
				setGoodStatus(true);
			} else {
				// response.data가 false일 경우, 찜 상태를 false로 설정
				setGoodStatus(false);
			}
		} catch (error) {
			console.error("Error getting trade status:", error);
		}
	};

	
	useEffect(() => {
		getBbsDetail();
		getGoodsStatus();
		getBbsView();
		getReplyList();
		getImageUrls();
		
		
	}, []);
	const updateBbs = {
		id: tradeBoardDto.id,
		createBy: tradeBoardDto.createBy,
		title: tradeBoardDto.title,
		content: tradeBoardDto.content,
		status: tradeBoardDto.status,
		price: tradeBoardDto.price
	}

	const parentBbs = {
		id: tradeBoardDto.id,
		title: tradeBoardDto.title
	}
	const data={
		tradeBoardId: tradeBoardDto.id,
		memberId: tradeBoardDto.memberId
	}

	return (
		<div>
		   {status === "거래완료" && (
        <div className="modal-container">
          <div className="modal-content">
            <p style={{ color: "red", fontSize: "24px" }}>거래 완료된 게시글 입니다</p>
            <div className="my-3">
              <Link className="btn btn-outline-secondary" to="/bbslist">
                <i className="fas fa-list"></i> 글목록
              </Link>
            </div>
          </div>
        </div>
      )}
			<div className="my-3 d-flex justify-content-end">
			<span className="ml-2"  style={{ padding: '0.5em' }}>{tradeBoardDto.goodCount}명이 찜했어요</span>
				<button className="btn btn-outline-info" onClick={handleLikeClick}>
							<i className={`fas ${goodStatus ? "fa-check" : "fa-star"}`}></i>{" "}
							{goodStatus ? "찜취소하기" : "찜하기"}
						</button>{" "}
			{
				/* 자신이 작성한 게시글인 경우에만 수정 삭제 가능 */
				(auth == tradeBoardDto.createBy) ?
					<>
					  {/* 찜 버튼 추가 */}
					 
						<Link className="btn btn-outline-secondary"  to="/bbsupdate" state={{ tradeBoardDto: updateBbs}}><i className="fas fa-edit"></i> 수정</Link> &nbsp;
						<button className="btn btn-outline-danger"  onClick={deleteBbs}><i className="fas fa-trash-alt"></i> 삭제</button>
					</>
				:
				null
			}

			</div>

			<table className="table table-striped">
				<tbody>
				<tr>
                        <th>이미지</th>
                        <td>
                            {/* 이미지 상세히 보기 버튼 */}
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => setShowImage(!showImage)}
                            >
                                {showImage ? "이미지 감추기" : "상품 이미지 상세히 보기"}
                            </button>
                            {showImage && <ImageGalleryComponent imageUrls={imageUrls} />}
                        </td>
                    </tr>
					<tr>
						<th className="col-3">작성자</th>
						<td>
							<span>{tradeBoardDto.createBy}</span>
						</td>
					</tr>

					<tr>
						<th>제목</th>
						<td>
							<span>{tradeBoardDto.title}</span>
						</td>
					</tr>

					<tr>
						<th>작성일</th>
						<td>
						<span>{formatDate(tradeBoardDto.updatedAt || tradeBoardDto.createdAt)}</span>
						</td>
					</tr>

					<tr>
						<th>조회수</th>
						<td>
							<span>{tradeBoardDto.view}</span>
						</td>
					</tr>
					<tr>
						<th>거래 상태</th>
						<td>
							<span>{status}</span>
						</td>
					</tr>

					<tr>
						<th>내용</th>
						<td>
							<div style={{ maxHeight: "400px", overflowY: "auto" }}>
								{tradeBoardDto.content}
							</div>
						</td>
					</tr>
					<tr>
					<th>가격</th>
					<td>
						<span>{new Intl.NumberFormat().format(price)}원</span>
					</td>
				</tr>

				</tbody>
			</table>

			<div className="my-3 d-flex justify-content-center">
				<Link className="btn btn-outline-secondary" to="/bbslist"><i className="fas fa-list"></i> 글목록</Link>
			</div><br/><br/>

			{/* 댓글 작성 컴포넌트 */}
			{
				(auth) ? // 로그인한 사용자만 댓글 작성 가능
					<CommentWrite data={data}/>
					
				:
					null
			}
			

			{/* 댓글 리스트 컴포넌트 */}
			<CommentList  id={id}/>
			<div className="my-5">
                {replyList.map((reply, index) => (
                    <div key={index}>
                        {/* 대댓글 컴포넌트 사용 */}
                        <Comment obj={reply} tradeBoardId={tradeBoardDto.createBy} />
                    </div>
				))}
				</div>

		</div>
	);
}

export default BbsDetail;