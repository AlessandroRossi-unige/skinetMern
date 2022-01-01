import { Request, Response, NextFunction } from "express";
import logging from "../config/logging";
import firebaseAdmin from "firebase-admin";

const extractFirebaseInfo = (req: Request, res: Response, next: NextFunction) => {
  logging.info('Validating firebase token ...');
  
  // Bearer token
  let token = req.headers.authorization?.split(' ')[1];
  
  if (token) {
    firebaseAdmin.auth().verifyIdToken(token).then(result => {
      if (result) {
        res.locals.firebase = result;
        res.locals.fire_token = token;
        next();
      } else {
        logging.warn('Token invalid');
        return res.status(401).json({
          message: "Unauthorised"
        });
      }
    }).catch(error => {
      logging.warn(error);
      return res.status(401).json({
        message: "Unauthorised due to error",
        error: error
      });
    });
  } else {
    return res.status(401).json({
      message: "Unauthorised"
    });
  }
}

export default extractFirebaseInfo;