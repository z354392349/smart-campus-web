import service from '@/utils/request'

// 创建通行记录
export const createCarAccesss = (data) => {
  return service({
    url: '/carAccess/createCarAccess',
    method: 'post',
    data
  })
}

// 获取通行记录
export const getCarAccessList = (data) => {
  return service({
    url: '/carAccess/getCarAccessList',
    method: 'get',
    params: data
  })
}
