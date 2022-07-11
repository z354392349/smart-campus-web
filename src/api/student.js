import service from '@/utils/request'

export const getStudentList = (data) => {
  return service({
    url: '/student/getStudentList',
    method: 'get',
    data
  })
}
