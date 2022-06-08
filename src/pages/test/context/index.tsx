import { View, Text } from '@tarojs/components';
import React, { useContext, useState } from 'react';
import { TestContext } from '@/context/test';
import { AtIcon, AtInput } from 'taro-ui';

type TestPageProps = {
  [key: string]: any;
};

const Operation = () => {
  const context = useContext(TestContext);

  const onNameChange = (val: string) => {
    console.log(val);
    context.setName(val);
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return val;
  };

  const onAgeChange = (val: number) => {
    console.log(val);
    context.setAge(val);
    // 在小程序中，如果想改变 value 的值，需要 `return value` 从而改变输入框的当前值
    return val;
  };

  return (
    <View>
      <View>
        <Text>输入name</Text>
        <AtInput
          name={context.name}
          value={context.name}
          onChange={onNameChange}
        />
      </View>
      <View>
        <Text>输入age</Text>
        <AtInput
          name={context.age.toString()}
          value={context.age.toString()}
          onChange={onAgeChange}
          type="number"
        />
      </View>
    </View>
  );
}

const Show = () => {
  const context = useContext(TestContext);

  return (
    <View>
      <AtIcon value="check" size='30' color='#F00'/>
      <View>
        <Text>来自context的name: {context.name}</Text>
      </View>
      <View>
        <Text>来自context的age: {context.age}</Text>
      </View>
    </View>
  );
};

const TestPage: React.FC<TestPageProps> = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(25);

  return (
    <TestContext.Provider
      value={{
        name,
        setName,
        age,
        setAge,
      }}
    >
      <Operation />
      <Show />
    </TestContext.Provider>
  );
};

export default TestPage;
