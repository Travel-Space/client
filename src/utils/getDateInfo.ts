interface TimeOptions {
  hour: "numeric" | "2-digit";
  minute: "numeric" | "2-digit";
  second: "numeric" | "2-digit";
  hour12?: boolean;
}

export const getDateInfo = (createdAt: Date) => {
  const serverDate = new Date(createdAt);

  const dateString = serverDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayName = serverDate.toLocaleDateString("ko-KR", {
    weekday: "long",
  });

  const options: TimeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  const time = serverDate.toLocaleTimeString("en-US", options);

  return { dateString, dayName, time };
};

// 사용 예시
// const { dateString, dayName, time } = getDateInfo(createdAt);
// console.log(dateString, dayName, time); // 각 변수에 해당하는 값 출력
