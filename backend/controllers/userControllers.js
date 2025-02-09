import User from "../models/User"
import bcrypt from "bcrypt"

export const getAllUsers = async (req,res) =>{
    const users = await User.find({})
    if (users?.length == 0){
        res.json({message:"No users found."})
    } else {
        res.json(users)
    }
}

export const createUser = async (req,res) => {
    const {username, password} = req.body

    if(!username || !password){
        return res.status(400).json({message:"Username and password required"})
    }

    const duplicate = await User.findOne({username}).exec()
    if (duplicate) return res.sendStatus(409)

    try {
        const user = await User.create({username,password})
        console.log(user)
        return res.status(201).json({message: 'New user created',data: {id:user._id,username:user.username}})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: 'Unable to create user'})
    }
    

}

export const deleteUser = async (req,res) => {

    const {id} = req.body

    const user = User.findById(id).exec()
    if(!user) {
        return res.status(400).json({message:"User not found"})
    }
    try {
        const deletedUser = User.deleteOne({id:id}).exec()
        console.log(deletedUser)
        return res.status(200).json({message:"User deleted"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Error deleting user"})
    }

}