import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from '../components/App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-4', name: 'John Smith', number: '145-965-985' },
      { id: 'id-3', name: 'Oscar White', number: '666-985-320' },
      { id: 'id-2', name: 'Alex Harrison', number: '741-962-526' },
      { id: 'id-1', name: 'Robert Myller', number: '400-913-995' },
    ],
    filter: '',
  };

  componentDidMount() {
    document.title = 'HW-2 Phonebook';

    // Load contact(s) from localStorage when we start the app
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
      console.log(
        'Contacts loaded from localStorage:',
        JSON.parse(storedContacts)
      );
    }
  }

  // Shows all keys from localStorage -   console.log(Object.keys(localStorage));
  // Displays all values from localStorage  -   console.log(Object.values(localStorage));
  // Clear data from localStorage -   localStorage.clear();

  // We save contacts in localStorage only if the status has changed
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // Add contact
  handleAddContact = contact => {
    const { contacts } = this.state;
    const { name } = contact;

    // Verify contact
    if (contacts.find(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      const updatedContacts = [...prevState.contacts, contact];
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      console.log('Contacts updated in localStorage:', updatedContacts);
      return { contacts: [...prevState.contacts, contact] };
    });
  };

  // Delete contact
  handleDeleteContact = id => {
    this.setState(prevState => {
      const updatedContacts = prevState.contacts.filter(
        contact => contact.id !== id
      );
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      console.log('Contacts updated in localStorage:', updatedContacts);
      return { contacts: updatedContacts };
    });
  };

  // Add filter
  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={css.section}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm onAddContact={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter onFilter={this.handleFilter} filter={this.state.filter} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
