import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"

export const register= async(req,res)=>{
    const {username,email,password} = req.body;

    try{
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
    } catch(err){
        
    console.log(err);

    res.status(500).json({message:"Failed to create user"});
    }
    
    
}
export const login= async(req,res)=>{

    const {username,password}=req.body;

    try{
        const user= await prisma.user.findUnique({
            where:{username}
        })

        if(!user) return res.status(401).json({message:"Invalid credentials!"});

        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(!isPasswordValid) return res.status(401).json({message:"Invalid credentials!"});

        // res.setHeader("Set-Cookie","test="+"myValue").json("done");


        //3 day expiry
        const age=1000*60*60*24*3;
        // res.cookie("test2","myValue2",{
        //     httpOnly:true,
        //     //remeber to uncomment while in production
        //     // secure:true
        //     maxAge:age
        // }).status(200).json({message:"Login Successful!"});
        //but it's better to use jwt tokens

        const token=jwt.sign({
            id:user.id
        },process.env.JWT_SECRET_KEY,{expiresIn: age})

        res.cookie("token",token,{
            httpOnly:true,
            //remeber to uncomment while in production
            // secure:true
            maxAge:age
        }).status(200).json({message:"Login Successful!"});


    }catch(err){
        console.log(err);

        res.status(500).json({message:"Failed to login"});   
    }

}
export const logout= (req,res)=>{
    res.clearCookie("token").status(200).json({message:"Logout successful"});

}