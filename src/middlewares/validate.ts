import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, matchedData } from 'express-validator';
import status from 'http-status';

/**
 * Validate input
 * @author Abdelrahman Tarek
 * @param validations
 * @see https://express-validator.github.io/docs/running-imperatively.html
 */
// eslint-disable-next-line max-len
const validate = (validations: ValidationChain[]) => async (req: Request, res: Response, next: NextFunction) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    // Extracts data validated or sanitized by express-validator
    req.body = matchedData(req, { locations: ['body'] });
    req.params = matchedData(req, { locations: ['params'] });
    req.query = matchedData(req, { locations: ['query'] });

    return next();
  }

  return res.status(status.BAD_REQUEST).json({
    status: status.BAD_REQUEST,
    errors: errors.array(),
  });
};

export default validate;
