const UserModel = require("../model/usermodel");


const getdata = async (req ,res) => {

    try 
    {
        const Alltitle = await UserModel.find();
        res.status(200).json(Alltitle);
    }
    catch (error) 
    {
        res.status(400).json({ message: "Users Not Found !" });
    }

}

const postdata = async (req ,res) => {

    try 
    {
        const { title } = req.body;
        const existingData = await UserModel.findOne({ title });
        
        if (existingData) 
        {
            return res.status(400).json({ message: "Data with this Title already exists!" });
        }

        const newData = new UserModel(req.body);
        await newData.save();

        res.status(200).json({ message: "Data Added Successfully!" });
    } 
    catch (error) 
    {
        console.error("Error adding Data:", error);
        res.status(400).json({ message: "Not Added!" });
    }
}

const updatedata = async (req ,res) => {

    const { id } = req.params;

    try 
    {
        const title = await UserModel.findByIdAndUpdate(id, { $set: { ...req.body }},{new: true});

        if (!title) 
        {
            return res.status(404).json({ message: "Data Not Found !" });
        }
        else 
        {
            res.status(200).json({ message: "User Updated Successfully !" })
        }
        
    }
    catch (error) 
    {
        console.log(error)
        res.status(400).json({ message: "Error updating user" });
    }
}

const deletedata = async (req ,res) => {
    
    const { id } = req.params;

    try 
    {
        const deletetitledata = await UserModel.findByIdAndDelete(id);

        if (!deletetitledata) 
        {
            return res.status(400).json({ message: "Data not deleted !" })
        }
        else 
        {
            res.status(200).json({ message: "Data deleted Successfully !" })
        }
    }
    catch (error) 
    {
        console.log(error)
        res.status(400).json({ message: "Error for delete user" });
    }
}


module.exports = { getdata ,postdata,updatedata,deletedata };