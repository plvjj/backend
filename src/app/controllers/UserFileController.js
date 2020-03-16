import * as Yup from 'yup'; // e feito esse tipo de importaçao porque ele nao tem export default
import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      username: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({
      where: { username: req.body.username },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const { id, name, username } = await User.create(req.body);

    return res.json({
      id,
      name,
      username,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      username: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { username, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (username !== user.username) {
      const userExists = await User.findOne({
        where: { username },
      });

      if (userExists) {
        return res.status(400).json({ error: 'Usuário já existe.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha antiga não corresponde' });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      username,
      avatar,
    });
  }
}

export default new UserController();
