// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
/**
 * 一个云函数实例，需要exports.main
 * @param event - 传入的参数
 * @param context - 上下文，暂未发现其用途
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event);
  console.log(context);
  const logger = cloud.logger();

  logger.info({
    name: 'test',
    date: Date.now()
  });

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        event,
        openid: wxContext.OPENID,
        appid: wxContext.APPID,
        unionid: wxContext.UNIONID,
      })
    }, 3000);
  });
}
