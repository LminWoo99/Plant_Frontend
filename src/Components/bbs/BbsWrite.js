import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import tokenUtil from "../member/tokenUtil";
import useTokenUtil from "../member/tokenUtil";
function BbsWrite() {
    const { auth } = useContext(AuthContext);
    const { headers } = useContext(HttpHeadersContext);

    const tokenUtil=useTokenUtil();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
	const [price, setPrice] = useState();

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleImageChange = (event) => {
        setSelectedFiles([...event.target.files]);
    };

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const changeContent = (event) => {
        setContent(event.target.value);
    };
	const changePrice = (event) => { 
        const inputPrice = event.target.value.replace(/[^0-9]/g, ""); 
        const formattedPrice = inputPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
        setPrice(formattedPrice);
    };
    const createBbs = async () => {
        if (!auth) {
            alert("로그인한 사용자만 글을 작성할 수 있습니다 !");
            navigate("/login");
            return;
        }

        if (selectedFiles.length === 0) {
            alert("중고 거래시 이미지 등록은 필수입니다 !");
            return;
        }

        const tradeBoardDto = {
            title: title,
            content: content,
			price: parseInt(price.replace(/,/g, ''))
        };

        try {
            const response = await axios.post(
                "/api/write",
                tradeBoardDto,
                { headers: headers }
            );

            const tradeBoardId = response.data.id;
            uploadImages(tradeBoardId);
        } catch (error) {
            console.log("[BbsWrite.js] createBbs() error :", error);
            console.log(error.response.status)
            if (error.response.status === 403 ){
                try {
                    const newAccessToken = await tokenUtil.refreshAccessToken();
                    console.log(headers);
                    const response = await axios.post(
                        "/api/write",
                        tradeBoardDto,
                        { headers: headers }
                    );

                    const tradeBoardId = response.data.id;
                    uploadImages(tradeBoardId);
                } catch (refreshError) {
                    console.error('액세스 토큰 갱신 실패:', refreshError);
                }
            } else {
                console.error("[BbsWrite.js] createBbs() error :", error);
            }
            }
        }
    

    async function uploadImages(tradeBoardId) {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("file", selectedFiles[i]);
        }

        try {
            await axios.post(
                `/api/${tradeBoardId}/images`,
                formData
            );
            alert("새로운 게시글을 성공적으로 등록했습니다 :D");
            navigate(`/bbsdetail/${tradeBoardId}`);
        } catch (error) {
            console.log("이미지 업로드 에러:", error);
            alert("이미지 업로드 중 에러가 발생했습니다.");
        }
    }

    return (
        <div>
            <table className="table">
                <tbody>
                    <tr>
                        <th className="table-primary">제목</th>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={changeTitle}
								placeholder="제목"
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
								placeholder="식물, 식물용품에 대한 자세한 설명을 입력해주세요"
                                rows="10"
                            ></textarea>
                        </td>
                    </tr>
					<tr>
                        <th className="table-primary">가격</th>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                value={price}
                                onChange={changePrice}
                                placeholder="가격을 입력하세요 (예: 25,000)"
                            />
                            
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <h2>이미지 업로드</h2>
                <input type="file" multiple onChange={handleImageChange} />
            </div>
            <div className="my-5 d-flex justify-content-center">
                <button className="btn btn-outline-secondary" onClick={createBbs}>
                    <i className="fas fa-pen"></i> 등록하기
                </button>
            </div>
        </div>
    );
}

export default BbsWrite;
