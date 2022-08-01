import moment from 'moment'

export const copyObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// unix 时间转换 年龄
export const unixTimeToAge = (timeStamp) => {
  return moment().diff(moment.unix(timeStamp), 'years')
}

// unix 时间 格式化
export const unixTimeFormat = (timeStamp, format) => {
  format = format || 'YYYY-MM-DD'
  return moment.unix(timeStamp).format(format)
}

// js 时间转换 unix时间
export const jsTimeToUnix = (timeStamp) => {
  return moment(timeStamp).unix()
}

// js 时间转换 当日0点 unix时间
export const jsTimeToDayStartUnix = (timeStamp) => {
  return moment(timeStamp).startOf('day').unix()
}
// js 时间转换 当日0点 unix时间
export const jsTimeToDayEndUnix = (timeStamp) => {
  return moment(timeStamp).add(1, 'd').startOf('day').unix() - 1
}

// 获取随机数
export const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const sleep = (n) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(n), n)
  })
}
