import LegalPage from "@/components/ui/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso — Voic.IA",
  description: "Leia os termos e condições de uso da plataforma Voic.IA.",
};

export default function TermosPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      subtitle="Ao criar uma conta ou utilizar a plataforma Voic.IA, você concorda com os presentes Termos de Uso. Leia atentamente antes de prosseguir."
      updatedAt="13 de maio de 2026"
      sections={[
        {
          title: "Aceitação dos termos",
          content: "O uso da plataforma Voic.IA, fornecida pela Sistemateasy (doravante \"Voic.IA\" ou \"nós\"), está condicionado à aceitação integral destes Termos de Uso. Caso não concorde com qualquer disposição, não utilize o serviço.",
        },
        {
          title: "Descrição do serviço",
          content: "A Voic.IA é uma plataforma SaaS de agentes de voz com inteligência artificial para automação de chamadas telefônicas de entrada e saída, incluindo agendamentos, atendimento ao cliente, qualificação de leads e outras interações de voz configuráveis pelo usuário.",
        },
        {
          title: "Cadastro e conta",
          content: [
            "Você deve fornecer informações verdadeiras, precisas e atualizadas no momento do cadastro.",
            "É responsabilidade do usuário manter a confidencialidade de suas credenciais de acesso.",
            "Cada conta é pessoal e intransferível, salvo permissão expressa para contas corporativas.",
            "Menores de 18 anos não podem criar contas sem autorização de responsável legal.",
            "Nos reservamos o direito de suspender ou encerrar contas que violem estes termos.",
          ],
        },
        {
          title: "Uso aceitável",
          content: [
            "Utilizar a plataforma exclusivamente para fins lícitos e em conformidade com a legislação aplicável.",
            "Obter consentimento explícito dos destinatários antes de realizar chamadas automatizadas, conforme exigido pelo Marco Civil da Internet e demais normas.",
            "Não utilizar os agentes de voz para práticas de spam, fraude, assédio ou qualquer atividade ilegal.",
            "Não tentar acessar sistemas ou dados de outros usuários sem autorização.",
            "Não realizar engenharia reversa, decompilar ou desmontar qualquer componente da plataforma.",
          ],
        },
        {
          title: "Planos, pagamento e cancelamento",
          content: [
            "Os planos e preços vigentes estão descritos na página de Preços e podem ser alterados mediante aviso prévio de 30 dias.",
            "O faturamento é mensal ou anual, conforme escolha do usuário no momento da assinatura.",
            "Minutos de chamada não utilizados em um ciclo não são transferidos para o período seguinte.",
            "O cancelamento pode ser realizado a qualquer momento pelo painel; não há multa por rescisão antecipada.",
            "Reembolsos são avaliados individualmente e concedidos a critério da Voic.IA em casos justificados.",
          ],
        },
        {
          title: "Propriedade intelectual",
          content: "A plataforma Voic.IA, incluindo código-fonte, modelos de IA, interfaces, logotipos e documentação, é propriedade exclusiva da Sistemateasy e protegida por leis de propriedade intelectual. O uso do serviço não transfere qualquer direito de propriedade ao usuário.",
        },
        {
          title: "Dados gerados pelo usuário",
          content: "Scripts de agentes, configurações e dados inseridos pelo usuário permanecem de sua propriedade. Ao utilizar a plataforma, você concede à Voic.IA licença limitada para processar esses dados com a finalidade exclusiva de prestar o serviço contratado.",
        },
        {
          title: "Limitação de responsabilidade",
          content: "A Voic.IA não se responsabiliza por danos indiretos, incidentais ou consequentes decorrentes do uso da plataforma. Nossa responsabilidade total é limitada ao valor pago pelo usuário nos últimos 3 meses de serviço.",
        },
        {
          title: "Disponibilidade do serviço",
          content: "Buscamos manter disponibilidade mínima de 99,5% ao mês. Manutenções programadas serão comunicadas com antecedência. Indisponibilidades fora do controle da Voic.IA (falhas de provedores terceiros, casos fortuitos) não geram direito a ressarcimento.",
        },
        {
          title: "Foro e legislação aplicável",
          content: "Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de São Paulo — SP como competente para dirimir quaisquer litígios decorrentes desta relação, com renúncia expressa a qualquer outro.",
        },
      ]}
    />
  );
}
