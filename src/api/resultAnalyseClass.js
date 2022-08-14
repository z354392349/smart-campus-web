import service from '@/utils/request'

// 获取平均学习成绩
export const getStudentTotalResult = (data) => {
  return service({
    url: '/studentResultAnalyse/getStudentTotalResult',
    method: 'get',
    params: data
  })
}
