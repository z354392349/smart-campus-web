import service from '@/utils/request'

// 考试项分配考场
export const allotExamItemRoom = (data) => {
  return service({
    url: '/examItem/allotExamItemRoom',
    method: 'put',
    data
  })
}

// 取消考试项的 考场分配
export const cancelAllotExamItemRoom = (data) => {
  return service({
    url: '/examItem/cancelAllotExamItemRoom',
    method: 'put',
    data
  })
}
