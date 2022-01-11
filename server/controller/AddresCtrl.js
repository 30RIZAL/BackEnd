const findAllRows = async (req, res) => {
    const result = await req.context.models.address.findAll();
    return res.send(result);
}

const findOne = async (req, res) => {
    const result = await req.context.models.address.findOne({
        include: [
          {
            all: true,
          },
        ],
        where: { addr_user_id: req.params.id },
      });
    return res.send(result);
}

const createRow = async (req, res) => {
    
    const { addr_name, addr_detail, addr_lalitude, addr_longtitude, addr_user_id } = req.body;
    try {
        const result = await req.context.models.address.create({
            addr_name: addr_name,
            addr_detail: addr_detail,
            addr_lalitude: addr_lalitude,
            addr_longtitude: addr_longtitude,
            addr_user_id: addr_user_id
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

const updateRow = async (req, res) => {
    const { addr_name, addr_detail, addr_latitude, addr_longtitude, addr_user_id } = req.body;
    try {
        const result = await req.context.models.address.update(
            {
                addr_name: addr_name,
                addr_detail: addr_detail,
                addr_latitude: addr_latitude,
                addr_longtitude: addr_longtitude,
                addr_user_id: addr_user_id
            },
            { returning: true, where: { addr_id: (req.params.id) } }
        )
        return res.send(result);
    } catch (error) {
        return res.status(404).json({
            status: "Failed",
            message: "",
            error: error
        })
    }
}

const deleteRow = async (req, res) => {
    const id = req.params.id;

    await req.context.models.address.destroy({
        where: { addr_id: id }
    }).then(result => {
        return res.send("delete " + result + " rows.")
    }).catch(error => {
        return res.sendStatus(404).send("Data not found.")
    });

}



export default {
    findAllRows,
    findOne,
    createRow,
    updateRow,
    deleteRow
}