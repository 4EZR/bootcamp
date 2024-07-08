import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import contactService from '@/services/contactService';

export function ContactForm({ contact, onSave, onCancel }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setPhone(contact.phone);
            setEmail(contact.email);
        }
    }, [contact]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (contact) {
                await contactService.updateContact(contact.id, { name, phone, email });
            } else {
                await contactService.createContact({ name, phone, email });
            }
            onSave();
        } catch (error) {
            console.error('Error saving contact:', error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{contact ? 'Edit Contact' : 'Create Contact'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="submit">{contact ? 'Update' : 'Create'}</Button>
                        <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}