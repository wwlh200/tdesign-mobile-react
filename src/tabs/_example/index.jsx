import React from 'react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import Base from './base';
import Horizontal from './horizontal';
import Scroll from './scroll';
import Vertical from './vetical';
import Size from './size';
import NoLine from './noline';
import Bottom from './bottom';
import './style.less';

export default function () {
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Tabs 选项卡" summary="用于切换不同场景" />
      <Base />
      <Scroll></Scroll>
      <NoLine></NoLine>
      <Horizontal></Horizontal>
      <Vertical></Vertical>
      <Bottom></Bottom>
      <Size></Size>
    </div>
  );
}
