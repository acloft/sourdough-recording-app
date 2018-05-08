import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import * as bakesServices from "../services/bakes.services";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

class BakeForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      recipe: "",
      bakeDate: moment(),
      hydration: "",
      rating: "",
      notes: ""
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.submitBread = this.submitBread.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.convertPropstoFormData = this.convertPropstoFormData.bind(this)
    this.clearForm = this.clearForm.bind(this)
    this.deleteBake = this.deleteBake.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
        this.convertPropstoFormData(nextProps.formData)
    }
  }

  convertPropstoFormData(formData){
    this.setState({
      _id: formData._id || '',
      recipe: formData.recipe || '',
      bakeDate: moment(formData.bakeDate) || moment(),
      hydration: formData.hydration || '',
      rating: formData.rating || '',
      notes: formData.notes || '',
    });
  }

  onDateChange(date) {
    this.setState({ date: date });
  }

  onValueChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  submitBread() {
    const bake = {
      bakeDate: this.state.bakeDate._d,
      recipe: this.state.recipe,
      hydration: this.state.hydration,
      rating: this.state.rating,
      notes: this.state.notes
    };
    if(this.state._id){
      bake._id = this.state._id
      bakesServices.update(bake)
      .then(data=> {
        this.props.updateList(bake);
      })
      .catch(err=>{
        console.log(err)
      })
    }
    else{
      bakesServices
        .create(bake)
        .then(data => {
          bake._id = data
          this.props.updateList(bake);
        })
        .catch(err => {});
    }
    
  }
  clearForm(){
    this.props.clearForm()
  }

  deleteBake(){
    if(this.state._id){
      bakesServices.deleteBake(this.state._id)
      .then(()=>{
        //delete from list
        this.props.deleteBake(this.state._id)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
  render() {
    return (
      <React.Fragment>

          <form>
            <label>Date:</label>
            <DatePicker
              className="form-control"
              selected={this.state.bakeDate}
              onChange={this.onDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="LLL"
              timeCaption="time"
            />
            <label>Recipe Name:</label>
            <input
              className="form-control"
              value={this.state.recipe}
              name="recipe"
              onChange={this.onValueChange}
            />
            <label>Hydration:</label>
            <input
              className="form-control"
              value={this.state.hydration}
              name="hydration"
              onChange={this.onValueChange}
            />
            <label>Rating:</label>
            <input
              className="form-control"
              value={this.state.rating}
              name="rating"
              onChange={this.onValueChange}
            />
            <label>Notes:</label>
            <textarea
              className="form-control"
              value={this.state.notes}
              name="notes"
              onChange={this.onValueChange}
            />
          </form>
          <br/>
        <div className="btn-group">
        <button className="btn btn-danger" onClick={this.deleteBake}>
            Delete
          </button>
          <button className="btn btn-default" onClick={this.clearForm}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={this.submitBread}>
           {this.state._id ? 'Update' : 'Create'}
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default BakeForm;
