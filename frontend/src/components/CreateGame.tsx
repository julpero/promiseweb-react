import React from "react";
import { Form } from "react-final-form";

class CreateGame extends React.Component {
  handleSubmit = () => {

  }

  render() {
    return (
      <Form
        onSubmit={() => {}}
      >
        {() => (
          <form onSubmit={() => this.handleSubmit}>CreateGame</form>
        )}
      </Form>
    )
  }
}

export default CreateGame;
