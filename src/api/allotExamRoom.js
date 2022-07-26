import service from '@/utils/request'

// 获取考场分配列表
export const getAllotExamRoomList = (data) => {
  return service({
    url: '/allotExamRoom/getAllotExamRoomList',
    method: 'get',
    params: data
  })
}
