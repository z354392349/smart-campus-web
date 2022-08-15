import service from '@/utils/request'

// 获取平均学习成绩
export const getStudentTotalResult = (data) => {
  return service({
    url: '/studentResultAnalyse/getStudentTotalResult',
    method: 'get',
    params: data
  })
}
// 获取班级通过率
export const getClassPassPercent = (data) => {
  return service({
    url: '/studentResultAnalyse/getClassPassPercent',
    method: 'get',
    params: data
  })
}
// 获取班级下，学生考试总成绩-历史
export const getStudentToTalResultHistory = (data) => {
  return service({
    url: '/studentResultAnalyse/getStudentToTalResultHistory',
    method: 'get',
    params: data
  })
}
// 获取班级下，学生考试单科成绩-历史
export const getStudentCourseResultHistory = (data) => {
  return service({
    url: '/studentResultAnalyse/getStudentCourseResultHistory',
    method: 'get',
    params: data
  })
}
