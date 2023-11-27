import http from "@/utils/http";

// 获取音乐列表
export function getMusic(params) {
  return http.get("/serve/getMusic", params);
}

// 添加音乐
export function setMusic(params) {
  return http.post("/serve/setMusic", params);
}
