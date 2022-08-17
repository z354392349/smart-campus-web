import service from '@/utils/request'

// 获取平均学习成绩
export const getClassTotalResult = (data) => {
  return service({
    url: '/classResultAnalyse/getClassTotalResult',
    method: 'get',
    params: data
  })
}
// 获取班级通过率
export const getClassPassPercent = (data) => {
  return service({
    url: '/classResultAnalyse/getClassPassPercent',
    method: 'get',
    params: data
  })
}
// 获取班级下，学生考试总成绩-历史
export const getClassToTalResultHistory = (data) => {
  return service({
    url: '/classResultAnalyse/getClassToTalResultHistory',
    method: 'get',
    params: data
  })
}

// 获取班级下，学生考试单科成绩-历史
export const getClassCourseResultHistory = (data) => {
  return service({
    url: '/classResultAnalyse/getClassCourseResultHistory',
    method: 'get',
    params: data
  })
}
