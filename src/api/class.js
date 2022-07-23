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

// 更新班级
export const upClass = (data) => {
  return service({
    url: '/class/upClass',
    method: 'put',
    data
  })
}

// 删除班级
export const deleteClass = (data) => {
  return service({
    url: '/class/deleteClass',
    method: 'delete',
    data
  })
}

// 设置班长
export const setClassMonitor = (data) => {
  return service({
    url: '/class/setClassMonitor',
    method: 'put',
    data
  })
}

// 设置班主任
export const setClassTeacher = (data) => {
  return service({
    url: '/class/setClassTeacher',
    method: 'put',
    data
  })
}
