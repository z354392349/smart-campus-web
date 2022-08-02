import service from '@/utils/request'

// 获取学生考勤通行记录
export const getStudentAttendList = (data) => {
  return service({
    url: '/studentAttend/getStudentAttendList',
    method: 'get',
    params: data
  })
}
