import prisma from "../lib/prisma.js";

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

export const updateUser= async (req,res)=>{
    const id = req.params.id
    const toeknUserId= req.userId;
    const body =req.body;

    if(id!==toeknUserId){
        res.status(403).json({message:"Not AUthorized!"});
    }
    try{

        const updatedUser= await prisma.user.update({
            where: {id},
            data:body
        })
        res.status(200).json(updatedUser)
        
        

    }catch(err){

        res.status(500).json({message:"Failed to get Users!"});
    }
}


export const deleteUser= async (req,res)=>{
    try{

    }catch(err){

        res.status(500).json({message:"Failed to get Users!"});
    }
}