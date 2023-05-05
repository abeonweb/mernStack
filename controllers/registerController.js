const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ "message": "Username and password are required" })
    //check for duplicate username in DB
    const duplicate = await User.findOne({username: user}).exec()
    if (duplicate) return res.sendStatus(409)//conflict
    try {
        //encrypt pwd
        const hashedPwd = await bcrypt.hash(pwd, 10)//adding a salt makes it harder to decrpty for hackers
        //store new user
        const newUser = {
            "username": user,
            "roles": {
                "User": 2001,
            },
            "password": hashedPwd,
        }
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        console.log(usersDB.users)
        res.status(201).json({ "success": `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ "message": err.message })
    }
}

module.exports = { handleNewUser }