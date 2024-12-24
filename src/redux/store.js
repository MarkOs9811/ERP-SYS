import { configureStore } from "@reduxjs/toolkit";
import cajaReducer from "./cajaSlice";
import pedidoReducer from "./pedidoSlice";
const store = configureStore({
  reducer: {
    caja: cajaReducer,
    pedido: pedidoReducer,
  },
});

export default store;
