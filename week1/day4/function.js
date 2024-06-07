const fs = require('fs');
const path = require('path');
const validator = require('validator');

// Define the data directory and file path
const dataDir = path.join(__dirname, 'data');
const dataFilePath = path.join(dataDir, 'data2.json');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const nameExists = (data, name) => {
    const lowerCaseName = name.toLowerCase();
    return data.some(item => item.name.toLowerCase() === lowerCaseName);
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

// Module exports
module.exports = {
    nameExists,
    readJsonFile,
    saveContact,
    validateEmail,
    validatePhone
};
