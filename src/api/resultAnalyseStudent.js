import service from '@/utils/request'

// 获取学生当期每一个科目考试成绩
export const getStudentCourseResult = (data) => {
  return service({
    url: '/studentResultAnalyse/getStudentCourseResult',
    method: 'get',
    params: data
  })
}

// 获取学生每一期考试的总成绩
export const getStudentTotalResultHistory = (data) => {
  return service({
    url: '/studentResultAnalyse/getStudentTotalResultHistory',
    method: 'get',
    params: data
  })
}
