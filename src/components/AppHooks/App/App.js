import React, { useState, useEffect } from 'react';
import CreateContactsForm from "../CreateContactsForm/CreateContactsForm";
import ContactList from "../ContactList/ContactList";
import { uuid } from 'uuidv4';
import Filter from "../Filter/Filter";
import Section from "../Section/Section";
import styles from './App.module.css'


export default  function  App() {

    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState("");



    const addContacts  = (name, phone)=>{
        const newContact = {
            name,
            phone,
            id: uuid(),
        }


        setContacts(prevState => [...prevState, newContact]);

        console.log(contacts, "адд");
    }

    useEffect(()=>{

        const localContactsData =  JSON.parse(localStorage.getItem('contactsh'));
        console.log(localContactsData, 'зашли')
        localContactsData && setContacts(localContactsData);

    },[])

    useEffect(()=>{
        localStorage.setItem('contactsh', JSON.stringify(contacts));

    },[contacts])


    const removeContact = idx =>{
        setContacts(prevState => prevState.filter(contact => contact.id !== idx))
    }

    const setFilterContact = filterParam =>{
        setFilter(prevFilter => filterParam)
    }


    const showFilteredContacts = () =>{

        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));


    }



    return(
          <>
              <div className={styles.wrapSections}>
                  <h2>Hooks</h2>
                  <Section>
                      <h2>Phonebook</h2>
                      <CreateContactsForm onAddContacts={addContacts}/>
                  </Section>

                  {contacts.length>= 1 && (
                      <Section>
                          <h2>Contacts</h2>
                          {contacts.length> 1 && (<Filter onSetFilter={setFilterContact}/>)}
                          <ContactList listData={showFilteredContacts()} removeContact={removeContact} />
                      </Section>
                  )}
              </div>


          </>
      )

}

// export default class  App extends Component{
//
//     state = {
//         contacts: [],
//         filter: "",
//
//     }
//
//     componentDidMount() {
//         console.log('componentDidMount')
//         const contactsLocal = localStorage.getItem('contacts');
//
//         if(contactsLocal){
//             this.setState({
//                 contacts: JSON.parse(contactsLocal),
//             })
//         }
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         console.log('componentDidUpdate')
//         if (prevState.contacts !== this.state.contacts){
//             localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//         }
//
//     }
//
//
//     addContacts = (name, phone)=>{
//
//         this.setState(prevState=>({
//             contacts:[...prevState.contacts, {
//                 name,
//                 phone,
//                 id: uuid(),
//             } ]
//         }))
//     }
//
//     getContactData(){
//         return this.state.contacts;
//     }
//
//     removeContact = (taskId) =>{
//         this.setState(prevState=>({
//                 contacts:  prevState.contacts.filter(({id})=> id!==taskId)
//             }
//         ))
//     }
//
//     setFilterContact = (filter)=>{
//         this.setState({filter})
//     }
//
//     showFilteredContacts =() =>{
//         const { contacts, filter } = this.state;
//
//         return contacts.filter(contact=>contact.name.toLowerCase().includes(filter.toLowerCase()))
//     }
//
//
//
//     render() {
//
//       return(
//           <>
//               <div className={styles.wrapSections}>
//                   <h2>Hooks</h2>
//                   <Section>
//                       <h2>Phonebook</h2>
//                       <CreateContactsForm onAddContacts={this.addContacts}/>
//                   </Section>
//
//                   {this.state.contacts.length>= 1 && (
//                       <Section>
//                           <h2>Contacts</h2>
//                           {this.state.contacts.length> 1 && (<Filter onSetFilter={this.setFilterContact}/>)}
//                           <ContactList listData={this.showFilteredContacts()} removeContact={this.removeContact} />
//                       </Section>
//                   )}
//               </div>
//
//
//           </>
//       )
//     }
//
//
// }
