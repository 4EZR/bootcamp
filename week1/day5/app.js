
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
        phone: { 
            describe: 'Contact phone',
            demandOption: true,
            type: 'string'
        }
    },

    handler(argv) {
        const contact = {
            name: argv.name,
            email: argv.email,
            phone: argv.phone
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

yargs.command({
    command: 'update',
    describe: 'update contact',

    builder: {
        name: {
            describe: 'Contact Name',
            demandOption: true,
            type: 'string'
        },
        new_name: {
            describe: 'Contact Name',
            demandOption: false,
            type: 'string'
        },
        new_email: {
            describe: 'Contact Email',
            demandOption: false,
            type: 'string'
        },
        new_phone: { 
            describe: 'Contact phone',
            demandOption: false,
            type: 'string'
        }
    },

    handler(argv) {

        const newContact = {};
        if (argv.new_name) newContact.name = argv.new_name;
        if (argv.new_email) newContact.email = argv.new_email;
        if (argv.new_phone) newContact.phone = argv.new_phone;


        sifuContact.updateContact(argv.name, newContact);
    }

    
})







yargs.parse();
