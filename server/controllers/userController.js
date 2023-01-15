const getUsers = async (req, res) => {
  res.json({ msg: 'get users route' });
};

const createUser = async (req, res) => {
  res.json({ msg: 'create user route' });
};

const getUser = async (req, res) => {
  res.json({ msg: 'get user route' });
};

const updateUser = async (req, res) => {
  res.json({ msg: 'update user route' });
};

const deleteUser = async (req, res) => {
  res.json({ msg: 'delete users route' });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
