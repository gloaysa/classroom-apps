import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import configReducer from './reducers/config.reducer';
import userReducer from './reducers/user.reducer';
import mainReducer from './reducers/main.reducer';
import roomReducer from './reducers/room.reducer';

const rootReducer = combineReducers({
	main: mainReducer,
	room: roomReducer,
	buzzerGame: configReducer,
	user: userReducer,
});

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
