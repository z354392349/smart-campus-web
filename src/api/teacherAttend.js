import service from '@/utils/request'

// 获取教师通行记录
export const getTeacherAttendList = (data) => {
  return service({
    url: '/teacherAttend/getTeacherAttendList',
    method: 'get',
    params: data
  })
}
