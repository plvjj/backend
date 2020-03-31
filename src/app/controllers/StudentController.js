import * as Yup from 'yup'; // e feito esse tipo de importaçao porque ele nao tem export default
import Student from '../models/Student';
import File from '../models/File';

class StudentController {
  async index(req, res) {
    const { id } = req.params;

    if (id) {
      const student = await Student.findOne({
        where: { id },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['path', 'url'],
          },
        ],
      });

      return res.json(student);
    }

    const students = await Student.findAll({
      attributes: ['id', 'name', 'createdAt'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      birth: Yup.string().required(),
      belt: Yup.string().required(),
      weight: Yup.string().required(),
      address: Yup.string().required(),
      phone: Yup.string().required(),
      responsible: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = await Student.create(req.body);

    return res.json({ name });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      birth: Yup.string().required(),
      belt: Yup.string().required(),
      weight: Yup.string().required(),
      address: Yup.string().required(),
      phone: Yup.string().required(),
      responsible: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const student = await Student.findByPk(req.body.id);

    const { name } = await student.update(req.body);

    return res.json({ name });
  }
}

export default new StudentController();
