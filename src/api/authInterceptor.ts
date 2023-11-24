import STATUS_CODE from "@/constants/statusCode";
import { AxiosInstance } from "axios";

export default function authInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(async config => {
    return config;
  });
  instance.interceptors.response.use(
    response => {
      return response;
    },
    async axiosError => {
      const {
        response: { data: error, status },
        config,
      } = axiosError;

      if (status === STATUS_CODE.UNAUTHORIZED && error?.error === "Unauthorized") {
        await instance.post("/auth/refresh");

        return instance(config); // 기존 요청을 재요청
      }

      return Promise.reject(axiosError);
    },
  );
}
