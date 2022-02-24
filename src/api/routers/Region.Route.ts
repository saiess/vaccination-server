import { Express } from 'express';
import {
  CreateRegionHandler,
  DeleteRegionHandler,
  GetRegionHandler,
  UpdateRegionHandler,
} from '../controllers/Region.Controller';
import requireUser from '../middlewares/requireUser';
import validate from '../middlewares/validateResource';
import {
  CreateRegionSchema, DeleteRegionSchema, GetRegionSchema, UpdateRegionSchema,
} from '../schema/Region.Schema';

function regionRoutes(app: Express) {
  app.post('/api/regions', [requireUser, validate(CreateRegionSchema), CreateRegionHandler]);

  app.put('/api/regions/:regionId', [requireUser, validate(UpdateRegionSchema), UpdateRegionHandler]);

  app.get('/api/regions', [requireUser, validate(GetRegionSchema), GetRegionHandler]);

  app.delete('/api/regions/:regionId', [requireUser, validate(DeleteRegionSchema), DeleteRegionHandler]);
}

export default regionRoutes;
