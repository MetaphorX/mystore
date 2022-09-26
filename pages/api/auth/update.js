import { getSession } from "next-auth/react"
import User from "../../../models/User"
import db from "../../../utils/db"
import bcrypt from 'bcryptjs'

async function handler(req, res){
    if(req.method !== 'PUT'){
        return res.statuus(400).send({message: `${req.method} not supported`})
    }

    const session = await getSession({req})
    if(!session){
        return res.status(401).send({message: 'Signin Required'})
    }

    const {user} = session
    const {name, email, password} = req.body

    if(
        !name ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().lenght < 6
    ){
        res.status(422).json({
            message:'Validation error'
        })
        return;
    }

    await db.connect()
    const updateUser = await User.findByIdAndUpdate(user._id)
    updateUser.name = name;
    updateUser.email = email;

    if(password){
        updateUser.password = bcrypt.hashSync(password)
    }
    await updateUser.save()
    await db.disconnect()

    res.send({
        message: 'User Updated'
    })
}

export default handler