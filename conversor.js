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
    //FILTRA APENAS OS DIAS C=M ATIVO = "1" E COM PELO MENOS UM HORARIO COM VAGAS MAIOR QUE 0
    return dias.filter(dia => dia.ativo === "1").map(dia => {
    const horariosArray = getHorariosAtivos(dia.horarios);
    if (horariosArray.length > 0) {
        dia.horarios = horariosArray;
        return dia;
    }
}).filter(dia => dia)
}

const updateInfo = () => {
    //PEGA O JSON QUE VEM DO PHP
    fetch('/server.php')
        .then((response) => response.text())
        .then((encodedJson) => {
            //O ARRAY FINAL COM DADOS TRATADOS, PRONTOS PARA SEREM INSERIDOS NO SELECT
            const diasJson = JSON.parse(encodedJson);

            //FILTRA APENAS OS DIAS ATIVOS EM ARRAY PRA FICAR MAIS LEGÍVEL
            diasAtivos = getDiasAtivos(convertDiasToArray(diasJson));

            //ADICIONA AS OPÇÕES LÁ NO SELECT DOS DIAS
            setSelectDias();
        });
}

updateInfo();

