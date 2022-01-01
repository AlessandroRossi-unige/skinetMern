import express from "express";
import extractFirebaseInfo from "../middleware/extractFirebaseInfo";
import controller from "../controllers/user"

const router = express.Router();

router.get('/validate', controller.validate);
router.get('/:userID', controller.read);
router.post('/create', controller.create);
router.post('/login', extractFirebaseInfo, controller.login);
router.get('/', controller.readAll);

export = router;