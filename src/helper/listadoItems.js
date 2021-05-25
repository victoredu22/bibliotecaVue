import {fetchToken} from '@/helper/axios'
import {formateoFecha} from '../helper/fechaSql';
require('moment/locale/es')


import {diaActual} from '../helper/fechaSql';

/**
 * helper que nos ayuda a ver las paginaciones y datos de los pedidos
 * */
const pedidosItems = async(param)=>{

  
  const {activeAlumno,activeCurso,idCursos,page,buscador} = param


  if(activeAlumno != undefined  && buscador != undefined){
    return await fetchToken(`searchPedidoAlumnoLibro?page=${page}`,{buscador,idAlumno:activeAlumno.idAlumno},'POST');
  } 

  if(activeCurso > 0 && buscador != undefined){
    return await fetchToken(`searchPedidoCursoLibro?page=${page}`,{idCursos,buscador},'POST');
  }


  if(activeAlumno != undefined){
    return await fetchToken(`searchPedidoAlumno/${activeAlumno.idAlumno}?page=${page}`);
  }


  if(activeCurso > 0){
    return await fetchToken(`searchCursoByIds?page=${page}`,{idCursos},'POST'); 
  }

  
  if(buscador != undefined && buscador.length > 0){

    return await fetchToken(`searchPedido?buscador=${buscador}`);
  }

  return await fetchToken(`pedidosAll?page=${page}`);;
}

const formatFechaPedido = (pedidos)=>{
  return pedidos.map((pedido) => ({
    ...pedido,
   fechaEntrega: formateoFecha(pedido.fechaEntrega),
   fechaRetiro:formateoFecha(pedido.fechaRetiro),
 }));
}
export {pedidosItems,formatFechaPedido}