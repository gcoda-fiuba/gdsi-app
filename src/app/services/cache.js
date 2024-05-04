//const adapter = sessionStorage
const adapter = localStorage

const get = (key) => {
  return adapter.getItem(key)
}

const set = (key, value) => {
  adapter.setItem(key, value)
}

const remove = (key) => {
  adapter.removeItem(key)
}

export default {
  get,
  set,
  remove
}