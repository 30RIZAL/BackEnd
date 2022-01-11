const findAllRows = async(req,res)=>{
    const result = await req.context.models.menu_type.findAll();
    return res.send(result);
}

const findRowById = async(req,res)=>{
    const result = await req.context.models.menu_type.findByPk(
        req.params.id
    );
    return res.send(result);
}

const createRow = async(req,res)=>{
    const {mety_name} = req.body;
    try {
        const result = await req.context.models.menu_type.create({
            mety_name :mety_name
        });
        return res.send(result);
    } catch (error) {
        return res.status(404).json({
            status: "Failed",
            message: "",
            error: error
        })
    }
    
}

const updateRow = async(req,res)=>{
    const {mety_name} = req.body;
    const result = await req.context.models.menu_type.update(
        {mety_name : mety_name},
        {returning:true,
            where : {mety_name : req.params.id}
        }
        );
    return res.send(result);
}

const deleteRow = async(req,res)=>{
    const id = req.params.id;

    await req.context.models.menu_type.destroy({
        where : {mety_name : id}
    }).then(result =>{
        return res.send("delete "+result+" rows.")
    }).catch(error =>{
        return res.sendStatus(404).send("Data not found.")
    });
    
}



export default {
    findAllRows,
    findRowById,
    createRow,
    updateRow,
    deleteRow
}