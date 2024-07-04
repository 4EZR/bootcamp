const express = require('express');
const router = express.Router();
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

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// GET all contacts
router.get('/', asyncHandler(async (req, res) => {
    const contacts = await getAllContacts();
    res.json({ title: 'Contact', message: 'Contact List', contacts });
}));

// GET all contacts (duplicate route, consider removing)
router.get('/contact', asyncHandler(async (req, res) => {
    const contacts = await getAllContacts();
    res.json({ title: 'Contact', message: 'Contact List', contacts });
}));

// POST create new contact
router.post('/contact', asyncHandler(async (req, res) => {
    const { name, phone, email } = req.body;

    if (await countName(name) >= 1) {
        return res.status(400).json({ error: 'Name already exists' });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (!validatePhone(phone)) {
        return res.status(400).json({ error: 'Invalid phone format' });
    }

    await createContact(name, phone, email);
    res.status(201).json({ message: 'Contact added successfully' });
}));

// DELETE contact by ID
router.delete('/contact/:id', asyncHandler(async (req, res) => {
    const contactId = parseInt(req.params.id, 10);
    await deleteContact(contactId);
    res.json({ message: `Contact with ID ${contactId} deleted successfully` });
}));

// PUT update contact
router.put('/contact/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body;

    if (!validateEmail(email) || !validatePhone(phone)) {
        return res.status(400).json({ error: 'Invalid email or phone format' });
    }

    await updateContact(id, name, phone, email);
    res.json({ message: 'Contact updated successfully' });
}));

// GET contact by ID
router.get('/contact/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const contact = await getContactById(id);

    if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ title: 'Contact Details', message: 'Contact Details', contact });
}));

module.exports = router;