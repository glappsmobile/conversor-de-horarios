const opcaoDefault = (label) => `<option value="default">${label}</option>`;

const setSelectDias = (dias) => {
    //A PARTIR DOS DADOS TRATADOS, CRIA OPTIONS DENTRO DO SELECT #dias
    //COM TODOS OS PASSADOS NO PARAMETRO dias
    const selectDias = document.querySelector('select#dias');

    selectDias.innerHTML = opcaoDefault("Selecione o dia...")
    dias.forEach((dia, index) => {
        selectDias.innerHTML += `
        <option value="${index}">${dia.dia}</option>
    `;
    });

    //SEMPRE QUE O SELECT dias MUDAR, ELE VAI INFORMAR O SELECT horarios
    //PRA MUDAR TAMBÉM DE ACORDO COM OS DADOS DO ARRAY 
    selectDias.onchange = () => {
        const index = selectDias.value;
        setSelectHorarios(dias[index])
    }
}

const setSelectHorarios = (diaSelecionado) => {
    const selectHorarios = document.querySelector('select#horarios');
    
    if (!diaSelecionado) {
        //SE A PRIMEIRA OPÇÃO FOR SELECIONADA, DEIXA O SELECT HORARIOS EM BRANCO
        selectHorarios.innerHTML = "";
        return;
    }

    selectHorarios.innerHTML = opcaoDefault("Selecione o horário...");

    diaSelecionado.horarios.forEach((horario, index) => {
        const vagasLabel = (horario.vagas === 1) ? "vaga" : "vagas";
        selectHorarios.innerHTML += `
            <option value="${index}">${horario.horario} - ${horario.vagas} ${vagasLabel}</option>
        `;
    } )
}

