import axios from "axios";
import authInterceptor from "./authInterceptor";

const allowMethod: string[] = ["get", "post", "put", "patch", "delete"];

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  withCredentials: true,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

// authInterceptor(instance);

// 정의된 함수 시그니처에 맞게 인터페이스 생성
interface AxiosRequest {
  requestAxios: <T>(method: string, url: string, data?: {}) => Promise<T>;
}

const axiosRequest: AxiosRequest = {
  /**
   * 작성자명   : 원종석
   * 작성일자   : 2023.08.02.(수)
   * 작성내용   : axios로 요청 보내기
   * 수정일자   : none
   * 수정내용   : none
   * @param method 어떤 형식의 method를 보내는지 설정 (get, post, put, patch, delete)
   * @param url 호출 url 작성. path param은 url에 같이 정의해준다.
   * @param data request body에 해당하는 사항. post, put 시 추가/수정할 객체를 지정해주면 된다. get은 빈 객체를 보낸다.
   */
  requestAxios: async <T>(method: string, url: string, data = {}) => {
    // 이상한 method 넣으면 실행 못하게 미리 에러 처리 한다.
    if (!allowMethod.includes(method.toLowerCase())) throw new Error("허용되지 않은 호출 method입니다.");
    try {
      const response = await instance({
        method,
        url: `${instance.defaults.baseURL}${url}`,
        data,
      });

      return response as T;
    } catch (error) {
      //TODO: 에러 처리를 클라이언트에서 바로 할 수 있도록 구성 해야 한다.
      // react error boundary
      console.log(error);
      throw error;
    }
  },
};

export default axiosRequest;
