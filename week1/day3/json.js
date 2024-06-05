const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukkan nama: ', (name) => {
    rl.question('Masukkan NoHP: ', (phone) => {
        const contact = { name, phone };

        const fs = require('fs');
        let contacts = [];
        try{
            const data = fs.readFileSync('data/data.json', 'utf-8');
            contacts = JSON.parse(data);
        }catch(err){
            console.log('No File ');
        }
        contacts.push(contact);
        const data = JSON.stringify(contacts, null, 2);
        fs.writeFileSync('data/data.json', data);

        rl.close();
    });
});
