const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ssrResponseWrapper = <T>(
  { status = 200, message = "데이터를 성공적으로 불러왔습니다" },
  data?: any
): {
  data: T;
  status: number;
  message: string;
} => {
  return {
    data,
    status,
    message,
  };
};

export { numberWithCommas, ssrResponseWrapper };
