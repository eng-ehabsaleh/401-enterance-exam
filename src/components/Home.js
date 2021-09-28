import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { withAuth0 } from "@auth0/auth0-react";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fruitsArr: [],
      favArr: [],
    };
  }
  handelCreatFav = (fruit) => {
    const reqBody = {
      fruits_name: fruit.name,
      fruits_image: fruit.image,
      fruits_price: fruit.price,
      email: this.props.auth0.user.email,
    };
    axios.post(`${process.env.REACT_APP_SERVER}/fav`, reqBody);
    //   .then((createdFrt) => {
    //     this.state.favArr.push(createdFrt.data);
    //     // this.setState({ fruitsArr: this.state.fruitsArr });
    //   })
    //   .catch(() => {
    //     alert("data was not creatd");
    //   });
  };
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER}/glopalFav`)
      .then((res) => {
        this.setState({ fruitsArr: res.data });
      })
      .catch(() => alert("data was not recieved"));
  }
  render() {
    console.log(this.state.fruitsArr);

    return (
      <>
        <FavFruit favArr={this.state.favArr} />
        {this.state.fruitsArr.length > 0 && (
          <>
            {this.state.fruitsArr.map((frt) => {
              return (
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={frt.image} />
                  <Card.Body>
                    <Card.Title>{frt.name}</Card.Title>
                    <Card.Text>{frt.price}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => this.handelCreatFav(frt)}
                    >
                      Add-To-Fav
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </>
        )}
      </>
    );
  }
}

export default withAuth0(Home);
