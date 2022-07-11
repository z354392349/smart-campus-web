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

// 更新年级
export const upGrade = (data) => {
  return service({
    url: '/grade/upGrade',
    method: 'put',
    data
  })
}

// 删除年级
export const deleteGrade = (data) => {
  return service({
    url: '/grade/deleteGrade',
    method: 'delete',
    data
  })
}
