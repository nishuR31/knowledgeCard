import type { KnowledgeCard as KnowledgeCardType } from '../../data/hooks';

export default function KnowledgeCard({ card }: { card: KnowledgeCardType }) {
  return (
    <div className="p-6 card shadow-lg hover:shadow-2xl max-w-5xl transition-all duration-300 ">
      <h2 className="text-2xl font-extrabold text-primary mb-2">
        {card.name}
      </h2>
      <p className="text-muted mb-2  line-clamp-2">
        {card.info}
      </p>
      <p className="text-secondary mb-4 line-clamp-3">
        {card.why}
      </p>
      <pre className="code p-3 rounded overflow-x-auto text-sm font-mono">
        <code>{card.code}</code>
      </pre>
    </div>
  );
}
