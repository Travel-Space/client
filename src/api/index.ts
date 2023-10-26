import axios from "axios";

const allowMethod: string[] = ["get", "post", "put", "patch", "delete"];

axios.defaults.baseURL = "http://localhost:8080";

axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

// TODO: interceptor 적용
// 요청 보내다가 취소해야되는 경우에도 사용함 / 서버 다 끊어버릴때 사용. 헤더값에 키 심어놓고 이 키를 변수로 놓음.
// 서버 죽을때/죽일때 추적하고있는 키값을 통해 현재 요청중인 request를 다 취소시키고 죽인다.
// client ------- interceptor ----- [server]
// axios.interceptors.request.use(
//   (req) => {
//       if (req.data instanceof FormData) {
//           req.headers["Content-Type"] = "multipart/form-data";
//       }
//       return req;
//   },
//   (err) => {}
// );

// clinet <----- interceptor ----- [server]
// axios.interceptors.response.use(
//   (res) => {
//       return res.data; // {}
//   },
//   (err) => {}
// );

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
      const response = await axios({
        method,
        url: `${axios.defaults.baseURL}${url}`,
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
