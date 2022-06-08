import { View, Text } from '@tarojs/components';
import React, { useState } from 'react';
import { AtButton } from 'taro-ui';

type TestPageProps = {
  [key: string]: any;
};

const TestPage: React.FC<TestPageProps> = () => {
  const [clickCount, setClickCount] = useState(1);

  const handleClick = () => setClickCount(prev => ++prev);

  return (
    <View>
      <Text>点击次数{clickCount}</Text>
      <AtButton onClick={handleClick}>点击</AtButton>
    </View>
  );
};

export default TestPage;
