import React from 'react';
import dynamic from 'next/dynamic';

const MarkersMap = dynamic(() => import('../../component/MyMap.js'), {
  ssr: false,
});

function Index() {
  return <MarkersMap/>;
}

export default Index;
