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
  updateFruit = (frt) => {
    const reqBody = {
      fruits_name: frt.name,
      fruits_image: frt.image,
      fruits_price: frt.price,
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
      })
      .catch(() => alert("data was not updated"));
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
                    onClick={() => this.updateFruit(frt._id)}
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
