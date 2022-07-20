import service from '@/utils/request'

// 获取学生列表
export const getStudentList = (data) => {
  return service({
    url: '/student/getStudentList',
    method: 'get',
    params: data
  })
}

// 创建学生
export const createtStudent = (data) => {
  return service({
    url: '/student/createStudent',
    method: 'post',
    data
  })
}

// 更新学生
export const upStudent = (data) => {
  return service({
    url: '/student/upStudent',
    method: 'put',
    data
  })
}

// 删除年级
export const deleteStudent = (data) => {
  return service({
    url: '/student/deleteStudent',
    method: 'delete',
    data
  })
}

// 批量修改学习年级班级
// 更新学生
export const setStudentsGradeAndClass = (data) => {
  return service({
    url: '/student/setStudentsGradeAndClass',
    method: 'put',
    data
  })
}
