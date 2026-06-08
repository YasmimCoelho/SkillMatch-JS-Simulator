const candidato = {
    name: "Yasmin Coelho",
    area: "frontend",
    skills: [
        "html",
        "css",
        "javascript",
        "php",
        "jquery"
    ],
    mesesExperiencia: 9
};

class Vaga {
    constructor(
        id,
        empresa,
        position,
        requirements,
        salario
    ) {
        this.id = id;
        this.empresa = empresa;
        this.position = position;
        this.salario = salario;
        this.requirements = requirements;
    }

    exibirResumo() {
        return `${this.position} na empresa ${this.empresa}`;
    }
}

class VagaFrontEnd extends Vaga {

    constructor(
        id,
        empresa,
        position,
        requirements,
        salario,
        nivel
    ) {
        super(
            id,
            empresa,
            position,
            requirements,
            salario
        );

        this.nivel = nivel;
    }

    exibirNivel() {
        return `Nível: ${this.nivel}`;
    }
}

const vagas = [
    new VagaFrontEnd(
        1,
        "Useall",
        "Pessoa desenvolvedora jr",
        [
            "css",
            "javascript",
            "github",
            "html"
        ],  
        3900,
        "Desenvolvimento jr"
    ),

    new VagaFrontEnd(
        2,
        "Thomson Reuters",
        "Desenvolvedor front-end Pleno",
        [
            "javascript",
            "css",
            "clean code",
            "react",
            "vanillajs"
        ],
        5250,
        "Desenvolvimento pleno"
    ),
    new VagaFrontEnd(
        3,
        "Betha sistemas",
        "Arquiteto de software I",
        [
            "java",
            "devops",
            "kanban",
            "kubernetes"
        ],
        7900,
        "Arquitetura de software sr"
    )
];

const calculoCompatibilidade = (candidato, vaga) => {

    const { skills } = candidato;
    const { requirements, empresa, position } = vaga;

    const pontosPositivos = requirements.filter(
        requirement => skills.includes(requirement)
    );

    const pontosNegativos = requirements.filter(
        requirement => !skills.includes(requirement)
    );

    const compatibilidade = (pontosPositivos.length / requirements.length) * 100;

    let classificacao = "";

    if (compatibilidade >= 80) {
        classificacao = "Compatibilidade alts";
    } else if (compatibilidade >= 50) {
        classificacao = "Compatibilidade media";
    } else {
        classificacao = "Compatibilidade pequena";
    }

    return {
        empresa,
        position,
        compatibilidade,
        classificacao,
        encontradas: pontosPositivos,
        faltantes: pontosNegativos
    };
};

const resultados = vagas.map(vaga =>
    calculoCompatibilidade(candidato, vaga)
);

const vagaCompativel = resultados.reduce((melhor, atual) =>
  atual.compatibilidade > melhor.compatibilidade
    ? atual
    : melhor
);

while (true) {
  const opcao = prompt(`
    SKILLMATCH SIMULATOR

    1-Consultar candidato
    2-Consultar vagas
    3-Verificar compatibilidade das vagas
    4-Verificar vaga mais compatível
    5-Verificar habilidades faltantes
    6-Encerrar o programa
  `);

  switch (opcao) {
    case "1":
      alert(`
        FICHA DO CANDIDATO

        Nome: ${candidato.name}
        Área: ${candidato.area}
        Experiência: ${candidato.mesesExperiencia} meses
        Skills: ${candidato.skills.join(", ")} 
      `);
      break;

    case "2":
      alert(
        vagas.map(vaga =>
          `${vaga.exibirResumo()}
          Empresa: ${vaga.empresa}
          Cargo: ${vaga.position}
          Salário: R$ ${vaga.salario}
          ${vaga.exibirNivel()}
          Requisitos: ${vaga.requirements.join(", ")}`).join("\n============\n"));
      break;

    case "3":
      alert(
        resultados.map(resultado =>
          `
            Empresa: ${resultado.empresa}
            Cargo: ${resultado.position}
            Compatibilidade: ${resultado.compatibilidade}%
            Habilidades encontradas: ${resultado.encontradas.join(", ")}
            Classificação: ${resultado.classificacao}`).join("\n==========\n"));
      break;

    case "4":
      alert(`
        VAGA MAIS COMPATÍVEL

        Empresa: ${vagaCompativel.empresa}
        Cargo: ${vagaCompativel.position}
        Compatibilidade: ${vagaCompativel.compatibilidade}%
        Classificação: ${vagaCompativel.classificacao}
        Habilidades encontradas: ${vagaCompativel.encontradas.join(", ")}
        Habilidades faltantes: ${vagaCompativel.faltantes.join(", ")}
        `);
      break;

    case "5":
      alert(
        resultados.map(resultado =>
          `
          Empresa: ${resultado.empresa}
          Habilidades faltantes: ${resultado.faltantes.join(", ")}`).join("\n===========\n"));
      break;

    case "6":
      alert("Até mais!");
      break;
    default:
      alert("Opção não encontrada. Tente novamente!");
  }
  if (opcao === "6") {
    break;
  }
}