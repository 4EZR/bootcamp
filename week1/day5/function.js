const fs = require('fs');
const path = require('path');
const validator = require('validator');

// Define the data directory and file path
const dataDir = path.join(__dirname, 'data');
const dataFilePath = path.join(dataDir, 'data.json');

const checkDataDir = () => {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
};

const readJsonFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            return fileData ? JSON.parse(fileData) : [];
        } else {
            console.log('File does not exist.');
        }
    } catch (err) {
        console.error('Error reading the file:', err);
    }
    return [];
};

const writeJsonFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log('Operation successful.');
    } catch (err) {
        console.error('Error writing to the file:', err);
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


const saveContact = (contact) => {
    if (!validateEmail(contact.email)) {
        console.log('Invalid email format.');
        return;
    }

    if (!validatePhone(contact.phone)) {
        console.log('Invalid phone format.');
        return;
    }

    checkDataDir();
    const contacts = readJsonFile(dataFilePath);
    if (nameExists(contacts, contact.name)) {
        console.log(`The name "${contact.name}" already exists.`);
        return;
    }

    contacts.push(contact);
    writeJsonFile(dataFilePath, contacts);
};

const deleteContact = (name) => {
    const contacts = readJsonFile(dataFilePath);
    const newContacts = contacts.filter(contact => contact.name.toLowerCase() !== name.toLowerCase());

    if (newContacts.length === contacts.length) {
        console.log(`Contact with name "${name}" not found.`);
        return;
    }

    writeJsonFile(dataFilePath, newContacts);
};

const listContacts = () => {
    const contacts = readJsonFile(dataFilePath);
    if (contacts.length === 0) {
        console.log('No contacts found.');
        return;
    }
    console.log('Contact List:');
    contacts.forEach((contact, index) => {
        console.log(`${index + 1}. Name: ${contact.name}, Email: ${contact.email}, Phone: ${contact.phone}`);
    });
};

const contactDetail = (name) => {
    const contacts = readJsonFile(dataFilePath);
    const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (!contact) {
        console.log(`Contact with name "${name}" not found.`);
        return;
    }
    console.log(`Contact Details - Name: ${contact.name}, Email: ${contact.email}, Phone: ${contact.phone}`);
};

const updateContact = (name, newContact) => {
    const contacts = readJsonFile(dataFilePath);
    const contactIndex = contacts.findIndex(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (contactIndex === -1) {
        console.log(`Contact with name "${name}" not found.`);
        return;
    }

    if (newContact.email && !validateEmail(newContact.email)) {
        console.log('Invalid email format.');
        return;
    }

    if (newContact.phone && !validatePhone(newContact.phone)) {
        console.log('Invalid phone format.');
        return;
    }
    const existingContact = contacts[contactIndex];
    const updatedContact = {
        name: newContact.name || existingContact.name,
        email: newContact.email || existingContact.email,
        phone: newContact.phone || existingContact.phone
    };
    contacts[contactIndex] = updatedContact;
    writeJsonFile(dataFilePath, contacts);
};


module.exports = {
    saveContact,
    deleteContact,
    contactDetail,
    listContacts,
    updateContact
};
