import { Express } from 'express';
import {
  CreateCenterHandler,
  DeleteCenterHandler,
  GetAllCentersHandler,
  GetCenterHandler,
  UpdateCenterHandler,
} from '../controllers/Center.Controller';
import requireUser from '../middlewares/requireUser';
import validate from '../middlewares/validateResource';
import {
  CreateCenterSchema,
  DeleteCenterSchema,
  GetCenterSchema,
  UpdateCenterSchema,
} from '../schema/Center.Schema';

function centerRoutes(app: Express) {
  app.post('/api/centers', [
    requireUser,
    validate(CreateCenterSchema),
    CreateCenterHandler,
  ]);

  app.put('/api/centers/:centerId', [
    requireUser,
    validate(UpdateCenterSchema),
    UpdateCenterHandler,
  ]);

  app.get('/api/centers/:centerId', [
    // requireUser,
    validate(GetCenterSchema),
    GetCenterHandler,
  ]);

  app.get('/api/centers/', [
    // requireUser,
    // validate(GetCenterSchema),
    GetAllCentersHandler,
  ]);

  app.delete('/api/centers/:centerId', [
    requireUser,
    validate(DeleteCenterSchema),
    DeleteCenterHandler,
  ]);
}

export default centerRoutes;
