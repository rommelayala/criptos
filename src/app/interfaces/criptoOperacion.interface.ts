
export interface CriptoOperacionInterface {
  forEach(arg0: (operacionVigente: any) => void);
  symbol: string;
  name: string;
  plataforma: string;
  monedaFiat: string;
  // precios
  precioCompraUnitario: number;
  precioCostoUnitarioReal: number;
  precioVentaUnitario?: number;
  // fechas
  fechaCompra: Date;
  fechaVenta?: Date;
  comisionCompra: number;
  comisionVenta: number;
  // utilidad
  utilidadMoneda?: number;
  utilidadPorcentaje?: number;

}
