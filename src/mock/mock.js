let Mock = require('mockjs')
import moment from 'moment'
import { rand, copyObj } from '@/utils/tool'
import { teacherData } from './data/teacher'

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

// 	Name        string  `json:"name" form:"name" gorm:"comment:字典名（中）"`
// 	Birthday    int     `json:"birthday" form:"birthday" gorm:"comment:出生日期"`
// 	Sex         int     `json:"sex" form:"sex" gorm:";comment:性别 1表示男，2表示女。"`
// 	CourseID    uint    `json:"courseID" form:"courseID" gorm:"comment:课程id"`
// 	Course      *Course `json:"course"   form:"course" gorm:"foreignKey:CourseID;"`
// 	Telephone   string  `json:"telephone" form:"telephone" gorm:"comment:电话"`
// 	Description string  `json:"description" form:"description" gorm:"comment:备注"`
// 	SysUserID   uint    `json:"sysUserID" form:"sysUserID" gorm:"comment:用户UUID"`
// }

// 教师年龄在 1980 - 1995
export const mockTeacher = () => {
  return {
    name: Mock.mock('@cname'),
    birthday: getMockBirthdayUnix(315504000, 820252800),
    sex: rand(1, 2),
    courseID: rand(1, 8),
    telephone: getMockTelNum()
  }
}

export const mockTeacherList = (num) => {
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push(mockTeacher())
  }
  return arr
}

// Name        string `json:"name" form:"name" gorm:"comment:学生名称"`
// Birthday    int    `json:"birthday" form:"birthday" gorm:"comment:出生日期"`
// Sex         int    `json:"sex" form:"sex" gorm:"comment:性别 1表示男，2表示女。"`
// Telephone   string `json:"telephone" form:"telephone" gorm:"comment:家长电话"`
// GradeID     uint   `json:"gradeID" form:"gradeID" gorm:"comment:外键年级ID;" `
// Grade       *Grade `gorm:"foreignKey:GradeID;"`
// ClassID     uint   `json:"classID" form:"classID" gorm:"comment:外键班级ID;" `
// Class       *Class `gorm:"foreignKey:ClassID;"`
// SysUserID   uint   `json:"sysUserID" form:"sysUserID" gorm:"comment:用户UUID"`
// Description string `json:"description" form:"description" gorm:"comment:描述"`
// 教师年龄在 1980 - 1995

// data -> gradeID、classID、 type-> 7,8,9
// 学生年龄在 2008- 2010年底  13-16
// 1262275200 ，1293638400 2010-
// 1293811200 1325174400 2011 -
// 1325347200 1356796800 2012-
// 十二周岁上初一,十三周岁上初二,十四周岁上初三,

export const mockStudent = (data) => {
  let birthday
  switch (data.type) {
    case 7:
      birthday = getMockBirthdayUnix(1230739200, 1262102400) // 2009
      break
    case 8:
      birthday = getMockBirthdayUnix(1199116800, 1230566400) // 2008
      break
    case 9:
      birthday = getMockBirthdayUnix(1167580800, 1198944000) // 2007
      break
    default:
      break
  }
  return {
    name: Mock.mock('@cname'),
    birthday: birthday,
    sex: rand(1, 2),
    courseID: rand(1, 8),
    telephone: getMockTelNum(),
    ...data
  }
}

export const mockStudentList = (num, data) => {
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push(mockStudent(data))
  }
  return arr
}

// 模拟教师车辆通行记录

export const mockCarAccess = (time, data) => {
  let startTime, endTime
  if (data.direction == 1) {
    startTime = moment(time).subtract(30, 'minutes').unix()
    endTime = moment(time).add(5, 'minutes').unix()
  } else {
    startTime = moment(time).subtract(5, 'minutes').unix()
    endTime = moment(time).add(30, 'minutes').unix()
  }
  const place = ['东门', '西门', '南门', '北门']
  let teacherCarData = copyObj(teacherData.filter((n) => n.carNum != null))
  teacherCarData = teacherCarData.map((x) => {
    x.time = rand(startTime, endTime)
    x.place = place[rand(0, 3)]
    return { ...x, ...data }
  })

  return teacherCarData
}

// 模拟教师通行记录
export const mockTeacherAccess = (time, data) => {
  let startTime, endTime
  if (data.direction == 1) {
    startTime = moment(time).subtract(30, 'minutes').unix()
    endTime = moment(time).add(5, 'minutes').unix()
  } else {
    startTime = moment(time).subtract(5, 'minutes').unix()
    endTime = moment(time).add(30, 'minutes').unix()
  }
  const place = ['东门', '西门', '南门', '北门']
  let teacherDataCopy = copyObj(teacherData.filter((n) => n.carNum == null))

  teacherDataCopy = teacherDataCopy.map((x) => {
    x.time = rand(startTime, endTime)
    x.place = place[rand(0, 3)]
    return { ...x, ...data }
  })

  return teacherDataCopy
}

export const mockStudentAccess = (time, data) => {
  let startTime, endTime
  if (data.direction == 1) {
    startTime = moment(time).subtract(30, 'minutes').unix()
    endTime = moment(time).add(5, 'minutes').unix()
  } else {
    startTime = moment(time).subtract(5, 'minutes').unix()
    endTime = moment(time).add(30, 'minutes').unix()
  }
  const place = ['东门', '西门', '南门', '北门']
  let studentData = []

  for (let i = 4; i <= 485; i++) {
    studentData.push({
      studentID: i,
      place: place[rand(0, 3)],
      time: rand(startTime, endTime),
      ...data
    })
  }

  return studentData
}

export const mockExam = (time, data) => {
  // date: 1658851200000, 07:30-9:30, 10:00-12:00,  13:30-15.30, 16:00-18:00
  let form = {
    // name: data,
    // gradeID: 1,
    // description: '',
    ...data,
    examItem: []
  }
  for (let i = 1; i <= 8; i++) {
    let startTime, endTime
    switch (i % 4) {
      case 1:
        startTime = moment(time).hour(7).minute(30).format()
        endTime = moment(time).hour(9).minute(30).format()
        break
      case 2:
        startTime = moment(time).hour(10).minute(0).format()
        endTime = moment(time).hour(12).minute(0).format()
        break
      case 3:
        startTime = moment(time).hour(13).minute(30).format()
        endTime = moment(time).hour(15).minute(30).format()
        break
      case 4:
        startTime = moment(time).hour(16).minute(0).format()
        endTime = moment(time).hour(18).minute(0).format()
        break
      default:
        break
    }
    form.examItem.push({ courseID: i, startTime, endTime })
  }
  return form
}
