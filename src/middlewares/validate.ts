import Joi from 'joi';
import joiObjectid from 'joi-objectid';
Joi.objectid = joiObjectid(Joi);

export default function (joiSchema: any) {
  console.log('validate function running');
  return function (req: any, res: any, next: any) {
    if (joiSchema === 'id') {
      joiSchema = { id: Joi.objectid() };
      const value = validateSchema(req.params);
      req.params.id = value.id;
      next();
    } else {
      const value = validateSchema(req.body);
      req.body = value;
      next();
    }

    function validateSchema(objectToValidate: any) {
      const schema = Joi.object(joiSchema);
      const { value, error } = schema.validate(objectToValidate);
      if (error) return res.status(400).json({ message: error.details[0].message });
      return value;
    }
  };
}
