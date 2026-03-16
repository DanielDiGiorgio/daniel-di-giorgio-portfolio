import type { CareerContent } from "./types";

const careerPt: CareerContent = {
  timeline: [
    {
      company: "PagBrasil",
      role: "Product Owner",
      start: "2025",
      end: "Presente",
      logo: "/companies/pagbrasil.png",
      description:
        "Fintech focada em soluções de pagamento globais.",
    },
    {
      company: "MULTTI",
      role: "Product Owner",
      start: "2023",
      end: "2025",
      logo: "/companies/multti.png",
      description:
        "Software house focada em diversos setores.",
    },
    {
      company: "SigmaTEK",
      role: "Integração de Sistemas",
      start: "2022",
      end: "2023",
      logo: "/companies/sigmatek.png",
      description:
        "Soluções CAD/CAM para chão de fábrica.",
    },
    {
      company: "Unimed",
      role: "Suporte de TI",
      start: "2019",
      end: "2021",
      logo: "/companies/unimed.png",
      description:
        "Sistema e soluções para private healthcare.",
    },
    {
      company: "Canoastec",
      role: "Suporte Técnico",
      start: "2019",
      end: "2019",
      logo: "/companies/canoastec.png",
      description:
        "Sustentação de toda parte de tecnologia do município de Canoas.",
    },
  ],
  chapters: [
    {
      id: "canoastec",
      company: "Canoastec",
      title: "O Começo",
      narrative:
        "Minha jornada começou no setor público, oferecendo suporte técnico para departamentos municipais de Canoas. Foi meu primeiro contato com sistemas reais e problemas reais.",
      image: "/companies/canoastec.png",
      backgroundEffect: "grid",
      steps: [{ title: "Suporte Técnico", date: "2018" }],
    },
    {
      id: "unimed",
      company: "Unimed",
      title: "Entendendo Sistemas em Escala",
      narrative:
        "Trabalhar na área da saúde me ensinou o quão críticos são sistemas confiáveis. A tecnologia deixou de ser apenas infraestrutura e passou a impactar diretamente a vida das pessoas.",
      image: "/companies/unimed.png",
      backgroundEffect: "greenGlow",
      steps: [{ title: "Suporte de TI", date: "2019" }],
    },
    {
      id: "sigmatek",
      company: "SigmaTEK",
      title: "Integração e Complexidade",
      narrative:
        "Na SigmaTEK trabalhei com integrações entre ERPs e plataformas corporativas. Foi onde comecei a entender a complexidade por trás dos sistemas digitais.",
      image: "/companies/sigmatek.png",
      backgroundEffect: "integration",
      steps: [{ title: "Integração de Sistemas", date: "2020" }],
    },
    {
      id: "multti",
      company: "MULTTI",
      title: "Tornando-me Product Owner",
      narrative:
        "Sempre fui uma pessoa criativa. Como suporte eu via sistemas sendo construídos, mas não podia opinar. Tornar-me Product Owner foi a forma de participar da criação de soluções.",
      image: "/companies/multti.png",
      backgroundEffect: "workflow",
      steps: [{ title: "Product Owner", date: "2021" }],
    },
    {
      id: "pagbrasil",
      company: "PagBrasil",
      title: "Construindo Produtos Reais",
      narrative:
        "Na PagBrasil trabalho com integrações de API e desenvolvimento de produtos.",
      image: "/companies/pagbrasil.png",
      backgroundEffect: "apiFlow",
      steps: [{ title: "Product Owner", date: "2024" }],
    },
  ],
};

export default careerPt;
