import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register= async(req,res)=>{
    const {username,email,password} = req.body;
    
    const hashed=await  bcrypt.hash(password,10)

    console.log(hashed);

    const newUser= await prisma.user.create({
        data: {
            username,
            email,
            password: hashed
        },
    });

    console.log(newUser);

    res.status(201).json({message:"User created successfully"});
}
export const login= (req,res)=>{

}
export const logout= (req,res)=>{

}