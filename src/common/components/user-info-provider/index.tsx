import Taro from '@tarojs/taro';
import { useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { userInfoAtom } from '../../store/atoms/user-info';
import { UserInfo } from '../../types/user-info';
import { callFunction } from '../../utils/call-function';

type UserInfoProviderProps = React.PropsWithChildren<{

}>;

function UserInfoProvider ({
  children
}: UserInfoProviderProps) {
  const setUserInfo = useSetAtom(userInfoAtom);

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await Taro.getUserInfo();
        const res = await callFunction<{ userInfo?: UserInfo }>({
          name: 'login',
          data: {
            test: 'login',
            cloudData: Taro.cloud.CloudID(userInfo.cloudID || ""),
          }
        });
        if (res && res.userInfo) {
          setUserInfo(res.userInfo);
        }
      } catch (e) {
        Taro.showToast({
          title: '获取用户信息失败',
        });
      }
    })();
  }, []);

  return (
    <>
      {children}
    </>
  );
}

export default UserInfoProvider;
