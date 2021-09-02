const opcaoDefault = (label) => `<option value="default">${label}</option>`;
let diasAtivos;
const setSelectDias = () => {
    //A PARTIR DOS DADOS TRATADOS, CRIA OPTIONS DENTRO DO SELECT #dias
    //COM TODOS OS DIAS ATIVOS
    const selectDias = document.querySelector('select#dias');
    selectDias.innerHTML = opcaoDefault("Selecione o dia...")
    diasAtivos.forEach((dia, index) => {
        selectDias.innerHTML += `
        <option value="${index}">${dia.dia}</option>
    `;
    })
}

const setSelectHorarios = (index) => {
    //SE O INDEX FOR 0 OU MAIOR, ACESSA O ARRAY diasAtivos[index].horarios E EXIBE A INFO 
    const selectHorarios = document.querySelector('select#horarios');

    if (index === "default") {
        selectHorarios.innerHTML = "";
        return;
    }

    selectHorarios.innerHTML = opcaoDefault("Selecione o horário...");

    diasAtivos[index].horarios.forEach((horario, index) => {
        const vagasLabel = (horario.vagas === 1) ? "vaga" : "vagas";
        selectHorarios.innerHTML += `
            <option value="${index}">${horario.horario} - ${horario.vagas} ${vagasLabel}</option>
        `;
    } )
}


const converterJson = () => {
    //O ARRAY FINAL COM DADOS TRATADOS, PRONTOS PARA SEREM INSERIDOS NO SELECT
    diasAtivos = getDiasAtivos(convertDiasToArray(diasJson))
    setSelectDias(dias);
}