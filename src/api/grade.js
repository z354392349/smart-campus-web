import service from '@/utils/request'

// 获取年级列表
export const getGradeList = (data) => {
  return service({
    url: '/grade/getGradeList',
    method: 'get',
    params: data
  })
}

// 创建年级
export const createGrade = (data) => {
  return service({
    url: '/grade/createGrade',
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
