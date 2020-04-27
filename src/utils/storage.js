//本地存储
export default {
  set(key,val) {
      localStorage.setItem(key,JSON.stringify(val))
  },
  get(key) {
      return JSON.parse(localStorage.getItem(key))
  },
  remove(key) {
      localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
} 
