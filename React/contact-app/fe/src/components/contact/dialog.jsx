import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContactForm } from './contactForm';

export function ContactFormDialog({ isOpen, onClose, contact, onSave }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{contact ? 'Edit Contact' : 'Create Contact'}</DialogTitle>
                </DialogHeader>
                <ContactForm contact={contact} onSave={onSave} onCancel={onClose} />
            </DialogContent>
        </Dialog>
    );
}