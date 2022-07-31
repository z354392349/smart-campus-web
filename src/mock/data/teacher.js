export const teacherData = [
  { teacherID: 5, carNum: '京C V4714' },
  { teacherID: 6, carNum: '京C W8302' },
  { teacherID: 7, carNum: '京C F5279' },
  { teacherID: 8, carNum: '京A P0222' },
  { teacherID: 9, carNum: '京A H7161' },
  { teacherID: 10, carNum: '京B L7479' },
  { teacherID: 11, carNum: '京A K7112' },
  { teacherID: 12, carNum: '京C F7769' },
  { teacherID: 13, carNum: null },
  { teacherID: 14, carNum: null },
  { teacherID: 15, carNum: null },
  { teacherID: 16, carNum: null },
  { teacherID: 17, carNum: null },
  { teacherID: 18, carNum: null },
  { teacherID: 19, carNum: null },
  { teacherID: 20, carNum: null }
]

// 生成随机车牌
// function getRandomByStr(l = 3, s) {
//   if (typeof s !== 'string') {
//     return
//   }
//   var len = +l
//   var chars = ''

//   while (len--) {
//     chars += s[parseInt(Math.random() * s.length, 10)]
//   }
//   return chars
// }

// function getPlate() {
//   var ch = 'QWERTYUIOPASDFGHJKLZXCVBNM'
//   var start = 'ABC'
//   var num = '1234567890'
//   return '京' + getRandomByStr(1, start) + ' ' + getRandomByStr(1, ch) + getRandomByStr(4, num)
// }

// function getTeacherCar() {
//   for (let i = 0; i < 18; i++) {
//     teacherCar.push({ teacherID: i + 5, carNum: getPlate() })
//   }
// }

// getTeacherCar()
