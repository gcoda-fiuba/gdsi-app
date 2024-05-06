const isBrowser = typeof window !== 'undefined';

//const adapter = isBrowser ? sessionStorage : null;
const adapter = isBrowser ? localStorage : null;

const get = (key) => {
  return isBrowser ? adapter.getItem(key) : null;
}

const set = (key, value) => {
  if (isBrowser) {
    adapter.setItem(key, value);
  }
}

const remove = (key) => {
  if (isBrowser) {
    adapter.removeItem(key);
  }
}

export default {
  get,
  set,
  remove
}
