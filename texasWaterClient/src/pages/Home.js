import React, { Component } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import withStyles from "@material-ui/core/styles/withStyles";
import BidModal from "../components/BidModal";
import { connect } from "react-redux";
import { toggleBidModal } from "../redux/actions";

const styles = {
  containerModal: {
    display: "flex",
    flexDirection: "row",
  },
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeWell: null,
      wells: null,
      currentPrice: null,
      visible: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/wells")
      .then((res) => {
        console.log(res.data);
        this.setState({
          wells: res.data,
        });
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:9000/currentPrice")
      .then((res) => {
        console.log(res.data);
        this.setState({
          currentPrice: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  //Decides marker color
  getMarkerColor = (storage, capacity) => {
    if (storage / capacity >= 0.9) {
      return "blue";
    } else if (storage / capacity >= 0.8) {
      return "aqua";
    } else if (storage / capacity >= 0.7) {
      return "aquamarine";
    } else if (storage / capacity >= 0.6) {
      return "yellow";
    } else if (storage / capacity >= 0.5) {
      return "lemonchiffon";
    } else if (storage / capacity >= 0.4) {
      return "lightsalmon";
    } else if (storage / capacity >= 0.3) {
      return "lightcoral";
    } else if (storage / capacity >= 0.2) {
      return "lightsalmon";
    } else if (storage / capacity >= 0.1) {
      return "crimson";
    } else if (storage / capacity >= 0) {
      return "maroon";
    } else {
      return "grey";
    }
  };

  //send bid to db
  handleBid = () => {
    const stakeData = {
      email: this.props.user.user.email,
      wellName: this.state.activeWell.properties.full_name,
    };

    axios
      .post("http://localhost:9000/stake", stakeData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClick = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    const { classes } = this.props;
    //format to currency
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    //check if user holds stake in well
    let stakeCapacity = (name) => {
      if (name in this.props.user.user.stakes) {
        if (this.props.user.user.stakes[name][2] === true)
          return (
            <p style={{ marginTop: "-15px", color: "#66CDAA" }}>
              Your Stake:{" "}
              {(this.props.user.user.stakes[name][0] /
                this.state.activeWell.properties.conservation_storage) *
                100}
              %
            </p>
          );
      }
      return null;
    };

    let stakeValue = (name) => {
      if (name in this.props.user.user.stakes) {
        if (this.props.user.user.stakes[name][2] === true)
          return (
            <p style={{ marginTop: "-15px", color: "#66CDAA" }}>
              Your Stake:{" "}
              {formatter.format(
                this.state.currentPrice[0].currentPrice *
                  this.props.user.user.stakes[name][0]
              )}
            </p>
          );
      }
      return null;
    };

    //Creates points from GeoJson
    let WellsMarkup = this.state.wells
      ? this.state.wells.map((well) => (
          <CircleMarker
            key={well.properties.conservation_capacity}
            color={this.getMarkerColor(
              well.properties.conservation_storage,
              well.properties.conservation_capacity
            )}
            opacity={4}
            radius={8}
            weight={2}
            eventHandlers={{
              click: () => {
                this.setState({ activeWell: well });
              },
            }}
            center={[
              well.geometry.coordinates[1],
              well.geometry.coordinates[0],
            ]}
            onClick={() => {
              this.setState({
                activeWell: well,
              });
            }}
          ></CircleMarker>
        ))
      : null;

    //style based on bidModal
    let containerStyle = this.state.visible
      ? classes.containerModal
      : classes.containerNoModal;

    if (this.state.wells !== null)
      return (
        <div className={containerStyle}>
          <div style={{ flexGrow: 3 }}>
            <MapContainer
              center={[31.1352, -99.3351]}
              zoom={6}
              scrollWheelZoom={true}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {WellsMarkup}
              {this.state.activeWell && (
                <Popup
                  position={[
                    this.state.activeWell.geometry.coordinates[1],
                    this.state.activeWell.geometry.coordinates[0],
                  ]}
                  onClose={() => {
                    this.setState({
                      activeWell: null,
                    });
                  }}
                >
                  <div>
                    <h2>{this.state.activeWell.properties.full_name}</h2>
                    <p>
                      Capacity: {this.state.activeWell.properties.percent_full}%
                    </p>
                    {stakeCapacity(this.state.activeWell.properties.full_name)}
                    <p>
                      {formatter.format(
                        this.state.currentPrice[0].currentPrice *
                          this.state.activeWell.properties.conservation_storage
                      )}
                    </p>
                    {stakeValue(this.state.activeWell.properties.full_name)}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button onClick={this.handleClick}>Bid</button>
                  </div>
                </Popup>
              )}
            </MapContainer>
          </div>
          <div style={{ flexGrow: 1, borderLeft: "5px solid lightblue" }}>
            <BidModal
              visible={this.state.visible}
              well={this.state.activeWell}
            />
          </div>
        </div>
      );

    return null;
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapActionsToProps = {
  toggleBidModal,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Home));
