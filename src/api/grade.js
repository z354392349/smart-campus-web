import service from '@/utils/request'

// 获取年级列表
export const getGradeList = data => {
  return service({
    url: '/grade/getGradeList',
    method: 'get',
    params: data
  })
}

// 创建年级
export const createGrade = data => {
  return service({
    url: '/grade/createGrade',
    method: 'post',
    data
  })
}
