import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
}

interface TabPanelProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  content: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs, activeTab, setActiveTab, content }) => {
  return (
    <div>
      <div className="flex flex-wrap mb-6 gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
              activeTab === index
                ? 'bg-[#00B2FF] text-[#0D1525]'
                : 'bg-[#1A2332] text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={tabs[activeTab].id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TabPanel;
