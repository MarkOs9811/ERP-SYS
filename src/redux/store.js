import { configureStore } from "@reduxjs/toolkit";
import cajaReducer from "./cajaSlice";
import pedidoReducer from "./pedidoSlice";
import mesaReducer from "./mesaSlice";
import pedidoLlevar from "./pedidoLlevarSlice";
import tipoVentaReducer from "./tipoVentaSlice";
import categoriaReducer from "./categoriaPlatosSlice";

const store = configureStore({
  reducer: {
    caja: cajaReducer,
    pedido: pedidoReducer,
    mesa: mesaReducer,
    pedidoLlevar: pedidoLlevar,
    tipoVenta: tipoVentaReducer,
    categoriaFiltroPlatos: categoriaReducer,
  },
});

export default store;
