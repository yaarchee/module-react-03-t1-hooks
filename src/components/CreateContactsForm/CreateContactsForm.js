import React, { Component } from 'react';
import styles from "./CreateContactsForm.module.css"


export default  class CreateContactsForm extends  Component{

    state = {
        name : "",
        tel : "",

    }

    changeInputField =(e)=>{
        const { name, value } = e.target;
        this.setState({[name]: value});
    }

    submitForm = (e)=>{
        e.preventDefault()
        this.props.onAddContacts(this.state.name, this.state.tel);
        e.target.reset();
        this.setState({name: "", tel: ""});
        //this.props.onAddContacts(e.target.name.value, e.target.tel.value);
    }

    render() {
        return(
            <form onSubmit={this.submitForm} autoComplete='off' className={styles.contactForm} >
                <div className={styles.wrapLabels}>
                    <label >
                        Name
                        <input type="text" onChange={this.changeInputField} name="name"  required value={this.state.name}/>
                    </label>
                    <label >
                        Number
                        <input type="tel" onChange={this.changeInputField} name="tel"  required  pattern="[0-9]{5,10}" title="от 5 до 10 цифр" value={this.state.tel}/>
                    </label>
                </div>

                <button type="submit" >Add Contact</button>

            </form>
        )
    }
}