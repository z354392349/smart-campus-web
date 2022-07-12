import service from '@/utils/request'

// 获取班级列表
export const getClassList = (data) => {
  return service({
    url: '/class/getClassList',
    method: 'get',
    params: data
  })
}

// 创建班级
export const createClass = (data) => {
  return service({
    url: '/class/createClass',
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
