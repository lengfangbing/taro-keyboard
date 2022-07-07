import Taro from '@tarojs/taro';

export const callFunction = async <T = any>(params: Parameters<typeof Taro.cloud.callFunction>[0]) => {
  try {
    return (await Taro.cloud.callFunction(params)).result as T;
  } catch (e) {
    Taro.showToast({
      title: '调用接口出错'
    });
    return null;
  }
};
