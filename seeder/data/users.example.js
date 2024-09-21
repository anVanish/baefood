const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const salt = bcrypt.genSaltSync(10);

exports.usersData = [
    {
        email: 'sosvanish@gmail.com',
        name: 'Khánh An',
        password: bcrypt.hashSync('password', salt),
        isAdmin: true,
    },
    {
        email: 'camnhii1202@gmail.com',
        name: 'Cẩm Nhi',
        password: bcrypt.hashSync('password', salt),
        isAdmin: false,
    },
];
