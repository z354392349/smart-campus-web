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
// 获取通过率
export const getExamPassRate = () => {
  return service({
    url: '/dashboard/getExamPassRate',
    method: 'get'
  })
}
// 获取获取教师考勤 统计 - 历史
export const getTeacherAttendCensus = () => {
  return service({
    url: '/dashboard/getTeacherAttendCensus',
    method: 'get'
  })
}
