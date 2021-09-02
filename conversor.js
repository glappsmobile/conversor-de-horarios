const convertDiasToArray = (json) => {
    //PEGA O JSON BRUTO E CONVERTE NUM ARRAY MAIS LEGÍVEL
    const diasLabel = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"]
    const diasObject = JSON.parse(json)
    const diasKeys = Object.keys(diasObject);
    const diasArray = [];

    diasKeys.forEach(key => {
        const dia = diasLabel[Number(key) - 1];
        diasArray.push({ dia, ...diasObject[key] })
    })
    return diasArray;
}

const getHorariosAtivos = (horarios) => {
    //PEGA O OBJETO DE HORARIOS E RETORNA UM ARRAY CONTENDO OS HORARIOS COM VALOR MAIOR QUE 0
    const horariosAtivos = [];
    Object.keys(horarios).forEach(key => {
        if (horarios[key] !== 0) horariosAtivos.push({horario: key, vagas: horarios[key]})
    })
    return horariosAtivos
}

const getDiasAtivos = (dias) => {
    //FILTRA APENAS OS DIAS CO=M ATIVO = "1" E COM PELO MENOS UM HORARIO COM VAGAS MAIOR QUE 0
    return dias.filter(dia => dia.ativo === "1").map(dia => {
    const horariosArray = getHorariosAtivos(dia.horarios);
    if (horariosArray.length > 0) {
        dia.horarios = horariosArray;
        return dia;
    }
}).filter(dia => dia)
}

const converterJson = () => {
    //O ARRAY FINAL COM DADOS TRATADOS, PRONTOS PARA SEREM INSERIDOS NO SELECT
    const diasJson = document.querySelector('input').value;
    diasAtivos = getDiasAtivos(convertDiasToArray(diasJson))
    setSelectDias(dias);

    const selectHorarios = document.querySelector('select#horarios');
    selectHorarios.innerHTML = "";
}

converterJson();