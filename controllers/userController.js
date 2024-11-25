import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt"

export const getUsers= async (req,res)=>{
    try{
        const users = await prisma.user.findMany();
        
        res.status(200).json(users);
    }catch(err){

        res.status(500).json({message:"Failed to get Users!"});
    }
}
export const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const user1 = await prisma.user.findUnique({
            where: { id,id },
        });

        if (!user1) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user1);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Failed to get User!" });
    }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password, avatar, ...inputs} = req.body;

    // Immediately return if not authorized
    if (id !== tokenUserId) {
        return res.status(403).json({message: "Not Authorized!"});
    }

    try {
        // Hash password if provided
        const updatedPassword = password 
            ? await bcrypt.hash(password, 10) 
            : null;

        // Prepare update data
        const updateData = {
            ...inputs,
            ...(updatedPassword && {password: updatedPassword}),
            ...(avatar && {avatar}),
        };

        // Perform update
        const updatedUser = await prisma.user.update({
            where: {id},
            data: updateData
        });

        // Destructure to remove sensitive data
        const {password: userPassword, ...safeUserData} = updatedUser;
        
        // Send SINGLE response
        return res.status(200).json(safeUserData);

    } catch(err) {
        console.error("Update user error:", err);
        return res.status(500).json({message: "Failed to update User"});
    }
};


export const deleteUser= async (req,res)=>{
    const id = req.params.id
    const toeknUserId= req.userId;

    if(id!==toeknUserId){
        res.status(403).json({message:"Not AUthorized!"});
    }
    try{
        await prisma.user.delete({
            where:{id}
        })
        res.status(200).json({message:"user deleted"});

    }catch(err){

        res.status(500).json({message:"Failed to get Users!"});
    }
}