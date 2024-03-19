import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import panelAvailReducer from "../Components/Panel/PanelAvailibility/store/panelavailability";

export const store = configureStore({
  reducer: {
    user: userReducer,
    panelAvailability: panelAvailReducer,
  },
});
