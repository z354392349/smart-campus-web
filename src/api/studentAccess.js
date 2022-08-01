import service from '@/utils/request'

// 创建学生通行记录
export const createStudentAccess = (data) => {
  return service({
    url: '/studentAccess/createStudentAccess',
    method: 'post',
    data
  })
}
// 创建学生通行记录
export const createStudentAccessMock = (data) => {
  return service({
    url: '/studentAccess/createStudentAccessList',
    method: 'post',
    data
  })
}

// 获取学生通行记录
export const getStudentAccessList = (data) => {
  return service({
    url: '/studentAccess/getStudentAccessList',
    method: 'get',
    params: data
  })
}
