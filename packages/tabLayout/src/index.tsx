import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';

import { Tabs } from 'antd';
const { TabPane } = Tabs;

interface Props {
  tabs: Object;
  defaultKey?: string;
}

const TabLayout = ({ tabs, defaultKey }: Props) => {
  const { pathname, query }: { pathname: string; query: { type?: string } } = useRouter();
  const [activeTab, setActiveTab] = useState(query?.type || defaultKey || '1');

  return (
    <>
      <Tabs
        defaultActiveKey={`${activeTab}`}
        onChange={(k) => {
          Router.push(`${pathname}?type=${k}`);
          setActiveTab(k);
        }}
      >
        {Object.keys(tabs).map((tab) => (
          <TabPane tab={tabs[tab].title} key={tab} />
        ))}
      </Tabs>
      {tabs[activeTab]?.child}
    </>
  );
};

export default TabLayout;
