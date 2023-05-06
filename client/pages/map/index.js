import React,{useState} from 'react';
import dynamic from 'next/dynamic';

const MarkersMap = dynamic(() => import('../../component/MyMap.js'), {
  ssr: false,
});

function Index() {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMarkerPositionChange = (position) => {
    setMarkerPosition(position);
  };
  // return <MarkersMap/>;
  return (
    <div>
      <MarkersMap onMarkerPositionChange={handleMarkerPositionChange} />
      {markerPosition && (
        <p>
          Marker Position: {markerPosition[0]}, {markerPosition[1]}
        </p>
      )}
    </div>
  );

}

export default Index;
