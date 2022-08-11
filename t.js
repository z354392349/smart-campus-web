var data = [
  { className: '一班', gradeName: '七年级', sex: '1', total: 18 },
  { className: '二班', gradeName: '七年级', sex: '1', total: 18 },
  { className: '三班', gradeName: '七年级', sex: '1', total: 20 },
  { className: '四班', gradeName: '七年级', sex: '1', total: 17 },
  { className: '一班', gradeName: '八年级', sex: '1', total: 22 },
  { className: '二班', gradeName: '八年级', sex: '1', total: 12 },
  { className: '三班', gradeName: '八年级', sex: '1', total: 17 },
  { className: '四班', gradeName: '八年级', sex: '1', total: 18 },
  { className: '一班', gradeName: '九年级', sex: '1', total: 20 },
  { className: '二班', gradeName: '九年级', sex: '1', total: 22 },
  { className: '三班', gradeName: '九年级', sex: '1', total: 10 },
  { className: '四班', gradeName: '九年级', sex: '1', total: 18 },
  { className: '一班', gradeName: '七年级', sex: '2', total: 22 },
  { className: '二班', gradeName: '七年级', sex: '2', total: 22 },
  { className: '三班', gradeName: '七年级', sex: '2', total: 20 },
  { className: '四班', gradeName: '七年级', sex: '2', total: 23 },
  { className: '一班', gradeName: '八年级', sex: '2', total: 18 },
  { className: '二班', gradeName: '八年级', sex: '2', total: 28 },
  { className: '三班', gradeName: '八年级', sex: '2', total: 23 },
  { className: '四班', gradeName: '八年级', sex: '2', total: 22 },
  { className: '一班', gradeName: '九年级', sex: '2', total: 20 },
  { className: '二班', gradeName: '九年级', sex: '2', total: 18 },
  { className: '三班', gradeName: '九年级', sex: '2', total: 30 },
  { className: '四班', gradeName: '九年级', sex: '2', total: 22 }
]

let groupData = {} // 0-4 对应四个班数据
let series = []
data.forEach((n) => {
  let name = n.className + (n.sex == '1' ? '男生' : '女生')
  if (!(name in groupData)) groupData[name] = []
  groupData[name].push(n.total)
})

for (const key in groupData) {
  series.push({
    name: key,
    type: 'bar',
    stack: key.substring(0, 2),
    emphasis: {
      focus: 'series'
    },
    color: key.substring(2) == '男生' ? '#5487ff' : '#ff6d8a',
    data: groupData[key]
  })
}

console.log(series)
