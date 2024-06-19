const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const validator = require('validator');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser'); 

const { Pool } = require('pg');

// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'contacts',
    password: 'admin',
    port: 5432,
});

const app = express();
const port = 3000;

// Middleware
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.set('layout', 'layouts/main');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Add cookie-parser and express-session middleware
app.use(cookieParser());
app.use(session({
    secret: 'mysecretkey',
    saveUninitialized: true,
    resave: true,
}));

// Configure flash middleware
app.use(flash());

app.use(express.urlencoded({ extended: true }));

// PostgreSQL Functions
const getAllContacts = async () => {
    const result = await pool.query('SELECT * FROM contact');
    return result.rows;
};

const getContactById = async (id) => {
    const result = await pool.query('SELECT * FROM contact WHERE id = $1', [id]);
    return result.rows[0];
};

const createContact = async (name, phone, email) => {
    const result = await pool.query(
        'INSERT INTO contact (name, phone, email) VALUES ($1, $2, $3) RETURNING *',
        [name, phone, email]
    );
    return result.rows[0];
};

const updateContact = async (id, name, phone, email) => {
    const result = await pool.query(
        'UPDATE contact SET name = $1, phone = $2, email = $3 WHERE id = $4 RETURNING *',
        [name, phone, email, id]
    );
    return result.rows[0];
};


const deleteContact = async (id) => {
    await pool.query('DELETE FROM contact WHERE id = $1', [id]);
};

const loadContactsData = async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        res.locals.contacts = contacts;
    } catch (error) {
        return res.status(500).render('500', { data: { title: '500', message: 'Internal Server Error' } });
    }
    next();
};

// Validation functions
const validateEmail = (email) => {
    return validator.isEmail(email);
};

const validatePhone = (phone) => {
    return validator.isMobilePhone(phone, 'id-ID');
};

// Routes
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

app.post('/contact/add', async (req, res) => {
    const { name, phone, email } = req.body;

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

app.delete('/delete-contact/:id', async (req, res) => {
    const contactId = parseInt(req.params.id, 10);

    try {
        await deleteContact(contactId);
        req.flash('success', `Contact with ID ${contactId} deleted successfully`);
    } catch (error) {
        req.flash('error', `Failed to delete contact with ID ${contactId}`);
    }
    res.redirect('/contact');
});

app.get('/edit-contact/:id',  async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const contact = await getContactById(id);

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
            messages: req.flash()
        };
    
        res.render('form', { data });
    } catch (error) {
        res.status(500).render('500', { data: { title: '500', message: 'Internal Server Error' } });
    }

 


});

app.put('/contact/edit', async (req, res) => {
    const { id, name, phone, email } = req.body;

    console.log(`Editing contact with ID: ${id}`);

    
    if (!validateEmail(email) || !validatePhone(phone)) {
        console.log('Invalid email or phone format');
        req.flash('error', 'Invalid email or phone format');
        return res.redirect(`/edit-contact/${id}`);
    }

    try {
        // Update contact
        await updateContact(id, name, phone, email);
        console.log(`Contact with ID ${id} updated successfully`);
        req.flash('success', 'Contact updated successfully');
    } catch (error) {
        console.error(`Failed to update contact with ID ${id}:`, error);
        req.flash('error', 'Failed to update contact');
    }
    res.redirect('/contact');
});

app.get('/contact/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const contact = await getContactById(id);

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
    } catch (error) {
        res.status(500).render('500', { data: { title: '500', message: 'Internal Server Error' } });
    }
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
