const yargs = require('yargs')


// Define a command that can be executed from the command line
// This command is named 'add' and it is used to add a new contact
// The 'describe' property is used to provide a description of what the command does
yargs.command({
    command: 'add',
    describe: 'add new contact',

    // The 'builder' property is used to define the options that can be passed to the command
    // Each option is defined as a key-value pair where the key is the name of the option
    // and the value is an object that describes the option
    // The 'describe' property is used to provide a description of what the option does
    // The 'demandOption' property is used to specify whether the option is required or not
    // The 'type' property is used to specify the type of the option value
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

    // The 'handler' property is a function that is called when the command is executed
    // The 'argv' parameter is an object that contains the values of the command options
    // The 'handler' function is responsible for performing the action specified by the command
    // In this case, it creates a new contact object and logs it to the console
    handler(argv) {
        const contact = {
            name: argv.name,
            email: argv.email,
            mobile: argv.mobile
        };
        console.log(contact);
    }
});

// To run the command, use the following command in the terminal:
// node app.js add --name John --mobile 1234567890
// Replace 'John' and '1234567890' with the desired name and mobile number
// The '--email' option is optional, so the command can be run without the '--email' option
yargs.parse();

// Command

// node app add --email="juan" --name="asdasd" --mobile="123123123"