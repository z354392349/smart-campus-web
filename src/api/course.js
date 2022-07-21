import service from '@/utils/request'

// 获取科目列表
export const getCourseList = (data) => {
  return service({
    url: '/course/getCourseList',
    method: 'get',
    params: data
  })
}

// 创建科目
export const createCourse = (data) => {
  return service({
    url: '/course/createCourse',
    method: 'post',
    data
  })
}

// 更新科目
export const upCourse = (data) => {
  return service({
    url: '/course/upCourse',
    method: 'put',
    data
  })
}

// 删除科目
export const deleteCourse = (data) => {
  return service({
    url: '/course/deleteCourse',
    method: 'delete',
    data
  })
}
