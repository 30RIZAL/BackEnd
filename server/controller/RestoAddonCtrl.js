const findAllRows = async (req, res) => {
    const result = await req.context.models.resto_addon.findAll();
    return res.send(result);
}

const findRowById = async (req, res) => {
    const result = await req.context.models.resto_addon.findByPk(
        req.params.id
    );
    return res.send(result);
}

const createRow = async (req, res) => {
    const { redon_name, redon_price, redon_reme_id } = req.body;
    try {
        const result = await req.context.models.resto_addon.create({
            redon_name: redon_name,
            redon_price: redon_price,
            redon_reme_id: redon_reme_id
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
    const { redon_name, redon_price, redon_reme_id } = req.body;
    try {
        const result = await req.context.models.resto_addon.update(
            {redon_name: redon_name,
                redon_price: redon_price,
                redon_reme_id: redon_reme_id
            },
            { returning: true, where: { redon_id: (req.params.id) } }
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

    await req.context.models.resto_addon.destroy({
        where: { redon_id: id }
    }).then(result => {
        return res.send("delete " + result + " rows.")
    }).catch(error => {
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