
const yargs = require('yargs');
const sifuContact = require('./function');



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
        sifuContact.saveContact(contact);

    
    }
});

yargs.command({
    command: 'delete',
    describe: 'delete new contact',

    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string'
        },
    },

    handler(argv) {
        sifuContact.deleteContact(argv.name);
    }
});

yargs.command({
    command: 'get',
    describe: 'list new contact',

    builder: {
    },

    handler(argv) {
        sifuContact.listContact();
    }
});

yargs.command({
    command: 'get_details',
    describe: 'detail contact',

    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string'
        },
    },

    handler(argv) {
        sifuContact.contactDetail(argv.name);
    }
});







yargs.parse();
