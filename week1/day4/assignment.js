
const yargs = require('yargs');
const { saveContact } = require('./function');



yargs.command({
    command: 'add',
    describe: 'add new contact',

    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Contact Email',
            demandOption: false,
            type: 'string'
        },
        mobile: {
            describe: 'Contact Mobile',
            demandOption: true,
            type: 'string'
        }
    },

    handler(argv) {
        const contact = {
            name: argv.name,
            email: argv.email,
            mobile: argv.mobile
        };
        saveContact(contact);

    
    }
});

yargs.parse();
