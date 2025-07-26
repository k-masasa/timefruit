import Joi from 'joi';

export const createTimeRecordSchema = Joi.object({
  category: Joi.string()
    .valid('仕事', '勉強', '運動', '副業', 'その他')
    .required()
    .messages({
      'any.only': 'Category must be one of: 仕事, 勉強, 運動, 副業, その他',
      'any.required': 'Category is required'
    }),
  hours: Joi.number()
    .multiple(0.5)
    .min(0.5)
    .max(24)
    .required()
    .messages({
      'number.multiple': 'Hours must be in 0.5 increments',
      'number.min': 'Hours must be at least 0.5',
      'number.max': 'Hours cannot exceed 24',
      'any.required': 'Hours is required'
    }),
  memo: Joi.string()
    .allow('')
    .max(500)
    .optional()
    .messages({
      'string.max': 'Memo cannot exceed 500 characters'
    })
});