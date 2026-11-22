import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ARCHITECTURE_BLUEPRINTS } from '../data/portfolioData';

export const ArchitectureExplorer: React.FC = () => {
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>(ARCHITECTURE_BLUEPRINTS[0].id);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);

  const blueprint =
    ARCHITECTURE_BLUEPRINTS.find((item) => item.id === activeBlueprintId) ?? ARCHITECTURE_BLUEPRINTS[0];
  const selectedNode = blueprint.nodes[activeNodeIndex] ?? blueprint.nodes[0];

  const handleBlueprintChange = (id: string) => {
    setActiveBlueprintId(id);
    setActiveNodeIndex(0);
  };

  return (
    <div className="bg-white dark:bg-[#121620] border border-[#E5E7EB] dark:border-[#232A38] rounded-2xl p-6 lg:p-7 flex flex-col justify-between h-full transition-colors">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-[#E5E7EB] dark:border-[#1E2430]">
          <div>
            <p className="text-xs font-mono text-[#6B7280] dark:text-[#9CA3AF] tracking-tight">
              Interactive Production Blueprints
            </p>
            <h2 className="text-lg font-semibold text-[#111318] dark:text-white tracking-tight mt-0.5">
              {blueprint.title}
            </h2>
          </div>
          <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF] whitespace-nowrap shrink-0">
            Click any stage to inspect
          </span>
        </div>

        {/* Blueprint Selector */}
        <div
          role="tablist"
          aria-label="Production architecture blueprints"
          className="mt-4 grid grid-cols-3 gap-1 p-1 bg-[#F3F4F6] dark:bg-[#0B0D12] border border-transparent dark:border-[#1E2430] rounded-lg"
        >
          {ARCHITECTURE_BLUEPRINTS.map((item) => {
            const isActive = item.id === blueprint.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleBlueprintChange(item.id)}
                className={`px-2.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                  isActive
                    ? 'bg-white dark:bg-[#2563EB] text-[#111318] dark:text-white shadow-xs'
                    : 'text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white'
                }`}
              >
                {item.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Context Line */}
        <p className="mt-4 text-xs text-[#4B5563] dark:text-[#D1D5DB] leading-relaxed">
          {blueprint.context}
        </p>

        {/* Interactive Pipeline Nodes */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {blueprint.nodes.map((node, index) => {
            const isSelected = index === activeNodeIndex;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeIndex(index)}
                className={`text-left p-4 rounded-xl border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                  isSelected
                    ? 'bg-[#111318] dark:bg-[#1A2438] border-[#111318] dark:border-[#3B82F6] text-white'
                    : 'bg-[#FAFAFA] dark:bg-[#0D1017] border-[#E5E7EB] dark:border-[#1E2430] text-[#111318] dark:text-white hover:border-[#9CA3AF] dark:hover:border-[#374151]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[11px] font-mono tabular-nums ${
                      isSelected ? 'text-[#93C5FD]' : 'text-[#1D4ED8] dark:text-[#60A5FA]'
                    }`}
                  >
                    {node.stage}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isSelected ? 'text-white translate-x-0.5' : 'text-[#9CA3AF]'
                    }`}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1.5 text-sm font-semibold leading-snug">{node.title}</p>
                <p
                  className={`mt-1 text-xs font-mono truncate ${
                    isSelected ? 'text-[#D1D5DB]' : 'text-[#6B7280] dark:text-[#9CA3AF]'
                  }`}
                >
                  {node.tech}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Node Inspection Panel */}
      <motion.div
        key={`${blueprint.id}-${selectedNode.id}`}
        initial={{ opacity: 0.5, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.16 }}
        className="mt-5 pt-5 border-t border-[#E5E7EB] dark:border-[#1E2430]"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-xs font-mono text-[#1D4ED8] dark:text-[#60A5FA]">
            {selectedNode.stage} · {selectedNode.title}
          </p>
          <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">{selectedNode.tech}</p>
        </div>
        <p className="mt-2 text-sm text-[#111318] dark:text-[#E5E7EB] leading-relaxed">
          {selectedNode.detail}
        </p>
        <p className="mt-2.5 text-xs text-[#4B5563] dark:text-[#9CA3AF]">
          <span className="font-semibold text-[#111318] dark:text-white">Outcome: </span>
          {selectedNode.impact}
        </p>
      </motion.div>
    </div>
  );
};
