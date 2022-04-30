const debounce = (callback: Function, delayTime = 500) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: []) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);

      clearTimeout(timeout);
    }, delayTime);
  };
};

export default {
  debounce,
};
