import moment from 'moment'

export const copyObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const unixTimeToAge = (timeStamp) => {
  return moment().diff(moment.unix(timeStamp), 'years')
}
