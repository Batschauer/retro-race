import Link from "next/link";

export default function RegulamentoPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-lg">
      <Link
        href="/"
        className="label-md mb-6 inline-block text-tertiary hover:text-secondary focus-visible:ghost-outline"
      >
        &gt; VOLTAR_AOS_RESULTADOS
      </Link>

      <h1 className="display-lg translate-x-0 text-balance text-on-surface sm:-translate-x-6">REGULAMENTO</h1>

      <section className="mt-10 bg-surface-container-low px-4 py-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-primary">Objetivo</h2>
        <p className="body-lg mt-4 text-on-surface">
          Garantir uma corrida baseada em habilidade, consistência e respeito, sem uso de contato como
          vantagem.
        </p>
      </section>

      <section className="mt-4 bg-surface-container-lowest px-4 py-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-primary">
          1. Regra geral de contato
        </h2>
        <p className="body-lg mt-4 text-on-surface">
          Contato não é permitido como estratégia.
        </p>
        <p className="body-lg mt-4 text-on-surface">
          Pequenos toques podem acontecer, mas se causarem prejuízo haverá penalidade.
        </p>
      </section>

      <section className="mt-4 bg-surface-container-low px-4 py-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-primary">2. Condutas proibidas</h2>
        <ul className="mt-4 flex list-none flex-col gap-4 text-on-surface">
          <li className="body-lg pl-0">
            <span className="label-md text-secondary">EMPURRÃO · </span>
            Empurrão por trás: bater na traseira do kart à frente, principalmente em frenagens.
          </li>
          <li className="body-lg pl-0">
            <span className="label-md text-secondary">DIVEBOMB · </span>
            Divebomb (mergulho forçado): entrar na curva sem estar lado a lado antes da frenagem.
          </li>
          <li className="body-lg pl-0">
            <span className="label-md text-secondary">FECHADA · </span>
            Fechada perigosa: mudar de linha causando contato ou empurrar adversário para fora da pista.
          </li>
        </ul>
      </section>

      <section className="mt-4 bg-surface-container-lowest px-4 py-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-primary">
          3. Regras de disputa limpa
        </h2>
        <ul className="mt-4 flex flex-col gap-3 text-on-surface">
          <li className="body-lg">
            <span className="font-semibold text-secondary">Defesa: </span>
            apenas uma mudança de direção.
          </li>
          <li className="body-lg">
            <span className="font-semibold text-secondary">Ultrapassagem: </span>
            deve acontecer sem contato.
          </li>
          <li className="body-lg">
            <span className="font-semibold text-secondary">Lado a lado: </span>
            ambos têm direito ao espaço.
          </li>
          <li className="body-lg">
            <span className="font-semibold text-secondary">Quem vem atrás </span>
            é responsável por evitar colisão.
          </li>
        </ul>
      </section>

      <section className="mt-4 bg-surface-container-low px-4 py-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-primary">
          4. Sistema de penalidades
        </h2>
        <ul className="mt-4 flex flex-col gap-3 text-on-surface">
          <li className="body-lg">
            Toque com prejuízo leve (perda de tempo): <span className="font-semibold text-tertiary">+3 segundos</span>.
          </li>
          <li className="body-lg">
            Toque com rodada ou saída de pista: <span className="font-semibold text-tertiary">+5 segundos</span>.
          </li>
          <li className="body-lg">
            Toque grave ou reincidência: <span className="font-semibold text-tertiary">+10 segundos</span>.
          </li>
        </ul>
      </section>

      <section className="mt-4 bg-surface-container-lowest px-4 py-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-primary">
          5. Devolução de posição
        </h2>
        <p className="body-lg mt-4 text-on-surface">
          Se um piloto causar contato e ganhar posição, deve devolver imediatamente. Isso pode evitar
          penalidade.
        </p>
      </section>

      <section className="mt-4 bg-surface-container-low px-4 py-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-primary">6. Julgamento</h2>
        <p className="body-lg mt-4 text-on-surface">
          As decisões podem ser feitas por consenso após a corrida ou por 1–2 pessoas neutras definidas
          antes da prova.
        </p>
      </section>

      <section className="mt-4 bg-surface-container-lowest px-4 py-6">
        <h2 className="font-display text-xl font-bold tracking-tight text-primary">7. Espírito da corrida</h2>
        <p className="body-lg mt-4 text-on-surface">
          Priorizar controle, previsibilidade e respeito. Evitar manobras de risco. A corrida deve ser
          decidida pela habilidade de pilotagem.
        </p>
      </section>
    </div>
  );
}
