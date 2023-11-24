import axios from "axios";
import authInterceptor from "./authInterceptor";

const allowMethod: string[] = ["get", "post", "put", "patch", "delete"];

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "https://travelspace.world/api",
  // baseURL: "http://localhost:8080/api",
  timeout: 10000,
  withCredentials: true,
});

// instance.defaults.headers.post["Content-Type"] = "application/json";
// instance.defaults.headers.post["Content-Type"] = "multipart/form-data";

authInterceptor(instance);

type Headers = {
  Accept: string;
  "Content-Type"?: string;
};
// 정의된 함수 시그니처에 맞게 인터페이스 생성
interface AxiosRequest {
  requestAxios: <T>(method: string, url: string, data?: {}) => Promise<T>;
}

const axiosRequest: AxiosRequest = {
  /**
   * @param method 어떤 형식의 method를 보내는지 설정 (get, post, put, patch, delete)
   * @param url 호출 url 작성. (path param 포함)
   * @param data request body에 해당하는 사항.
   */
  requestAxios: async <T>(method: string, url: string, data = {}) => {
    // 이상한 method 넣으면 실행 못하게 미리 에러 처리 한다.
    if (!allowMethod.includes(method.toLowerCase())) throw new Error("허용되지 않은 호출 method입니다.");
    try {
      let headers: Headers;
      headers = {
        Accept: "application/json",
      };

      if (data instanceof FormData) {
        headers = {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        };
      }

      const response = await instance({
        method,
        url: `${instance.defaults.baseURL}${url}`,
        data,
        headers,
      });

      return response as T;
    } catch (error) {
      // TODO: 에러 처리를 클라이언트에서 바로 할 수 있도록 구성 해야 한다.
      // react error boundary
      console.log(error);
      throw error;
    }
  },
};

export default axiosRequest;
