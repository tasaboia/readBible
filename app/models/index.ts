import {createRealmContext} from '@realm/react';
import { dailyBibleSchema } from '../database/schemas/dailyBible';

export const BiblePlanRealmContext = createRealmContext({
  schema: [dailyBibleSchema],
});
