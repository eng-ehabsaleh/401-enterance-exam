import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
withAuth0;
class FavFruit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favArr: [],
      showUpdateModalse: false,
      selectedFruit: {},
    };
  }
  handeldelet = (frtId) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER}/fav/${frtId}`)
      .then((deletedFrt) => {
        if (deletedFrt.data.deletedCount === 1) {
          const newArr = this.state.favArr.filter(
            (fruit) => fruit._id !== frtId
          );
          this.setState({ favArr: newArr });
        }
      })
      .catch(() => alert("fruit was not deleted"));
  };
  updateFruit = (e) => {
    //sadly  icould not add the name attribute to the form controll
    const reqBody = {
      fruits_name: e.target.name.value,
      fruits_image: e.target.name.value,
      fruits_price: e.target.name.value,
      email: this.props.auth0.user.email,
    };
    axios
      .put(`${process.env.REACT_APP_SERVER}/fav/${frt._id}`, reqBody)
      .then((updated) => {
        const newArr = this.state.favArr.map((ele) => {
          if (ele._id == updated._id) {
            return ele;
          }
          return ele;
        });
        this.setState({ favArr: newArr });
        this.handelDisplayUpdateModal;
      })
      .catch(() => alert("data was not updated"));
  };
  handelDisplayUpdateModal = (fruitObj) => {
    this.setState({
      showUpdateModalse: !this.state.showUpdateModalse,
      selectedFruit: fruitObj,
    });
  };
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER}/fav`)
      .then((favData) => {
        this.setState({ favArr: favData.data });
      })
      .catch(() => alert("faveriote data was not recieved"));
  }
  render() {
    return (
      <>
        <h1>My Favorite Fruits</h1>
        {this.state.showUpdateModalse && (
          <UpdateModal
            updateFruit={this.updateFruit}
            show={this.state.showUpdateModalse}
            handelDisplayUpdateModal={this.handelDisplayUpdateModal}
          />
        )}
        <>
          {this.state.favArr.map((frt) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={frt.image} />
                <Card.Body>
                  <Card.Title>{frt.name}</Card.Title>
                  <Card.Text>{frt.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => this.handelDisplayUpdateModal(frt)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => this.handeldelet(frt)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </>
      </>
    );
  }
}

export default withAuth0(FavFruit);
