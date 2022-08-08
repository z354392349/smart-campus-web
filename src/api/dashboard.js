import service from '@/utils/request'

// 获取人员，车辆通行数量，学生教师考勤
export const getDashboardCensusNum = () => {
  return service({
    url: '/dashboard/getDashboardCensusNum',
    method: 'get'
  })
}
// 获取教师数量
export const getTeacherNum = () => {
  return service({
    url: '/dashboard/getTeacherNum',
    method: 'get'
  })
}
