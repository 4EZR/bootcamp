const express = require('express');
const {
    getAllContacts,
    getContactById,
    countName,
    createContact,
    updateContact,
    deleteContact,
    validateEmail,
    validatePhone
} = require('../controllers/contactController');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { data: { title: 'Index', message: 'Ini Index' } });
});

router.get('/about', (req, res) => {
    res.render('about', { data: { title: 'About', message: 'Ini About' } });
});

router.get('/contact', async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.render('contact', { data: { title: 'Contact', message: 'Ini Contact', contact: contacts }, messages: req.flash('success') });
    } catch (error) {
        res.status(500).render('500', { data: { title: '500', message: 'Internal Server Error' } });
    }
});

router.get('/add-contact', (req, res) => {
    res.render('form', { data: { title: 'Contact', message: 'Add Contact' }, messages: req.flash('error') });
});

router.post('/contact/add', async (req, res) => {
    const { name, phone, email } = req.body;

    if (name) {
        const nameCount = await countName(name);
        if (nameCount > 1) {
            req.flash('error', 'Name already exists');
            return res.redirect(`/add-contact`);
        }
    }
    if (!validateEmail(email)) {
        req.flash('error', 'Invalid email format');
        return res.redirect('/add-contact');
    }

    if (!validatePhone(phone)) {
        req.flash('error', 'Invalid phone format');
        return res.redirect('/add-contact');
    }

    try {
        await createContact(name, phone, email);
        req.flash('success', 'Contact added successfully');
        res.redirect('/contact');
    } catch (error) {
        req.flash('error', 'Failed to add contact');
        res.redirect('/add-contact');
    }
});

router.delete('/delete-contact/:id', async (req, res) => {
    const contactId = parseInt(req.params.id, 10);

    try {
        await deleteContact(contactId);
        req.flash('success', `Contact with ID ${contactId} deleted successfully`);
    } catch (error) {
        req.flash('error', `Failed to delete contact with ID ${contactId}`);
    }
    res.redirect('/contact');
});

router.get('/edit-contact/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const contact = await getContactById(id);

        if (!contact) {
            return res.status(404).render('404', { data: { title: '404', message: 'Contact not found' } });
        }

        res.render('form', { data: { title: 'Contact', message: 'Edit Contact', contact }, messages: req.flash('error') });
    } catch (error) {
        res.status(500).render('500', { data: { title: '500', message: 'Internal Server Error' } });
    }
});

router.put('/contact/edit', async (req, res) => {
    const { id, name, phone, email } = req.body;

    if (!validateEmail(email) || !validatePhone(phone)) {
        req.flash('error', 'Invalid email or phone format');
        return res.redirect(`/edit-contact/${id}`);
    }

    try {
        await updateContact(id, name, phone, email);
        req.flash('success', 'Contact updated successfully');
    } catch (error) {
        req.flash('error', 'Failed to update contact');
    }
    res.redirect('/contact');
});

router.get('/contact/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const contact = await getContactById(id);

        if (!contact) {
            return res.status(404).render('404', { data: { title: '404', message: 'Contact not found' } });
        }

        res.render('contact-details', { data: { title: 'Contact Details', message: 'Contact Details', contact } });
    } catch (error) {
        res.status(500).render('500', { data: { title: '500', message: 'Internal Server Error' } });
    }
});

module.exports = router;
