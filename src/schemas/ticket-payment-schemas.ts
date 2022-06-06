import { CardAndTicketData } from '@/services/ticket-service';
import Joi from 'joi';

const date_ob = new Date();

export const createPaymentSchema = Joi.object<CardAndTicketData>({
  card: {
    number: Joi.string().creditCard().required(),
    exp_month: Joi.number().min(1).max(12).required(),
    exp_year: Joi.number().min(date_ob.getFullYear()).required(),
    cvc: Joi.string()
      .pattern(/\d{3,4}/)
      .required(),
  },
  ticket: {
    enrollmentId: Joi.number().required(),
    eventId: Joi.number().required(),
    isOnline: Joi.boolean().required(),
    withAccommodation: Joi.boolean().optional(),
  },
});
