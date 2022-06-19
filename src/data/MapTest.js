import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat:props.latset , lng: props.lngset }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.latset, lng: props.lngset }} onClick={props.onMarkerClick} />}
    </GoogleMap>
)

export class MapTest extends React.PureComponent {

    lat =  parseInt(this.props.lat)
    lng =  parseInt(this.props.lng)
    state = {
        isMarkerShown: false,
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    render() {
        return (
            <MyMapComponent
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                latset={parseFloat(this.props.lat)}
                lngset={parseFloat(this.props.lng)}
            />
        )
    }
}
/* API : AIzaSyARo5mYXG_zRabCPiqtzW3RPCGw5LdSoUw*/