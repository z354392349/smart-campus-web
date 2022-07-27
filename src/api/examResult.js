import service from '@/utils/request'

// 获取成绩列表
export const getExamResultList = (data) => {
  return service({
    url: '/examResult/getExamResultList',
    method: 'get',
    params: data
  })
}
