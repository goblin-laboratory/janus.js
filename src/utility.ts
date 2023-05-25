/**
 * 解析 JSON 字符串
 * @param {string} str 字符串
 * @param {object} defaultValue 默认值
 * @returns {object} 解析后的对象，如果解析失败则返回默认值
 */
export function parseJSON(str?: string | any, defaultValue: any = null): any {
  if (!str || typeof str !== 'string') {
    return defaultValue;
  }
  try {
    return JSON.parse(str);
  } catch (e) {
    return defaultValue;
  }
}

/**
 * 加载脚本
 * @param {string} src js 脚本文件地址
 * @returns {Promise} 加载成功Promise.resolve，加载失败 Promise.reject
 */
export function getScript(src: string): Promise<any> {
  // TODO: how to jest?
  return new Promise((resolve, reject) => {
    const script = window.document.createElement('script');
    window.document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = src;
  });
}

/**
 * Promise 风格的定时器，便于 async 函数使用
 * @param {number} ms 定时器间隔
 * @returns {Promise} 定时器触发后 resolve Promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * 深拷贝对象，不能有内置对象和循环对象
 * @param args 合并对象列表
 * @returns a new object
 */
export function deepClone(...args: object[]) {
  return JSON.parse(JSON.stringify(Object.assign({}, ...args)));
}

export function filterByIds(list: any[], ids: string[]) {
  return list.filter((data) => ids.includes(data.id));
}

export function filterByValues(list: any[], values: any[], key = 'id') {
  return list.filter((data) => values.includes(data[key]));
}

export function sum(a: number, b: number): number {
  return a + b;
}

export default {
  parseJSON,
  getScript,
  delay,
  deepClone,
  filterByIds,
  filterByValues,
  sum,
};
