const findAllRows = async (req, res) => {
    const result = await req.context.models.resto_shop.findAll({
        include:[{
            all:true
        }]
    });
    return res.send(result);
}

const findRowById = async (req, res) => {
    const result = await req.context.models.resto_shop.findByPk(
        req.params.id
    );
    return res.send(result);
}

const createRow = async (req, res) => {
    const { reto_name, reto_open_hours, reto_rating, reto_approval, reto_user_id, reto_reca_name } = req.body;
    try {
        const result = await req.context.models.resto_shop.create({
            reto_name: reto_name,
            reto_open_hours: reto_open_hours,
            reto_rating: reto_rating,
            reto_approval: reto_approval,
            reto_user_id: reto_user_id,
            reto_reca_name: reto_reca_name
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
    const { reto_name, reto_open_hours, reto_rating, reto_approval, reto_user_id, reto_reca_name } = req.body;
    try {
        const result = await req.context.models.resto_shop.update(
            {
                reto_name: reto_name,
                reto_open_hours: reto_open_hours,
                reto_rating: reto_rating,
                reto_approval: reto_approval,
                reto_user_id: reto_user_id,
                reto_reca_name: reto_reca_name
            },
            { returning: true, where: { reto_id: (req.params.id) } }
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

    await req.context.models.resto_shop.destroy({
        where: { reto_id: id }
    }).then(result => {
        return res.send("delete " + result + " rows.")
    }).catch(error => {
        return res.sendStatus(404).send("Data not found.")
    });

}

const findout = async (req, res, next) => {
    try {
        const reto = await req.context.models.resto_shop.findOne({
            where: {reto_id: req.body.reto_id}
        })
        req.reto = reto;
        next()    
    } catch (error) {
        return res.status(500).send({message:`find reto ${error}`})
    }
    
}


export default {
    findAllRows,
    findRowById,
    createRow,
    updateRow,
    deleteRow,
    findout
}