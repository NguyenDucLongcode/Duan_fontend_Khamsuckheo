import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// element
import { UserApi, DoctorApi, AllCodeApi } from "./SliceApi/index";
import { allCodeReducer, userReducer, scheduleReducer } from "./Slice";

const persistConfig = {
  key: "root", // Tên của persisted key
  storage, // Chọn storage (localStorage)
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    AllCode: allCodeReducer,
    schedule: scheduleReducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [DoctorApi.reducerPath]: DoctorApi.reducer,
    [AllCodeApi.reducerPath]: AllCodeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Bỏ qua các hành động của redux-persist
      },
    })
      .concat(UserApi.middleware)
      .concat(DoctorApi.middleware)
      .concat(AllCodeApi.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
