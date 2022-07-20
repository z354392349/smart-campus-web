let Mock = require('mockjs')
import moment from 'moment'
import { rand } from '@/utils/tool'

// 获取模拟生日
let getMockBirthdayUnix = (min, max) => {
  return moment.unix(rand(min, max)).startOf('day').unix()
}

// 获取模拟手机号码
let getMockTelNum = () => {
  let prefixArray = new Array('130', '131', '132', '133', '135', '137', '138', '170', '187', '189')
  let i = parseInt(10 * Math.random())
  let prefix = prefixArray[i]

  for (let j = 0; j < 8; j++) {
    prefix = prefix + Math.floor(Math.random() * 10)
  }

  return prefix
}

// Name        string  `json:"name" form:"name" gorm:"comment:字典名（中）"`
// Birthday    int     `json:"birthday" form:"birthday" gorm:"comment:出生日期"`
// Sex         int     `json:"sex" form:"sex" gorm:";comment:性别 1表示男，2表示女。"`
// SubjectID   uint    `json:"subjectID" form:"subjectID" gorm:"comment:科目id"`
// Subject     *Course `json:"subject" gorm:"foreignKey:SubjectID;"`
// Telephone   string  `json:"telephone" form:"telephone" gorm:"comment:电话"`
// Description string  `json:"description" form:"description" gorm:"comment:描述"`
// SysUserID   uint    `json:"sysUserID" form:"sysUserID" gorm:"comment:用户UUID"`

// 教师年龄在 1980 - 1995
export const mockTeacher = () => {
  return {
    name: Mock.mock('@cname'),
    birthday: getMockBirthdayUnix(315504000, 820252800),
    sex: rand(1, 2),
    subject: rand(1, 8),
    telephone: getMockTelNum()
  }
}

// 教师年龄在 1980 - 1995
export const mockTeacherList = (num) => {
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push(mockTeacher())
  }
  return arr
}
