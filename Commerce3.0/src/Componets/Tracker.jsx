import React from 'react';
import {
  LoadingOutlined,
  SmileOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Steps, Grid } from 'antd';

const { useBreakpoint } = Grid;

function Tracker({ st1, st2, st3, st4, st5 }) {
  const screens = useBreakpoint();

  // Shrink stepper for small screens
  const iconSize = screens.xs ? 18 : 24; // smaller icons on mobile
  const direction = screens.xs ? 'vertical' : 'horizontal';

  return (
    <div className="w-full">
      <Steps
        size={screens.xs ? 'small' : 'default'}
        direction={direction}
        items={[
          { title: 'Login', status: st1, icon: <UserOutlined style={{ fontSize: iconSize }} /> },
          { title: 'Shipping Details', status: st2, icon: <TruckOutlined style={{ fontSize: iconSize }} /> },
          { title: 'Order Summary', status: st3, icon: <ShoppingCartOutlined style={{ fontSize: iconSize }} /> },
          { title: 'Pay', status: st4, icon: <LoadingOutlined style={{ fontSize: iconSize }} /> },
          { title: 'Done', status: st5, icon: <SmileOutlined style={{ fontSize: iconSize }} /> },
        ]}
      />
    </div>
  );
}

export default Tracker;
