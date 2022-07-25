import service from '@/utils/request'

// 更新考试
export const upExamItemRoomAllot = (data) => {
  return service({
    url: '/examItem/upExamItemRoomAllot',
    method: 'put',
    data
  })
}
