import React, { Component } from "react";
import CreateContactsForm from "../CreateContactsForm/CreateContactsForm";
import ContactList from "../ContactList/ContactList";
import { uuid } from "uuidv4";
import Filter from "../Filter/Filter";
import Section from "../Section/Section";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    console.log("componentDidMount");
    const contactsLocal = localStorage.getItem("contacts");

    if (contactsLocal) {
      this.setState({
        contacts: JSON.parse(contactsLocal),
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContacts = (name, phone) => {
    this.setState((prevState) => ({
      contacts: [
        ...prevState.contacts,
        {
          name,
          phone,
          id: uuid(),
        },
      ],
    }));
  };

  getContactData() {
    return this.state.contacts;
  }

  removeContact = (taskId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(({ id }) => id !== taskId),
    }));
  };

  setFilterContact = (filter) => {
    this.setState({ filter });
  };

  showFilteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <>
        <Section>
          <h2>Phonebook</h2>
          <CreateContactsForm onAddContacts={this.addContacts} />
        </Section>

        {this.state.contacts.length >= 1 && (
          <Section>
            <h2>Contacts</h2>
            {this.state.contacts.length > 1 && (
              <Filter onSetFilter={this.setFilterContact} />
            )}
            <ContactList
              listData={this.showFilteredContacts()}
              removeContact={this.removeContact}
            />
          </Section>
        )}
      </>
    );
  }
}
