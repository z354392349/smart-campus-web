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
