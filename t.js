const teacherCar = [
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

let a = JSON.parse(JSON.stringify())

a[0].x = 1
console.log(teacherCar)
