import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import alerify from "alertifyjs";

export default class FormDemo2 extends Component {
  state = { email: "", password: "", city: "", description: "" };

  handleChange = (event) => {
    //Onchange eventi
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    //Onsubmit eventi
    event.preventDefault();
    alerify.success(this.state.email + "added to db");
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            {" "}
            <Label for="email" > Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            {" "}
            <Label for="email"> Password</Label>
            <Input
              type="password"
              name="pasword"
              id="password"
              placeholder="Enter password"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            {" "}
            <Label for="description"> Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Enter description"
              onChange={this.handleChange}
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="select"
              name="city"
              id="city"
              onChange={this.handleChange}
            >
              <option>Antalya</option>
              <option>Ankara</option>
              <option>İstanbul</option>
              <option>İzmir</option>
              <option>Adana</option>
            </Input>
          </FormGroup>
          <Button type="submit"> Save </Button>
        </Form>
      </div>
    );
  }
}
