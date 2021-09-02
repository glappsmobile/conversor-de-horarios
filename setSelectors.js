const opcaoDefault = (label) => `<option value="default">${label}</option>`;

const setSelectDias = (dias) => {
    const selectDias = document.querySelector('select#dias');
    selectDias.innerHTML = opcaoDefault("Selecione o dia...")
    dias.forEach((dia, index) => {
        selectDias.innerHTML += `
        <option value="${index}">${dia.dia}</option>
    `;
    })
}

const setSelectHorarios = (index) => {
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

setSelectDias(diasAtivos);