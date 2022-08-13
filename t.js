var data = [
  { examName: '2021年七年级上学期期中考试', className: '一班', result: '593.68' },
  { examName: '2021年七年级上学期期中考试', className: '二班', result: '604.20' },
  { examName: '2021年七年级上学期期中考试', className: '三班', result: '593.85' },
  { examName: '2021年七年级上学期期中考试', className: '四班', result: '593.85' },
  { examName: '2022年七年级上学期期末考试', className: '一班', result: '592.05' },
  { examName: '2022年七年级上学期期末考试', className: '二班', result: '590.40' },
  { examName: '2022年七年级上学期期末考试', className: '三班', result: '585.60' },
  { examName: '2022年七年级上学期期末考试', className: '四班', result: '598.58' },
  { examName: '2022年七年级下学期期中考试', className: '二班', result: '588.03' },
  { examName: '2022年七年级下学期期中考试', className: '三班', result: '591.80' },
  { examName: '2022年七年级下学期期中考试', className: '四班', result: '594.93' },
  { examName: '2022年七年级下学期期中考试', className: '一班', result: '594.93' },
  { examName: '2022年七年级下学期期末考试', className: '二班', result: '587.75' },
  { examName: '2022年七年级下学期期末考试', className: '三班', result: '593.25' },
  { examName: '2022年七年级下学期期末考试', className: '四班', result: '593.93' },
  { examName: '2022年七年级下学期期末考试', className: '一班', result: '593.13' }
]

let charData = {
  time: [],
  data: [
    { name: '一班', value: [] },
    { name: '二班', value: [] },
    { name: '三班', value: [] },
    { name: '四班', value: [] }
  ]
}
data.forEach((n) => {
  if (!charData.time.includes(n.examName)) charData.time.push(n.examName)
  switch (n.className) {
    case '一班':
      charData.data[0].value.push(n.result)
      break
    case '二班':
      charData.data[1].value.push(n.result)
      break
    case '三班':
      charData.data[2].value.push(n.result)
      break
    case '四班':
      charData.data[3].value.push(n.result)
      break
  }
})

console.log(charData)
