const { PrismaClient } = require ('@prisma/client')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const prisma = new PrismaClient();



// const createAdmin = async (req,res) => { 
//     try {
//         const {username, password, email} = req.body;


//         const hashedPassword = await bcrypt.hash(password, 10)


//         const newAdmin = await prisma.user.create({
//             data: { 
//                 username : username,
//                 email: email,
//                 password : hashedPassword,
//                 role: 'ADMIN'
//             }
//         });
//     } catch (error) {
//         console.error('Failed to create admin: ', error);
//         res.status(500).json({ message: 'Failed to create admin' });
//     }
// };

const createUser = async (req, res) => { 
    try {
        const { username , password , email } = req.body; 

        const hashedPassword = await bcrypt.hash(password, 10)

        const exestingUserByUsername = await prisma.user.findUnique({
            where: {
                username : username,
            }
        })

        if(exestingUserByUsername) {
            return console.error(' Username already exists ' ,username),
            res.status(400).json({ message : 'Username already exists'})
        }

        const exestingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if(exestingUser) {
            return console.error(' Email already exists',email),
            res.status(400).json({ message : 'Email already exists '});
        }

        const newUser = await prisma.user.create({
            data: { 
                username : username,
                email: email,
                password : hashedPassword,
                // role : 'USER',
            }
        });
        res.status(201).json({ message : 'User registered susccessfully ', user: newUser})
     } catch (error){ 
        console.error('Failed to register user: ' , error)
        res.status(500).json({ message : 'Failed to register user '}) 

     }
};

const Login = async (req,res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: usernameOrEmail },
                    { email: usernameOrEmail }
                ]
            }
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }


        const tokenpayload = {
            userId: user.id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(tokenpayload, process.env.jwtTOKEN, { expiresIn: '1h' });

        res.json({ token: token });

    } catch (error) {
        console.error('Failed to login:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
};


module.exports = { createUser, Login};