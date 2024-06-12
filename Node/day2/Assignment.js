// var name2 = "juan";
// var jabatan = 'staff';

// console.info("Nama: " + name2 + "\nJabatan:" + jabatan);

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukkan nama: ', (name) => {
    rl.question('Masukkan jabatan: ', (jabatan) => {
        console.info("Nama: " + name + "\nJabatan:" + jabatan);
        rl.close();
    });
});
