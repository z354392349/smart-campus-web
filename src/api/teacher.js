import service from '@/utils/request'

// 获取教师列表
export const getTeacherList = (data) => {
  return service({
    url: '/teacher/getTeacherList',
    method: 'get',
    params: data
  })
}

// 创建教师
export const createtTeacher = (data) => {
  return service({
    url: '/teacher/createTeacher',
    method: 'post',
    data
  })
}

// 更新教师
export const upTeacher = (data) => {
  return service({
    url: '/teacher/upTeacher',
    method: 'put',
    data
  })
}

// 删除年级
export const deleteTeacher = (data) => {
  return service({
    url: '/teacher/deleteTeacher',
    method: 'delete',
    data
  })
}
