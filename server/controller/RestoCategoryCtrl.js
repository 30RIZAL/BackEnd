const findAllRows = async (req, res) => {
    const result = await req.context.models.resto_category.findAll();
    return res.send(result);
}

const findRowById = async (req, res) => {
    const result = await req.context.models.resto_category.findByPk(
        req.params.id
    );
    return res.send(result);
}

const createRow = async (req, res) => {
    const { reca_name, reca_desc } = req.body;
    try {
        const result = await req.context.models.resto_category.create({
            reca_name: reca_name,
            reca_desc: reca_desc
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
    const { reca_name, reca_desc } = req.body;
    try {
        const result = await req.context.models.resto_category.update(
            {
                reca_name: reca_name,
                reca_desc: reca_desc
            },
            { returning: true, where: { reca_name: (req.params.id) } }
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

    await req.context.models.resto_category.destroy({
        where: { reca_name: id }
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