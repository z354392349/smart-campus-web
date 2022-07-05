import service from "@/utils/request";

export const getApiList = (data) => {
  return service({
    url: "/api/getApiList",
    method: "post",
    data,
  });
};
