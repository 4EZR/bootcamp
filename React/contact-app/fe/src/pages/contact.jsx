import { useState, useEffect } from 'react';
import { ContactList } from '@/components/contact/contactList';
import { ContactFormDialog } from '@/components/contact/dialog';
import { DeleteContactDialog } from '@/components/contact/deleteDialog';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import contactService from '@/services/contactService';

export function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await contactService.getAllContacts();
      setContacts(data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedContact(null);
    setIsFormOpen(true);
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setIsDeleting(true);
  };

  const handleSave = async () => {
    setIsFormOpen(false);
    await fetchContacts();
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(false);
    await fetchContacts();
    setSelectedContact(null);
  };

  return (
    <div className='min-h-[76.9vh] 2xl:min-h-[81vh] p-4'>
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <Button onClick={handleCreate} className="mb-4">Create Contact</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <ContactList
            contacts={contacts}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        <div>
          {selectedContact && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Name: {selectedContact.name}</p>
                <p>Phone: {selectedContact.phone}</p>
                <p>Email: {selectedContact.email}</p>
                <div className="mt-4">
                  <Button onClick={() => handleEdit(selectedContact)} className="mr-2">Edit</Button>
                  <Button variant="destructive" onClick={() => handleDelete(selectedContact)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <ContactFormDialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        contact={selectedContact}
        onSave={handleSave}
      />
      <DeleteContactDialog
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        contactId={selectedContact?.id}
        onDelete={handleDeleteConfirm}
      />
    </div>
  );
}

export default ContactsPage;