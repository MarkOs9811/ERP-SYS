import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPreventaMesa } from "../../service/preventaService";
import {
  ArrowBackOutline,
  CardOutline,
  CashOutline,
  CheckmarkDoneOutline,
  PersonOutline,
  ReceiptOutline,
  TrashBinOutline,
} from "react-ionicons";
import "../../css/EstilosPlatos.css";
import { useNavigate } from "react-router-dom";

export function DetallesPago() {
  const idMesa = useSelector((state) => state.mesa.idPreventaMesa);
  const caja = useSelector((state) => state.caja.caja);
  const [preVentas, setPreventas] = useState([]);
  const [mesa, setMesa] = useState(null);
  const navigate = useNavigate();
  const getPreventeMesa = async () => {
    try {
      const result = await getPreventaMesa(idMesa, caja.id);
      if (result.success) {
        setPreventas(result.preventas);
        const numeroMesa = result.preventas[0]?.mesa?.numero;
        if (numeroMesa) {
          setMesa(numeroMesa);
        }
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error al obtener las preventas de la mesa:", error);
    }
  };

  useEffect(() => {
    if (idMesa && caja?.id) {
      getPreventeMesa();
    }
  }, [idMesa, caja]);

  const totalPreventa = preVentas
    .reduce(
      (acc, item) => acc + item.cantidad * (item.plato?.precio || item.precio),
      0
    )
    .toFixed(2);

  // Calcular el IGV
  const igv = (totalPreventa * 0.18).toFixed(2);
  const handleVolverMesas = () => {
    navigate(`/vender/ventasMesas/preVenta`);
  };
  return (
    <div className="row g-3">
      <div className="col-md-3 ">
        <div className="card p-3 shadow-sm" style={{ height: "100%" }}>
          <div className="card-header d-flex align-items-center justify-content-cente">
            <button
              className="btn btn-outline-dark me-auto"
              onClick={() => handleVolverMesas()}
            >
              <ArrowBackOutline color={"auto"} />
              Volver
            </button>
            <h4 className="text-center text-auto align-middle mx-3">Cuenta </h4>
            <h6 className="text-center fw-bold align-middle h2 text-success">
              Mesa {mesa}
            </h6>
          </div>

          {preVentas.length > 0 ? (
            <>
              <div className="tabla-scroll">
                <table className="table table-borderless table-sm">
                  <tbody>
                    {preVentas.map((item, index) => (
                      <tr key={`${item.id}-${index}`} className="plato-row">
                        <td className="d-flex justify-content-between align-items-center">
                          <div>
                            <span className="d-block fw-bold">
                              {item.plato?.nombre || item.nombre}
                            </span>
                            <small>
                              {item.cantidad} x S/.{" "}
                              {Number(
                                item.plato?.precio || item.precio
                              ).toFixed(2)}
                            </small>
                          </div>
                        </td>
                        <td className="text-right align-middle">
                          <span>
                            S/.{" "}
                            {Number(
                              item.cantidad *
                                (item.plato?.precio || item.precio)
                            ).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Total */}
              <div className="border-top pt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5">Total</span>
                  <span className="h5 fw-bold text-success">
                    S/. {totalPreventa}
                  </span>
                </div>
                <small className="text-muted d-block text-end">
                  IGV: S/. {igv}
                </small>
              </div>
              {/* Puntos de lealtad */}
              <div className="mt-3">
                <div className="d-flex justify-content-between">
                  <div className="bg-light rounded p-2 text-center flex-fill mr-2">
                    <small>Total de Platos</small>
                    <h6 className="text-success mb-0">{preVentas.length}</h6>
                  </div>
                  <div className="bg-light rounded p-2 text-center flex-fill ml-2">
                    <small>Cantidad x Plato</small>
                    <h6 className="text-dark mb-0">
                      {preVentas.reduce((acc, item) => acc + item.cantidad, 0)}
                    </h6>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-muted">
              No hay productos en esta mesa.
            </p>
          )}
        </div>
      </div>

      {/* Card de Pago Total */}
      <div className="col-md-6 h-100">
        <div className="card p-3 shadow-sm">
          <h5>Total a Pagar</h5>
          <div className="d-flex justify-content-between">
            <span>Total a Pagar</span>
            <span className="fw-bold text-success">S/. {totalPreventa}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>IGV</span>
            <span className="fw-normal text-secondary">S/. {igv}</span>
          </div>
          <div className="border-top mt-3 pt-2">
            <div className="d-flex justify-content-between align-items-center">
              <span className="h5">Total</span>
              <span className="h5 fw-bold text-success">
                S/. {totalPreventa}
              </span>
            </div>
          </div>
          {/* Opciones de Boleta/Factura */}
          <div className="mt-4">
            <h6>Tipo de documento</h6>
            <div
              className="btn-group w-100"
              role="group"
              aria-label="Tipo de Documento"
            >
              <button type="button" className="btn btn-outline-dark p-3 w-50">
                <ReceiptOutline color={"auto"} /> Boleta
              </button>
              <button type="button" className="btn btn-outline-dark p-3 w-50">
                <ReceiptOutline color={"auto"} /> Factura
              </button>
            </div>
          </div>

          {/* Métodos de pago */}
          <div className="mt-4">
            <h6>Método de pago</h6>
            <div
              className="btn-group w-100"
              role="group"
              aria-label="Método de Pago"
            >
              <button
                type="button"
                className="btn btn-outline-dark p-3 p-3 w-33"
              >
                <CardOutline color={"auto"} /> Tarjeta
              </button>
              <button type="button" className="btn btn-outline-dark p-3 w-33">
                <CashOutline color={"auto"} /> Efectivo
              </button>
              <button type="button" className="btn btn-outline-dark p-3 w-33">
                <img
                  src="/images/yape-logo.png"
                  alt="Yape"
                  className="img-fluid rounded-pill"
                  style={{ maxHeight: "30px", marginRight: "8px" }}
                />
                Yape
              </button>
              <button type="button" className="btn btn-outline-dark p-3 w-33">
                <img
                  src="/images/plin-log.png"
                  alt="Plin"
                  className="img-fluid rounded-pill"
                  style={{ maxHeight: "30px", marginRight: "8px" }}
                />
                Plin
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button
              className="btn-realizarPedido w-100 h-100 p-3"
              onClick={() => console.log("Realizar Pago")}
            >
              <CheckmarkDoneOutline color={"auto"} />
              Realizar Pago
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card p-3 shadow-sm">
          <h5>Cliente</h5>
          <div className="border-top mt-3 pt-2">
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="align-middle">
                <PersonOutline color={"auto"} />
                <span>Juan Alberto Rodriguez</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
