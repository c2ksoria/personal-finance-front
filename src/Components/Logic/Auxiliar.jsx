function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  const FormatDate = (date) =>{
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }
  function formatearFecha(fecha) {
    // Dividir la fecha en sus componentes (año, mes y día)
    console.log(fecha)
    const partes = fecha.split('-');

    // Obtener el año, mes y día
    const year = partes[0];
    const month = partes[1];
    const day = partes[2];

    // Formatear el mes y el día con ceros a la izquierda si es necesario
    const monthFormatted = month.length === 1 ? '0' + month : month;
    const dayFormatted = day.length === 1 ? '0' + day : day;

    // Concatenar los componentes formateados para obtener la nueva fecha en el formato deseado
    const fechaFormateada = `${year}-${monthFormatted}-${dayFormatted}`;
    console.log(fechaFormateada)
    return fechaFormateada;
}

export default FormatDate;