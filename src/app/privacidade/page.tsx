import LegalPage from "@/components/ui/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade — Voic.IA",
  description: "Saiba como a Voic.IA coleta, usa e protege seus dados pessoais.",
};

export default function PrivacidadePage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      subtitle="Esta política descreve como a Voic.IA coleta, utiliza, armazena e protege suas informações pessoais ao utilizar nossa plataforma de agentes de voz com inteligência artificial."
      updatedAt="13 de maio de 2026"
      sections={[
        {
          title: "Informações que coletamos",
          content: [
            "Dados de cadastro: nome, e-mail, telefone e informações da empresa fornecidos no momento do registro.",
            "Dados de uso: logs de chamadas, transcrições geradas pelos agentes de voz, métricas de performance e interações com a plataforma.",
            "Dados técnicos: endereço IP, tipo de navegador, sistema operacional, cookies de sessão e dados de telemetria.",
            "Dados de pagamento: processados com segurança por parceiros certificados PCI-DSS — não armazenamos dados de cartão.",
          ],
        },
        {
          title: "Como utilizamos suas informações",
          content: [
            "Fornecer, operar e melhorar continuamente a plataforma Voic.IA.",
            "Treinar e personalizar os modelos de voz de acordo com as configurações do agente.",
            "Enviar comunicações transacionais (confirmações, alertas de conta) e, com seu consentimento, comunicações de marketing.",
            "Cumprir obrigações legais e regulatórias aplicáveis.",
            "Prevenir fraudes, abusos e garantir a segurança da plataforma.",
          ],
        },
        {
          title: "Compartilhamento de dados",
          content: [
            "Não vendemos seus dados pessoais a terceiros.",
            "Podemos compartilhar dados com parceiros de infraestrutura (provedores de nuvem, serviços de telefonia) exclusivamente para a prestação do serviço.",
            "Dados podem ser divulgados mediante ordem judicial ou solicitação legítima de autoridade competente.",
            "Em caso de fusão ou aquisição, os dados serão transferidos sob os mesmos termos desta política.",
          ],
        },
        {
          title: "Armazenamento e segurança",
          content: "Seus dados são armazenados em servidores seguros com criptografia em trânsito (TLS 1.3) e em repouso (AES-256). Aplicamos controles de acesso baseados em função (RBAC), monitoramento contínuo e auditorias periódicas de segurança. Transcrições de chamadas são retidas por padrão por 90 dias, período configurável pelo administrador da conta.",
        },
        {
          title: "Seus direitos",
          content: [
            "Acesso: solicitar uma cópia dos dados pessoais que mantemos sobre você.",
            "Retificação: corrigir dados imprecisos ou incompletos.",
            "Exclusão: solicitar a exclusão de seus dados, respeitando obrigações legais de retenção.",
            "Portabilidade: receber seus dados em formato estruturado e legível por máquina.",
            "Oposição: opor-se ao tratamento de seus dados para fins de marketing.",
            "Revogação de consentimento: retirar consentimentos concedidos a qualquer momento.",
          ],
        },
        {
          title: "Cookies",
          content: "Utilizamos cookies essenciais para o funcionamento da plataforma e cookies analíticos (com seu consentimento) para entender como os usuários interagem com o serviço. Consulte nossa Política de Cookies para detalhes sobre tipos, finalidades e como gerenciá-los.",
        },
        {
          title: "Alterações nesta política",
          content: "Podemos atualizar esta política periodicamente. Notificaremos usuários sobre mudanças materiais por e-mail ou notificação na plataforma com antecedência mínima de 15 dias. O uso continuado após a vigência das alterações implica aceitação.",
        },
        {
          title: "Contato",
          content: "Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato com nosso Encarregado de Dados (DPO): privacidade@voicia.com.br",
        },
      ]}
    />
  );
}
