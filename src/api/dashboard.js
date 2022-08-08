import service from '@/utils/request'

// 获取班级列表
export const getDashboardCensusNums = () => {
  return service({
    url: '/dashboard/getDashboardCensusNum',
    method: 'get'
  })
}
