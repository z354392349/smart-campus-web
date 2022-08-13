import service from '@/utils/request'

// 获取平均学习成绩
export const getGradeAverageResult = (data) => {
  return service({
    url: '/gradeResultAnalyse/getGradeAverageResult',
    method: 'get',
    params: data
  })
}

// 获取年级考试通过率
export const getGradePassPercent = (data) => {
  return service({
    url: '/gradeResultAnalyse/getGradePassPercent',
    method: 'get',
    params: data
  })
}
// 获取年级考试通过率
export const getGradeAverageResultHistory = (data) => {
  return service({
    url: '/gradeResultAnalyse/getGradeAverageResultHistory',
    method: 'get',
    params: data
  })
}
// 获取年级科目平均成绩
export const getGradeCourseAverageResultHistory = (data) => {
  return service({
    url: '/gradeResultAnalyse/getGradeCourseAverageResultHistory',
    method: 'get',
    params: data
  })
}
