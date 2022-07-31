import service from '@/utils/request'

// 创建教师通行记录
export const createTeacherAccess = (data) => {
  return service({
    url: '/teacherAccess/createTeacherAccess',
    method: 'post',
    data
  })
}

// 获取教师通行记录
export const getTeacherAccessList = (data) => {
  return service({
    url: '/teacherAccess/getTeacherAccessList',
    method: 'get',
    params: data
  })
}
