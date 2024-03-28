import { defineStore } from "pinia"
import type { UserInfo, State } from "./types"

export default defineStore("user", {
  persist: true,
  state: (): State => ({
    info: null,
    token: null
  }),
  actions: {
    setUser(info: UserInfo) {
      this.info = info
    },
    setToken(token: string) {
      this.token = token
    },
    reset() {
      this.$reset()
      sessionStorage.removeItem("token")
    }
  }
})
