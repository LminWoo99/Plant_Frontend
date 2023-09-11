import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";

function Reply(props) {

    const { obj, updateToggle, showStates, changeContent, contentStates } = props;
    const { auth, setAuth } = useContext(AuthContext);
    const { headers, setHeaders } = useContext(HttpHeadersContext);
    const reply = props.obj;
    const navigate = useNavigate();
console.log(reply);

    const updateReply = async (id) => {
        const req = {
            content: contentStates[id], // Assuming you have contentStates similar to Comment
            id: id,
            tradeBoardId: reply.tradeBoardId,
            memberId: reply.memberId
        };

        await axios
            .put(`http://localhost:8080/api/comment/${reply.id}`, req, { headers: headers })
            .then((resp) => {
                console.log("[Reply.js] updateReply() success :D");
                console.log(reply.id);
                alert("대댓글을 성공적으로 수정했습니다 !");
                navigate(0);  // assuming you want to refresh the page after a successful operation
            })
            .catch((err) => {
                console.log("[Reply.js] updateReply() error :<");
                alert(err);
            });
    };

    const deleteReply = async () => {
        await axios
            .delete(`http://localhost:8080/api/comment/${reply.id}`)
            .then((resp) => {
                console.log("[Reply.js] deleteReply() success :D");
                alert("대댓글을 성공적으로 삭제했습니다 :D");
                navigate(0);
            })
            .catch((err) => {
                console.log("[Reply.js] deleteReply() error :<");
                alert(err);
            });
    };

    return (
        <div className="reply-container">
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
                        <span className="comment-id">{reply.nickname}</span>
                    </div>
                    <div className="row">
                        <span>{reply.createdAt}</span>
                    </div>
                </div>

                <div className="col-4 d-flex justify-content-end">
                    {localStorage.getItem("id") == reply.memberId ? (
                        <>
                            <button className="btn btn-outline-secondary" onClick={() => updateToggle(reply.id)}>
                                <i className="fas fa-edit"></i> 수정
                            </button>{" "}
                            &nbsp;
                            <button className="btn btn-outline-danger" onClick={deleteReply}>
                                <i className="fas fa-trash-alt"></i> 삭제
                            </button>
                        </>
                    ) : null}
                </div>
            </div>

            {/* Reply content */}
            {showStates[reply.id] ? (
                <>
                    <div className="my-3 d-flex justify-content-center">
                        <textarea
                            className="col-10"
                            rows="5"
                            value={contentStates[reply.id] || reply.content}
                            onChange={(e) => changeContent(e, reply.id)} // Assuming you have changeContent function similar to Comment
                        ></textarea>
                    </div>
                    <div className="my-1 d-flex justify-content-center">
                        <button className="btn btn-dark" onClick={() => updateReply(reply.id)}>
                            <i className="fas fa-edit"></i> 수정 완료
                        </button>
                    </div>
                </>
            ) : (
                <div className="my-3 d-flex justify-content-center">
                    <div className="col-10 comment">{reply.content}</div>
                </div>
            )}
        </div>
    );
}

export default Reply;
