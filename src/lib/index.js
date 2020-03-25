export function parseTime(time, TimeFormat) {
  if (arguments.length === 0) {
      return null
  }
  const format = TimeFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  // parseTime('1566458744391','{y}-{m}-{d} {h}:{i}:{s} 周{a}') 加上周  08-22-2019 15:25:44 周四
  let date
  if (typeof time === 'object') {
      date = time
  } else {
      if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
          time = parseInt(time)
      }
      if ((typeof time === 'number') && (time.toString().length === 10)) {
          time = time * 1000
      }
      date = new Date(time)
  }
  const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') {
          return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
          value = '0' + value
      }
      return value || 0
  })
  return time_str
}

// 提取url地址中的参数
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
  })
  return obj
}

// 千分号加逗号，即个位数开始每隔三位数
export function numFormat(num) {
  if (num == null) {
    return;
  }
  if (!isNaN(num)) {
    num = num.toString();
  }
  if (num.indexOf('.') != -1) {
    var decimals = num.split('.')[1];
    return (
      (parseInt(Number(num)) + '').replace(
        /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
        '$&,'
      ) +
      '.' +
      decimals.substring(0, 2)
    );
  } else {
    return (parseInt(Number(num)).toFixed(0) + '').replace(
      /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
      '$&,'
    );
  }
}