import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

@Injectable()
export class IdValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if(!isValidId){
      throw new HttpException("the provided ID is not valid", HttpStatus.BAD_REQUEST);
    }else{
      next();
    }
  }
}
