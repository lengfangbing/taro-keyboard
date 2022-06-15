import { View, Text } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import { AtButton } from 'taro-ui';

type CloudFunctionPageProps = {
  [key: string]: any;
};

const CloudFunctionPage: React.FC<CloudFunctionPageProps> = () => {
  const [clickCount, setClickCount] = useState(1);

  const handleClick = () => setClickCount(prev => ++prev);

  useEffect(() => {
    (async () => {
      const res = await wx.cloud.callFunction({
        // 需调用的云函数名
        name: 'test',
        // 传给云函数的参数
        data: {
          a: 12,
          b: 19,
        }
      });
      console.log(res);
    })();
  }, []);

  return (
    <View>
      <Text>点击次数{clickCount}</Text>
      <AtButton onClick={handleClick}>点击</AtButton>
    </View>
  );
};

export default CloudFunctionPage;
