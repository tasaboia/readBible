import {createRealmContext} from '@realm/react';
import { biblePiecesSchema } from '../database/schemas/bibleSchema';

export const BiblePlanRealmContext = createRealmContext({
  schema: [biblePiecesSchema],
});
