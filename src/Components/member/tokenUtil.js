import { useContext } from "react";
import { HttpHeadersContext } from "../context/HttpHeadersProvider";
import { Cookies } from 'react-cookie';
import axios from 'axios';

const useTokenUtil = () => {
  const { setHeaders } = useContext(HttpHeadersContext);

  const refreshAccessToken = async () => {
    try {
      const cookies = new Cookies();
      const refresh_token = cookies.get('bbs_refresh_token'); 
      const username = localStorage.getItem('username');
      const response = await axios.get(`/api/token/refresh?username=${username}`, {
        headers: {
          'Authorization': `Bearer ${refresh_token}`
        }
      });

      const newAccessToken = response.data.access_token;
      localStorage.setItem('bbs_access_token', newAccessToken);
      setHeaders({"Authorization": `Bearer ${newAccessToken}`}); // 헤더의 Authorization 설정

      return newAccessToken;
    } catch (error) {
      throw new Error('액세스 토큰 갱신 실패');
    }
  };

  return {
    refreshAccessToken
  };
};

export default useTokenUtil;
