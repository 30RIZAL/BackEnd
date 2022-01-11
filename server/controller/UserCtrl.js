import bcrypt from 'bcrypt';
const SALT_ROUND = 10;

const findAllRows = async (req, res) => {
  const result = await req.context.models.users.findAll();
  return res.send(result);
};

const signup = async (req, res) => {
  const { username, email, user_password, user_handphone, user_roles } =
    req.body;

  let hashPassword = user_password;
  hashPassword = await bcrypt.hash(hashPassword, SALT_ROUND);
  try {
    const result = await req.context.models.users.create({
      user_name: username,
      user_email: email,
      user_password: hashPassword,
      user_handphone: user_handphone,
      user_roles: user_roles,
    });

    const { user_name, user_email } = result.dataValues;
    res.send({ user_name, user_email });
  } catch (error) {
    res.sendStatus(404).send(error);
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await req.context.models.users.findOne({
      where: { user_name: username },
    });
    const { user_name, user_email, user_password } = result.dataValues;
    const compare = await bcrypt.compare(password, user_password);
    if (compare) {
      return res.send({ user_name, user_email });
    } else {
      return res.sendStatus(404).send(error);
    }
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
};

const cekUser = async (req, res, next) => {
  try {
    if (req.params.id === undefined || isNaN(req.params.id))
      res.status(400).send({ message: 'Wrong Id User' });
    const user = await req.context.models.users.findOne({
      where: { user_id: req.params.id },
    });
    req.cekUser = {
      user_id: user.user_id,
    };
    next();
  } catch (error) {
    return res.status(500).send({ message: `User ${error}` });
  }
};

const deleteRow = async (req, res) => {
  const id = req.params.id;

  await req.context.models.users
    .destroy({
      where: { user_id: id },
    })
    .then((result) => {
      return res.send('delete ' + result + ' rows.');
    })
    .catch((error) => {
      return res.sendStatus(404).send('Data not found.');
    });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, email, user_handphone, user_roles } = req.body;
  try {
    const result = await req.context.models.users.update(
      {
        user_name: username,
        user_email: email,
        user_handphone: user_handphone,
        user_roles: user_roles,
      },
      { returing: true, where: { user_id: id } }
    );
    return res.send(result.dataValues);
  } catch (error) {
    return error;
  }
};
export default {
  signup,
  signin,
  cekUser,
  findAllRows,
  deleteRow,
  updateUser,
};
