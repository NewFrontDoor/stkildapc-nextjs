/** @jsx jsx */
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import MapOverlay from './map-overlay';

const homeSection = {
  position: 'relative',
  zIndex: '1',
  display: 'grid',
  gridAutoFlow: 'columns',
  gridTemplateColumns: ['1fr', '3fr 1fr 2fr'],
  gridTemplateRows: [null, '1fr'],
  height: [null, '550px'],
  color: 'text',
  backgroundColor: 'background'
};

const homeMapInner = {
  gridColumn: ['1', '1/1'],
  gridRow: ['1', '1/4'],
  height: ['300px', '550px']
};

const MapLayout = ({heading, actions, details, location}) => {
  const [width, setWidth] = useState(1000);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div sx={homeSection}>
      <div sx={homeMapInner}>
        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.GOOGLE_MAPS_API}
        >
          <GoogleMap
            mapContainerStyle={{
              height: '100%',
              width: '100%'
            }}
            zoom={16}
            center={
              width < 600
                ? {
                    lat: location.location.lat,
                    lng: location.location.lng
                  }
                : {
                    lat: location.latcentrepoint,
                    lng: location.longcentrepoint
                  }
            }
            options={{
              disableDefaultUI: true
            }}
          >
            <Marker
              position={{
                lat: location.latcentrepoint,
                lng: location.longcentrepoint
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>
      <MapOverlay
        heading={heading}
        details={details}
        actions={actions}
        lat={location.latcentrepoint}
        long={location.longcentrepoint}
      />
    </div>
  );
};

MapLayout.propTypes = {
  heading: PropTypes.string,
  details: PropTypes.array,
  location: PropTypes.object,
  actions: PropTypes.array
};

export default MapLayout;
