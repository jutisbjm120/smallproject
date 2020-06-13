import Http from './Http'
//首页加载加载商品列表
export function getIndexlistInfo(param){
  return Http.request('/getIndexInfo',param)
}
//加载综合排序列表
export function getoverall(){
  return Http.request('/postshowoverlist');
}
//加载首页筛选列表
export function getfilterlist(){
  return Http.request('/getfilterlist')
}
//加载商品列表
export function productlistpost(param){
  return Http.request('/productlist',param,'POST')
}
//获取评价列表
export function getdistancegget(param){
  return Http.request('/getdistanceg',param,'POST')
}