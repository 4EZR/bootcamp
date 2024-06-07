const fs = require('fs');
const path = require('path');
const validator = require('validator');

// Define the data directory and file path
const dataDir = path.join(__dirname, 'data');
const dataFilePath = path.join(dataDir, 'data.json');

const nameExists = (data, name) => {
    return data.some(item => item.name.toLowerCase() === name.toLowerCase());
};

const readJsonFile = (filePath) => {
    let data = [];
    try {
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            if (fileData) {
                data = JSON.parse(fileData);
            }
        } else {
            console.log('File does not exist.');
        }
    } catch (err) {
        console.error('Error reading the file:', err);
    }
    return data;
};

const validateEmail = (email) => {
    return validator.isEmail(email);
};


const validatePhone = (phone) => {
    return validator.isMobilePhone(phone, 'id-ID');
};


const saveContact = (contact) => {
    console.log(contact);
    if (!validateEmail(contact.email)) {
        console.log('Invalid email format.');
        return;
    }

    if (!validatePhone(contact.mobile)) {
        console.log('Invalid phone format.');
        return;
    }



    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }

    let contacts = readJsonFile(dataFilePath);
    if (nameExists(contacts, contact.name)) {
        console.log(`The name "${contact.name}" already exists.`);
        return;
    }

    contacts.push(contact);
    const data = JSON.stringify(contacts, null, 2);

    try {
        fs.writeFileSync(dataFilePath, data);
        console.log('Contact saved successfully.');
    } catch (err) {
        console.error('Error writing to the file:', err);
    }
};

const deleteContact = (name) => {
    let contacts = readJsonFile(dataFilePath);
    const initialLength = contacts.length;
    contacts = contacts.filter(contact => contact.name.toLowerCase() !== name.toLowerCase());

    if (contacts.length === initialLength) {
        console.log(`Contact with name "${name}" not found.`);
        return;
    }

    const data = JSON.stringify(contacts, null, 2);

    try {
        fs.writeFileSync(dataFilePath, data);
        console.log(`Contact "${name}" deleted successfully.`);
    } catch (err) {
        console.error('Error writing to the file:', err);
    }
};

const listContact = () => {
    const contacts = readJsonFile(dataFilePath);
    if (contacts.length === 0) {
        console.log('No contacts found.');
        return;
    }
    console.log('Contact List:');
    contacts.forEach((contact, index) => {
        console.log(`${index + 1}. Name: ${contact.name}, Email: ${contact.email}, phone: ${contact.phone}\n`);
    });
};

const contactDetail = (name) => {
    const contacts = readJsonFile(dataFilePath);
    const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (!contact) {
        console.log(`Contact with name "${name}" not found.`);
        return;
    }
    console.log(`Contact Details - Name: ${contact.name}, Email: ${contact.email}, phone: ${contact.phone}`);
};

const updateContact = (name, newContact)=>{
    const contacts = readJsonFile(dataFilePath);
    const contact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());

}

// Module exports
module.exports = {
    saveContact,
    deleteContact,
    contactDetail,
    listContact,
    updateContact
};
