import http from "@/utils/http";

// 获取用户列表
export function getUser(params) {
  return http.get("/serve/getUser", params);
}

// 添加用户
export function setUser(params) {
  return http.post("/serve/setUser", params);
}

// 注册
export function register(params) {
  return http.post("/serve/register", params);
}

// 登录
export function login(params) {
  return http.post("/serve/login", params);
}

// 修改头像
export function headshot(params) {
  return http.post("/serve/headshot", params);
}

// 修改密码
export function changePassword(params) {
  return http.post("/serve/changePassword", params);
}

// 修改用户名
export function changeUsername(params) {
  return http.post("/serve/changeUsername", params);
}
