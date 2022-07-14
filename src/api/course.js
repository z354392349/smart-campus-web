import service from '@/utils/request'

// 获取课程列表
export const getCourseList = (data) => {
  return service({
    url: '/course/getCourseList',
    method: 'get',
    params: data
  })
}

// 创建课程
export const createCourse = (data) => {
  return service({
    url: '/course/createCourse',
    method: 'post',
    data
  })
}

// 更新课程
export const upCourse = (data) => {
  return service({
    url: '/course/upCourse',
    method: 'put',
    data
  })
}

// 删除课程
export const deleteCourse = (data) => {
  return service({
    url: '/course/deleteCourse',
    method: 'delete',
    data
  })
}
