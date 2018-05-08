import React from "react";
import BakeForm from "./BakeForm";
import * as bakesServices from "../services/bakes.services";

class Bake extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bakes: [],
      formData: {}
    };
    this.clearForm = this.clearForm.bind(this);
    this.saveChange = this.saveChange.bind(this);
    this.deleteBake = this.deleteBake.bind(this);
  }

  componentDidMount() {
    bakesServices.readAll().then(data => {
      this.setState({ bakes: data });
    });
  }

  createBakesList(bakes) {
    return bakes.map(bake => {
      return (
        <li
          className={
            this.state.formData && this.state.formData._id === bake._id
              ? "list-group-item active"
              : "list-group-item"
          }
          key={bake._id}
          onClick={this.onSelect.bind(this, bake)}
        >
          {" "}
          {this.formatParamsDate(bake.bakeDate)}, {bake.recipe}
        </li>
      );
    });
  }

  onSelect(bake) {
    this.setState({ formData: bake });
  }

  formatParamsDate(iso) {
    let originalDate = new Date(iso);

    return originalDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  }

  clearForm() {
    this.setState({ formData: {} });
  }

  saveChange(item) {
    this.setState(prevState => {
      const exisitingItem = prevState.bakes.filter(bake => {
        return item._id === bake._id;
      });
      let updatedItems = [];
      if (exisitingItem && exisitingItem.length > 0) {
        updatedItems = prevState.bakes.map(bake => {
          return bake._id === item._id ? item : bake;
        });
      } else {
        updatedItems = prevState.bakes.concat(item);
      }

      return {
        bakes: updatedItems,
        formData: {}
      };
    });
  }

  deleteBake(id) {
    this.setState(prevState => {
      const filteredState = prevState.bakes.filter(bake => bake._id !== id);
      return {
        bakes: filteredState,
        formData: {}
      };
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row" style={{paddingTop: "20px"}}>
            <div className="col-sm-6 card">
             <div className="card-body">
             <h5 className="card-title text-center"></h5>
              <BakeForm
                formData={this.state.formData}
                clearForm={this.clearForm}
                updateList={this.saveChange}
                deleteBake={this.deleteBake}
              />

             </div>
            </div>
            <div className="col-sm-6 card">
              <div className="card-body">
              <div className="card-header text-center"> Recent Bakes</div>
              <ul className="list-group">
                {this.state.bakes.length > 1
                  ? this.createBakesList(this.state.bakes)
                  : null}
              </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Bake;
