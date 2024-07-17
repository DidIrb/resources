import express from 'express';
import ctrl from '../controllers/users.controllers';
import validateToken from '../middleware/validate.token';
import { checkSecretPassword } from '../middleware/app.middleware';
const userRouter = express.Router()

userRouter.get('/',validateToken, ctrl.getUsers);
userRouter.post('/', validateToken, checkSecretPassword, ctrl.createUser);
userRouter.put('/:id',validateToken, checkSecretPassword, ctrl.updateUser);
userRouter.delete('/:id',validateToken, checkSecretPassword, ctrl.deleteUser);

export default userRouter;