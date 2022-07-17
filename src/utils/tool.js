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
