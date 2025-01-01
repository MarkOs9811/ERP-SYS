import { configureStore } from "@reduxjs/toolkit";
import cajaReducer from "./cajaSlice";
import pedidoReducer from "./pedidoSlice";
import mesaReducer from "./mesaSlice";
const store = configureStore({
  reducer: {
    caja: cajaReducer,
    pedido: pedidoReducer,
    mesa: mesaReducer,
  },
});

export default store;
