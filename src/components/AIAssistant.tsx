import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const mockResponses: Record<string, string> = {
  'low': '**Products running low on stock:**\n\n1. **Nitrile Gloves Large** - 234 units (reorder: 500)\n2. **HP Toner 26A** - 45 units (reorder: 30)\n3. **Cardboard Box Medium** - 1,245 units (reorder: 1,000)\n\nRecommendation: Create purchase orders for Nitrile Gloves and HP Toner immediately.',
  'outbound': '**Today\'s outbound performance analysis:**\n\n• Pick rate: 92% (target: 95%)\n• Pack rate: 98% (target: 95%) ✅\n• Ship rate: 96% (target: 98%)\n\n**Root cause:** Zone B picking delays due to forklift FL-03 low battery. Recommend redirecting picks to Zone A temporarily.',
  'utilization': '**Warehouse utilization by location:**\n\n• Northgate DC: 79% (+2.1%)\n• Southgate DC: 70% (+1.5%)\n• Westgate Warehouse: 70% (+0.8%)\n\n**Northgate DC** has the highest utilization. Zone A is at 82% - consider redistributing inventory to Zone C.',
  'delayed': '**Delayed shipments:**\n\n1. **SHP-78446** - Expected 14:30, ETA 16:15 (1h 45m delay)\n   • Route: WH-01 → Customer B\n   • Cause: Traffic congestion on I-35\n\nNo other delayed shipments at this time.',
  'optimize': '**Optimized picking routes for today:**\n\n1. Batch picks PK-88122 and PK-88124 (same zone A-04)\n2. Prioritize PK-88125 (3 items, quick completion)\n3. Reassign Zone B picks to FL-02 (FL-03 needs charging)\n\n**Estimated time savings: 23 minutes** across all active picks.',
  'reorder': '**Recommended reorder list:**\n\n| Product | Current | Reorder Level | Suggested Qty |\n|---------|---------|---------------|---------------|\n| Nitrile Gloves | 234 | 500 | 1,000 |\n| HP Toner 26A | 45 | 30 | 100 |\n| Server Rack 42U | 8 | 10 | 15 |\n\n**Total estimated cost: $14,250**',
};

const suggestedPrompts = [
  'Which products are running low?',
  'Why is today\'s outbound performance down?',
  'Which warehouse has the highest utilization?',
  'Show delayed shipments.',
  'Optimize today\'s picking routes.',
  'Which inventory should I reorder?',
];

export const AIAssistant: React.FC = () => {
  const { aiAssistantOpen, setAiAssistantOpen } = useStore();
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI Operations Assistant. I can help you analyze warehouse performance, identify issues, and optimize operations. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');

    // Find matching response
    setTimeout(() => {
      let response = 'I\'m analyzing your warehouse data. Based on current operations, everything is running within normal parameters. Would you like me to dive deeper into any specific area?';
      const lowerInput = userMessage.toLowerCase();
      if (lowerInput.includes('low') || lowerInput.includes('stock')) response = mockResponses['low'];
      else if (lowerInput.includes('outbound') || lowerInput.includes('performance')) response = mockResponses['outbound'];
      else if (lowerInput.includes('utilization') || lowerInput.includes('warehouse')) response = mockResponses['utilization'];
      else if (lowerInput.includes('delay')) response = mockResponses['delayed'];
      else if (lowerInput.includes('optim') || lowerInput.includes('pick')) response = mockResponses['optimize'];
      else if (lowerInput.includes('reorder')) response = mockResponses['reorder'];
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 800);
  };

  if (!aiAssistantOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[400px] max-h-[600px] bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 flex flex-col animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">AI Operations Assistant</p>
            <p className="text-[10px] text-slate-500">Powered by StockFlow AI</p>
          </div>
        </div>
        <button onClick={() => setAiAssistantOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-slate-100' : 'bg-blue-50'
            }`}>
              {msg.role === 'user' ? <User className="w-3.5 h-3.5 text-slate-600" /> : <Bot className="w-3.5 h-3.5 text-blue-600" />}
            </div>
            <div className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-xs leading-relaxed ${
              msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-700 border border-slate-100'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-[10px] font-semibold text-slate-400 mb-2">SUGGESTED</p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedPrompts.slice(0, 3).map((prompt, i) => (
              <button
                key={i}
                onClick={() => { setInput(prompt); }}
                className="px-2.5 py-1.5 text-[10px] text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about warehouse operations..."
            className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Floating AI Button
export const AIFloatingButton: React.FC = () => {
  const { aiAssistantOpen, setAiAssistantOpen } = useStore();
  if (aiAssistantOpen) return null;

  return (
    <button
      onClick={() => setAiAssistantOpen(true)}
      className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 z-40"
    >
      <Sparkles className="w-4.5 h-4.5" />
      <span className="text-sm font-medium">Ask StockFlow AI</span>
    </button>
  );
};

// Command Palette
export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, setCurrentPage } = useStore();
  const [search, setSearch] = useState('');

  const commands = [
    { label: 'Go to Dashboard', action: () => setCurrentPage('dashboard'), icon: '📊' },
    { label: 'Go to Inventory', action: () => setCurrentPage('inventory'), icon: '📦' },
    { label: 'Go to Shipments', action: () => setCurrentPage('shipments'), icon: '🚚' },
    { label: 'Go to Receiving', action: () => setCurrentPage('receiving'), icon: '📥' },
    { label: 'Go to Picking', action: () => setCurrentPage('picking'), icon: '🔍' },
    { label: 'Go to Analytics', action: () => setCurrentPage('analytics'), icon: '📈' },
    { label: 'Go to Forklifts', action: () => setCurrentPage('forklifts'), icon: '🏗️' },
    { label: 'Go to Alerts', action: () => setCurrentPage('alerts'), icon: '🔔' },
    { label: 'Add Product', action: () => { setCurrentPage('inventory'); }, icon: '➕' },
    { label: 'Create Shipment', action: () => { setCurrentPage('shipping'); }, icon: '📤' },
  ];

  const filtered = commands.filter(cmd => cmd.label.toLowerCase().includes(search.toLowerCase()));

  if (!commandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={() => setCommandPaletteOpen(false)}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-100 rounded">ESC</kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto py-2">
          {filtered.map((cmd, i) => (
            <button
              key={i}
              onClick={() => { cmd.action(); setCommandPaletteOpen(false); setSearch(''); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span className="text-base">{cmd.icon}</span>
              <span>{cmd.label}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-400">No commands found</div>
          )}
        </div>
      </div>
    </div>
  );
};
