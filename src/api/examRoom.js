import service from '@/utils/request'

// 获取考场列表
export const getExamRoomList = (data) => {
  return service({
    url: '/examRoom/getExamRoomList',
    method: 'get',
    params: data
  })
}

// 创建考场
export const createExamRoom = (data) => {
  return service({
    url: '/examRoom/createExamRoom',
    method: 'post',
    data
  })
}

// 更新考场
export const upExamRoom = (data) => {
  return service({
    url: '/examRoom/upExamRoom',
    method: 'put',
    data
  })
}

// 删除考场
export const deleteExamRoom = (data) => {
  return service({
    url: '/examRoom/deleteExamRoom',
    method: 'delete',
    data
  })
}
