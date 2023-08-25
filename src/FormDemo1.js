import React, { Component } from 'react'


export default class FormDemo1 extends Component {
    state = {username:'', city:''}
    onChangeHandler = (event) => {
       // this.setState({userName:event.target.value})             //onChangeHandler inputunda herhangi bi değişiklik(yazma,silme) gerceklestiginde setState ayarlıyoruz. 

       let name = event.target.name;
       let value = event.target.value;

       this.setState({[name]:value})

    }
        


    onSubmitHandler = (event) => {
        event.preventDefault();
        alert( "User Name : "+this.state.userName + 
        " City : "+this.state.city);
        
       
 }
    // Verdiğimiz name="" ile state'deki değerin aynı olması gerekli !!
  render() {
    return (
      <div>
<form onSubmit={this.onSubmitHandler}>
    <h3>User Name</h3>
    <input name="userName" onChange={this.onChangeHandler} type="text"></input>       
    <h3>User Name is {this.state.userName}</h3>

    <h3>City</h3>
    <input  name="city" onChange={this.onChangeHandler} type="text"></input>
    <h3>City is {this.state.city}</h3>

    <button type="submit" className="btn-success" value="Save"> Save </button>
    
</form>

      </div>
    )
  }

}