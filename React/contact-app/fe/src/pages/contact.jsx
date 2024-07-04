import { useState } from 'react';
import { ContactList } from '@/components/contact/contactList';

export function ContactsPage() {

    // Add handlers for viewing details, editing, deleting, etc.

    return (
        <div className='min-h-[76.9vh] 2xl:min-h-[81vh]'>
            <h1>Contacts</h1>
            <ContactList

            />
           
        </div>
    );
}export default ContactsPage;