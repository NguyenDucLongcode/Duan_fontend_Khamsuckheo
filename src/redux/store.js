import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// element
import {
  UserApi,
  DoctorApi,
  AllCodeApi,
  PatientApi,
  SpecialistApi,
  ClinicApi,
} from "./SliceApi/index";
import {
  allCodeReducer,
  userReducer,
  scheduleReducer,
  doctorReducer,
} from "./Slice";

const persistConfig = {
  key: "root", // Tên của persisted key
  storage, // Chọn storage (localStorage)
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    //slice
    user: persistedReducer,
    AllCode: allCodeReducer,
    schedule: scheduleReducer,
    doctor: doctorReducer,
    // sliceApi
    [UserApi.reducerPath]: UserApi.reducer,
    [DoctorApi.reducerPath]: DoctorApi.reducer,
    [AllCodeApi.reducerPath]: AllCodeApi.reducer,
    [PatientApi.reducerPath]: PatientApi.reducer,
    [SpecialistApi.reducerPath]: SpecialistApi.reducer,
    [ClinicApi.reducerPath]: ClinicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Bỏ qua các hành động của redux-persist
      },
    })
      .concat(UserApi.middleware)
      .concat(DoctorApi.middleware)
      .concat(AllCodeApi.middleware)
      .concat(PatientApi.middleware)
      .concat(ClinicApi.middleware)
      .concat(SpecialistApi.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
