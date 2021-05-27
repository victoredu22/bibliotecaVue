import { fetchToken } from "@/helper/axios";
import { formateoFecha } from "../helper/fechaSql";

/**
 * helper que nos ayuda a ver las paginaciones y datos de los pedidos
 * */
const pedidosItems = async (param) => {
	const { activeAlumno, activeCurso, idCursos, page, buscador } = param;

	return await fetchToken(
		`searchLibros?page=${page}`,
		{
			buscador: buscador ? buscador : "undefined",
			idCursos,
			idAlumno: activeAlumno ? activeAlumno.idAlumno : "undefined",
		},
		"POST"
	);
};

const formatFechaPedido = (pedidos) => {
	return pedidos.map((pedido) => ({
		...pedido,
		fechaEntrega: formateoFecha(pedido.fechaEntrega),
		fechaRetiro: formateoFecha(pedido.fechaRetiro),
	}));
};
export { pedidosItems, formatFechaPedido };
