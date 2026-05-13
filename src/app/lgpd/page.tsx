import LegalPage from "@/components/ui/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LGPD — Voic.IA",
  description: "Saiba como a Voic.IA está em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
};

export default function LGPDPage() {
  return (
    <LegalPage
      title="LGPD — Lei Geral de Proteção de Dados"
      subtitle="A Voic.IA está comprometida com a conformidade à Lei nº 13.709/2018 (LGPD). Esta página descreve como exercemos esse compromisso na prática."
      updatedAt="13 de maio de 2026"
      sections={[
        {
          title: "Sobre a LGPD",
          content: "A Lei Geral de Proteção de Dados Pessoais (LGPD) é a legislação brasileira que regula o tratamento de dados pessoais por pessoas físicas e jurídicas, com o objetivo de proteger os direitos fundamentais de liberdade, privacidade e o livre desenvolvimento da personalidade.",
        },
        {
          title: "Papel da Voic.IA no tratamento de dados",
          content: [
            "Controlador: a Voic.IA atua como controladora dos dados pessoais dos usuários da plataforma (clientes, colaboradores e visitantes).",
            "Operador: em relação aos dados dos clientes finais atendidos pelos agentes de voz, a Voic.IA atua como operadora, processando dados conforme instruções do cliente controlador.",
            "Suboperadores: podemos contratar suboperadores (provedores de nuvem, serviços de telefonia) que processam dados em nosso nome e sob nossas instruções.",
          ],
        },
        {
          title: "Bases legais utilizadas",
          content: [
            "Execução de contrato (art. 7º, V): dados necessários para prestar o serviço contratado.",
            "Consentimento (art. 7º, I): comunicações de marketing, cookies não essenciais e funcionalidades opcionais.",
            "Legítimo interesse (art. 7º, IX): melhoria contínua do serviço, prevenção a fraudes e segurança da plataforma.",
            "Cumprimento de obrigação legal (art. 7º, II): retenção de dados exigida por lei tributária, trabalhista ou regulatória.",
          ],
        },
        {
          title: "Direitos do titular",
          content: [
            "Confirmação da existência de tratamento de dados.",
            "Acesso aos dados pessoais tratados.",
            "Correção de dados incompletos, inexatos ou desatualizados.",
            "Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.",
            "Portabilidade dos dados a outro fornecedor de serviço.",
            "Eliminação dos dados tratados com base em consentimento.",
            "Informação sobre compartilhamento com terceiros.",
            "Revogação do consentimento a qualquer momento.",
          ],
        },
        {
          title: "Como exercer seus direitos",
          content: "Para exercer qualquer um dos direitos acima, entre em contato com nosso Encarregado de Dados (DPO) pelo e-mail privacidade@voicia.com.br. Responderemos em até 15 dias corridos. Podemos solicitar verificação de identidade antes de processar a solicitação.",
        },
        {
          title: "Encarregado de Proteção de Dados (DPO)",
          content: "A Voic.IA designou um Encarregado de Proteção de Dados responsável por atuar como canal de comunicação entre a empresa, os titulares de dados e a Autoridade Nacional de Proteção de Dados (ANPD). Contato: privacidade@voicia.com.br",
        },
        {
          title: "Transferência internacional de dados",
          content: "Alguns de nossos suboperadores estão localizados fora do Brasil. Nestes casos, garantimos que as transferências internacionais de dados são realizadas com as devidas garantias de proteção, em conformidade com o art. 33 da LGPD, incluindo cláusulas contratuais padrão e verificação do nível de proteção do país destinatário.",
        },
        {
          title: "Incidentes de segurança",
          content: "Em caso de incidente de segurança com potencial risco ou dano relevante aos titulares, notificaremos a ANPD e os titulares afetados no prazo determinado pela legislação, com informações sobre a natureza do incidente, dados envolvidos e medidas adotadas.",
        },
        {
          title: "Retenção e eliminação de dados",
          content: [
            "Dados de conta: mantidos pelo período de vigência do contrato e por até 5 anos após o encerramento, conforme obrigações fiscais.",
            "Transcrições de chamadas: retidas por 90 dias por padrão (configurável pelo administrador).",
            "Logs de acesso: retidos por 6 meses, conforme Marco Civil da Internet.",
            "Após os prazos de retenção, os dados são eliminados de forma segura e irreversível.",
          ],
        },
        {
          title: "Autoridade Nacional de Proteção de Dados",
          content: "Caso não fique satisfeito com nossa resposta, você tem o direito de apresentar reclamação à ANPD (Autoridade Nacional de Proteção de Dados) pelo portal gov.br/anpd.",
        },
      ]}
    />
  );
}
