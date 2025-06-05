import { combineReducers } from '@reduxjs/toolkit';

import auth from '@/redux/slice/authslice';

const rootReducer = combineReducers({
  auth,
});

export { rootReducer };
export type RootState = ReturnType<typeof rootReducer>;
