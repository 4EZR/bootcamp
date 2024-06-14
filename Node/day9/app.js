const express = require('express');
const path = require('path');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const validator = require('validator');
const methodOverride = require('method-override');
const flash = require('req-flash');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(expressLayouts);
app.use(methodOverride('_method'));
app.set('layout', 'layouts/main');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: '123', resave: false, saveUninitialized: true }));
app.use(flash());

app.use(express.urlencoded({ extended: true }));

const dataFilePath = path.join(__dirname, 'data', 'data.json');

// Middleware to load data
const loadContactsData = (req, res, next) => {
    fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
        if (err) {
            return res.status(500).render('500', { data: { title: '500', message: 'Internal Server Error' } });
        }
        res.locals.contacts = JSON.parse(jsonData);
        next();
    });
};

const writeJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log('Operation successful.');
        return true;
    } catch (err) {
        console.error('Error writing to the file:', err);
        return false;
    }
};

const nameExists = (data, name) => {
    return data.some(item => item.name.toLowerCase() === name.toLowerCase());
};

const validateEmail = (email) => {
    return validator.isEmail(email);
};

const validatePhone = (phone) => {
    return validator.isMobilePhone(phone, 'id-ID');
};

const checkDataDir = () => {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

const readJsonFile = (filePath) => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
};

const saveContact = (contact) => {
    if (!validateEmail(contact.email)) {
        req.flash('error', 'Invalid email format');
        return false;
    }

    if (!validatePhone(contact.phone)) {
        req.flash('error', 'Invalid phone format');
        return false;
    }

    checkDataDir();
    const contacts = readJsonFile(dataFilePath);
    if (nameExists(contacts, contact.name)) {
        req.flash('error', `The name "${contact.name}" already exists.`);
        return false;
    }
  

    const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
    const newContact = { id: newId, ...contact };
    contacts.push(newContact);

    return writeJsonFile(dataFilePath, contacts);
};

// Route handlers
app.get('/', (req, res) => {
    const data = {
        title: 'Index',
        message: 'Ini Index',
    };
    res.render('index', { data });
});

app.get('/about', (req, res) => {
    const data = {
        title: 'About',
        message: 'Ini About',
    };
    res.render('about', { data });
});

app.get('/contact', loadContactsData, (req, res) => {
    const data = {
        title: 'Contact',
        message: 'Ini Contact',
        contact: res.locals.contacts,
    };
    res.render('contact', { data, messages: req.flash() });
});

app.get('/add-contact', (req, res) => {
    const data = {
        title: 'Contact',
        message: 'Add Contact',
    };
    res.render('form', { data });
});

app.post('/contact/add', (req, res) => {
    const newContact = { email: req.body.email, name: req.body.name, phone: req.body.phone };
    if (saveContact(newContact)) {
        req.flash('success', 'Contact added successfully');
        res.redirect('/contact');
    } else {
          res.redirect('/add-contact');
    }
});

app.delete('/delete-contact/:id', loadContactsData, (req, res) => {
    const contactId = parseInt(req.params.id, 10);
    const contacts = res.locals.contacts.filter(c => c.id !== contactId);

    if (writeJsonFile(dataFilePath, contacts)) {
        req.flash('success', `Contact with ID ${contactId} deleted successfully`);
    } else {
        req.flash('error', `Failed to delete contact with ID ${contactId}`);
    }
    res.redirect('/contact');
});

app.get('/edit-contact/:id', loadContactsData, (req, res) => {
    const id = parseInt(req.params.id, 10);
    const contact = res.locals.contacts.find(c => c.id === id);

    if (!contact) {
        const data = {
            title: '404',
            message: 'Contact not found',
        };
        return res.status(404).render('404', { data });
    }

    const data = {
        title: 'Contact',
        message: 'Edit Contact',
        contact: contact,
    };

    res.render('form', { data });
});

app.put('/contact/edit', loadContactsData, (req, res) => {
   
    const id = parseInt(req.body.id)
  
    const contacts = res.locals.contacts;
    const index = contacts.findIndex(c => c.id === id);

    if (index === -1) {
        req.flash('error', 'Contact not found');
        return res.redirect('/');
    }
  
    const updatedContact = {
        id: id,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    };

    // // if (!validateEmail(updatedContact.email) || !validatePhone(updatedContact.phone)) {
    // //     req.flash('error', 'Invalid email or phone format');
    // //     return res.redirect(`/edit-contact/${id}`);
    // // }

    contacts[index] = updatedContact;

    if (writeJsonFile(dataFilePath, contacts)) {
        req.flash('success', 'Contact updated successfully');
    } else {
        req.flash('error', 'Failed to update contact');
    }
    res.redirect('/contact');
});

app.get('/contact/:id', loadContactsData, (req, res) => {
    const id = parseInt(req.params.id, 10);
    const contact = res.locals.contacts.find(c => c.id === id);

    if (!contact) {
        const data = {
            title: '404',
            message: 'Contact not found',
        };
        return res.status(404).render('404', { data });
    }

    const data = {
        title: 'Contact Details',
        message: 'Contact Details',
        contact: contact,
    };
    res.render('contact-details', { data });
});

// 404 handler
app.use((req, res) => {
    const data = {
        title: '404',
        message: 'Page Not Found',
    };
    res.status(404).render('404', { data, layout: 'layouts/error' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});