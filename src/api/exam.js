import service from '@/utils/request'

// 获取考试列表
export const getExamList = (data) => {
  return service({
    url: '/exam/getExamList',
    method: 'get',
    params: data
  })
}

// 创建考试
export const createtExam = (data) => {
  return service({
    url: '/exam/createExam',
    method: 'post',
    data
  })
}

// 更新考试
export const upExam = (data) => {
  return service({
    url: '/exam/upExam',
    method: 'put',
    data
  })
}

// 删除年级
export const deleteExam = (data) => {
  return service({
    url: '/exam/deleteExam',
    method: 'delete',
    data
  })
}
