import HTTP from "@/server/axios"

export default new HTTP({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000 * 30
})
