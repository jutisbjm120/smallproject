const routes=require('./router');
export function push(name,data={}){
  const querystr=Object.keys(data).map(n=>`${n}=${data[n]}`).join('&');
  wx.navigateTo({
    url: routes[name]+'?'+querystr
  })
}