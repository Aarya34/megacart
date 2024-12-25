import bcrypt from 'bcryptjs';
import express from 'express';

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John',
        email: 'john@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Jane',
        email: 'hane@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
];

export default users;

