import { View, Text } from '@tarojs/components';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import useDebounce from 'ahooks/lib/useDebounceFn'
import classNames from 'classnames';
import { AtFloatLayout, AtIcon, AtButton, AtSearchBar } from 'taro-ui';
import { is } from '../../utils/is';

import styles from './index.less';

export enum Order {
  Up = 'Up',
  Down = 'Down'
}

export type FilterCheckedItemProps = PropsWithChildren<{
  checked?: boolean;
  onChange?(checked: boolean): void;
}>;

export function FilterCheckedItem({
  checked,
  onChange,
  children
}: FilterCheckedItemProps) {
  const [_checked, setChecked] = useState(false);
  const mergeClassName = useMemo(() => classNames({
    [styles.filterBooleanItem]: true,
    [styles.active]: _checked
  }), [_checked]);

  const onChildrenClick = () => {
    const newChecked = !_checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  useEffect(() => {
    if (is.boolean(checked)) {
      setChecked(checked);
    }
  }, [checked]);

  return (
    <View className={mergeClassName} onClick={onChildrenClick}>
      {children}
    </View>
  );
}

export type FilterOrderItemProps = PropsWithChildren<{
  order?: Order;
  onChange?(order?: Order): void;
}>;

export function FilterOrderItem({
  order,
  children,
  onChange,
}: FilterOrderItemProps) {
  const [_order, setOrder] = useState<Order>();
  // 判断状态并根据状态设置样式
  const isDown = _order === Order.Down;
  const isUp = _order === Order.Up;
  const upColor = isUp ? '#6190e8' : '#3F536E';
  const downColor = isDown ? '#6190e8' : '#3F536E';

  const titleClassName = useMemo(() => classNames({
    [styles.title]: true,
    [styles.active]: !is.nil(_order)
  }), [_order]);

  const { run } = useDebounce(() => {
    // order的切换，需要防抖
    const newOrder = (() => {
      switch (_order) {
        case Order.Up: {
          return undefined;
        }
        case Order.Down: {
          return Order.Up;
        }
        default: return Order.Down;
      }
    })();
    setOrder(newOrder);
    if (onChange) {
      onChange(newOrder);
    }
  }, {
    wait: 400
  });

  useEffect(() => {
    setOrder(order);
  }, [order]);

  return (
    <View className={styles.filterOrderItem} onClick={run}>
      <Text className={titleClassName}>{children}</Text>
      <View className={styles.icons}>
        <AtIcon value="chevron-up" className={styles.icon} size={14} color={upColor} />
        <AtIcon value="chevron-down" className={styles.icon} size={14} color={downColor} />
      </View>
    </View>
  );
}

export type FilterLayoutProps = PropsWithChildren<{
  hasValue: boolean; // 是否有值，主要用于样式展示
  title: React.ReactNode;  // 展示的标题，可只传字符串，样式由内部控制
  layoutTitle?: string;
  open?: boolean;
  onCancel?(): void; // 重置回调
  onConfirm?(): Promise<void>; // 确认回调
}>;

export function FilterLayout({
  hasValue,
  open,
  title,
  layoutTitle,
  onConfirm,
  onCancel,
  children,
}: FilterLayoutProps) {
  const [_open, setOpen] = useState(false);
  const buttonClassName = useMemo(() => classNames({
    [styles.button]: true,
    [styles.active]: hasValue
  }), [hasValue]);

  const onSubmit = async () => {
    setOpen(false);
    if (onConfirm) {
      await onConfirm();
    }
  };

  useEffect(() => {
    setOpen(Boolean(open));
  }, [open]);

  return (
    <View className={styles.filterLayout}>
      <AtButton className={buttonClassName} size="small" type="secondary">{title}</AtButton>
      <AtFloatLayout title={layoutTitle || '筛选'} isOpened={_open}>
        <View className={styles.layout}>
          {children}
          <View className={styles.operation}>
            <AtButton className={styles.cancel} type="secondary" onClick={onCancel}>重置</AtButton>
            <AtButton className={styles.confirm} type="secondary" onClick={onSubmit}>确认</AtButton>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  );
}

export type ListStickyFilterProps = PropsWithChildren<{
  onSearch(search: string): Promise<void>;
}>;

export function ListStickyFilter({
  onSearch,
  children
}: ListStickyFilterProps) {
  const [searchValue, setSearchValue] = useState("");

  const onSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const { run } = useDebounce( async () => {
    await onSearch(searchValue);
  }, {
    wait: 400
  });

  return (
    <View className={styles.listStickyFilter}>
      <AtSearchBar
        value={searchValue}
        onChange={onSearchChange}
        onActionClick={run}
        onConfirm={run}
        placeholder="搜索"
      />
      {children}
    </View>
  );
}
