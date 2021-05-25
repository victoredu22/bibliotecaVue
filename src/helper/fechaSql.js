import moment from 'moment'
require('moment/locale/es')

const diaActual = ()=>{
	const date = moment().format('L');  
	const fechaFinal = date.split("/");
	const terminida = `${fechaFinal[2]}-${fechaFinal[1]}-${fechaFinal[0]}`;
	return terminida;
};
const formateoFecha = (date) => {
	//const fecha = "2021-03-27 23:54:21";
	const fecha2 = date.split(" ");
	const fecha3 = fecha2[0];
	const fechaFinal = fecha3.split("-");
	const terminida = `${fechaFinal[0]}/${fechaFinal[1]}/${fechaFinal[2]}`;

  const m = moment(new Date(terminida));

  const jj = m.format('LL'); // '1. Juni 2019'

  return m.format('LL');
};

const diasMes = ()=>{
	const primerDiaMes = moment().startOf('month').format('YYYY-MM-DD');
	const ultimoDiaMes   = moment().endOf('month').format('YYYY-MM-DD');

	return {primerDiaMes,ultimoDiaMes}
}
export { diaActual,formateoFecha,diasMes };
