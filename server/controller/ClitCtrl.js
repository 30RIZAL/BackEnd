const findAllRows = async (req, res) => {
    const result = await req.context.models.cart_line_items.findAll({
        include: [{
            all: true
        }],
        where: {clit_cart_id: req.params.id}
    }
    );
    return res.send(result);
}

const findRowById = async (req, res) => {
    const result = await req.context.models.cart_line_items.findByPk(
        req.params.id
    );
    return res.send(result);
}


const createRow = async (req, res) => {
    const { clit_reme_id,
        clit_redon_id,
        clit_qty,
        clit_price,
        clit_sutotal,
        clit_order_name,
        clit_cart_id
    } = req.body;
    try {
        const result = await req.context.models.order_menu.create({
            clit_reme_id:clit_reme_id,
            clit_redon_id:clit_redon_id,
            clit_qty:clit_qty,
            clit_price:clit_price,
            clit_sutotal:clit_sutotal,
            clit_order_name:clit_order_name,
            clit_cart_id:clit_cart_id
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
    const { clit_reme_id,
        clit_redon_id,
        clit_qty,
        clit_price,
        clit_sutotal,
        clit_order_name,
        clit_cart_id } = req.body;
    const result = await req.context.models.cart_line_items.update(
        {
            clit_reme_id:clit_reme_id,
            clit_redon_id:clit_redon_id,
            clit_qty:clit_qty,
            clit_price:clit_price,
            clit_sutotal:clit_sutotal,
            clit_order_name:clit_order_name,
            clit_cart_id:clit_cart_id
        },
        {
            returning: true,
            where: { clit_id: req.params.id }
        }
    );
    return res.send(result);
}

const deleteRow = async (req, res) => {
    const id = req.params.id;

    await req.context.models.cart_line_items.destroy({
        where: { clit_id: id }
    }).then(result => {
        return res.send("delete " + result + " rows.")
    }).catch(error => {
        return res.sendStatus(404).send("Data not found.")
    });

}

const cekclit = async (req, res, next) => {
    const ceklt = req.cart || req.cekcart
    const cekmenu = req.menu
    try {
        const item = await req.context.models.cart_line_items.findOne({
            where: {
                clit_cart_id: ceklt.cart_id,
                clit_reme_id: cekmenu.reme_id,
                clit_status: 'cart'
            }
        });
        req.clititem = item
        next()
    } catch (error) {
        return res.status(500).json({ message: "Input Error" + error })
    }
}

const createclit = async (req, res) => {

    try {
        const reme = req.menu
        const cart = req.cart || req.cekcart
        const cekclit = req.clititem
        const sutotal = parseInt(reme.reme_price) * req.body.clit_qty
        if (!cekclit) {
            const item = await req.context.models.cart_line_items.create(
                {
                    clit_qty: req.body.clit_qty,
                    clit_status: 'cart',
                    clit_reme_id: reme.reme_id,
                    clit_cart_id: cart.cart_id,
                    clit_price : reme.reme_price, 
                    clit_sutotal: sutotal
                })
            return res.send(item)
        }
        return res.send("Items is alredy")
    } catch (error) {
        return res.send(error);
    }
}

const checkpay = async (req, res) => {
    const orderd = req.orders || req.cekord
    const closes = req.cekcart

    for (const data of closes.cart_line_items) {
        try {
            await req.context.models.cart_line_items.update({
                clit_status: 'ordered',
                clit_order_name: orderd.order_name
            },
                { returning: true, where: { clit_id: data.clit_id } })
        } catch (error) {
            return res.send(error)
        }
    }
    return res.send("Thanks for your shopping")
}

const updatelite = async (req, res) => {
    try {
        const ceklite = req.clititem
        const cekmenu = req.menu
        const sutotal = cekmenu.reme_price * req.body.clit_qty
        const item = await req.context.models.cart_line_items.update({
            clit_qty: req.body.clit_qty,
            clit_sutotal: sutotal
        }, { returning: true, where: { clit_id: ceklite.clit_id } })

        return res.send(item)
    } catch (error) {
        return res.send(error)
    }
}

const checkline = async (req,res)=>{
    const orderd = req.orders || req.cekord
    const closes = req.cekcart

    for (const data of closes.cart_line_items) {
        try {
            await req.context.models.cart_line_items.update({
            clit_status : 'checkout',
            clit_order_name : orderd.order_name
        },
        {returning : true, where :{clit_id : data.clit_id }})
        } catch (error) {
            return res.send(error)
        }
    }
    return res.send(orderd)
}

export default{
    createRow,
    updateRow,
    deleteRow,
    updatelite,
    checkpay,
    createclit,
    cekclit,
    checkline,
    findAllRows,
    findRowById

}