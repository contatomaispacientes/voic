import LegalPage from "@/components/ui/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies — Voic.IA",
  description: "Entenda como a Voic.IA utiliza cookies e tecnologias similares.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Política de Cookies"
      subtitle="Esta política explica o que são cookies, quais utilizamos na plataforma Voic.IA, para que servem e como você pode gerenciá-los."
      updatedAt="13 de maio de 2026"
      sections={[
        {
          title: "O que são cookies",
          content: "Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você acessa um site ou plataforma. Eles permitem que o sistema reconheça seu navegador em visitas subsequentes, mantendo preferências e sessões ativas.",
        },
        {
          title: "Cookies essenciais",
          content: [
            "Sessão de autenticação: mantém você conectado durante o uso da plataforma.",
            "Preferências de segurança: proteção contra CSRF e validação de tokens.",
            "Balanceamento de carga: direciona requisições para os servidores corretos.",
            "Esses cookies são estritamente necessários e não podem ser desativados sem comprometer o funcionamento do serviço.",
          ],
        },
        {
          title: "Cookies de performance e análise",
          content: [
            "Coletados apenas com seu consentimento explícito.",
            "Utilizados para medir como os usuários interagem com a plataforma (páginas visitadas, tempo de sessão, fluxos de navegação).",
            "Os dados são anonimizados e agregados — não identificam você individualmente.",
            "Provedor atual: dados processados internamente via sistema de telemetria próprio.",
          ],
        },
        {
          title: "Cookies funcionais",
          content: [
            "Armazenam preferências de idioma, tema e configurações de interface.",
            "Permitem que a plataforma lembre escolhas feitas em sessões anteriores.",
            "Coletados com seu consentimento e mantidos por até 365 dias.",
          ],
        },
        {
          title: "Cookies de terceiros",
          content: [
            "Atualmente não utilizamos cookies de redes publicitárias.",
            "Integrações com serviços externos (ex: provedores de calendário, CRMs) podem definir seus próprios cookies ao conectar sua conta — consulte as políticas desses serviços.",
            "Não compartilhamos dados de cookies com plataformas de anúncios.",
          ],
        },
        {
          title: "Duração dos cookies",
          content: [
            "Cookies de sessão: expiram quando você fecha o navegador.",
            "Cookies persistentes: permanecem por período definido (de 30 dias a 1 ano, conforme a finalidade).",
            "Você pode excluir cookies a qualquer momento pelas configurações do seu navegador.",
          ],
        },
        {
          title: "Como gerenciar cookies",
          content: [
            "Pelo painel de consentimento disponível na plataforma, ao primeiro acesso.",
            "Pelas configurações do seu navegador (Chrome, Firefox, Safari, Edge oferecem opções nativas de gerenciamento de cookies).",
            "Desativar cookies essenciais pode afetar o funcionamento do serviço.",
            "Desativar cookies analíticos não impede o uso da plataforma.",
          ],
        },
        {
          title: "Atualizações desta política",
          content: "Esta política pode ser atualizada para refletir mudanças na plataforma ou na legislação. Comunicaremos alterações relevantes com antecedência por e-mail ou notificação no sistema.",
        },
      ]}
    />
  );
}
