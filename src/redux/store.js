import { configureStore } from "@reduxjs/toolkit";
import cajaReducer from "./cajaSlice";
import pedidoReducer from "./pedidoSlice";
import mesaReducer from "./mesaSlice";
import pedidoLlevar from "./pedidoLlevarSlice";
import tipoVentaReducer from "./tipoVentaSlice";
const store = configureStore({
  reducer: {
    caja: cajaReducer,
    pedido: pedidoReducer,
    mesa: mesaReducer,
    pedidoLlevar: pedidoLlevar,
    tipoVenta: tipoVentaReducer,
  },
});

export default store;
