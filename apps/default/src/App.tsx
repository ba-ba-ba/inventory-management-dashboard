import * as React from 'react';
import { Toaster } from 'sonner';
import { AnimatedGridBackground } from './components/AnimatedGridBackground';
import { TabLayout, type TabId } from './components/TabLayout';
import { InventoryTab } from './components/InventoryTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { SettingsTab } from './components/SettingsTab';
import { AssistantTab } from './components/AssistantTab';
import { AppHeader } from './components/AppHeader';
import { cn } from './lib/utils';

const App: React.FC = function () {
  const [activeTab, setActiveTab] = React.useState<TabId>('inventory');
  const [showAddForm, setShowAddForm] = React.useState(false);

  const handleQuickAdd = React.useCallback(() => {
    setActiveTab('inventory');
    setShowAddForm(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative touch-manipulation">
      <AnimatedGridBackground />
      
      <div className="relative z-10 flex flex-col h-screen max-h-screen overflow-hidden">
        <AppHeader onQuickAdd={handleQuickAdd} />
        
        <div className="flex-1 overflow-hidden min-h-0">
          <TabLayout activeTab={activeTab} onTabChange={setActiveTab}>
            {/* Keep all tabs mounted to prevent flickering - use absolute positioning */}
            <div className="relative h-full w-full">
              <div className={cn(
                "absolute inset-0 overflow-auto",
                activeTab === 'inventory' ? 'block' : 'hidden'
              )}>
                <InventoryTab 
                  showAddForm={showAddForm} 
                  onShowAddFormChange={setShowAddForm}
                  isActive={activeTab === 'inventory'}
                />
              </div>
              <div className={cn(
                "absolute inset-0 overflow-auto",
                activeTab === 'analytics' ? 'block' : 'hidden'
              )}>
                <AnalyticsTab isActive={activeTab === 'analytics'} />
              </div>
              <div className={cn(
                "absolute inset-0 overflow-auto",
                activeTab === 'assistant' ? 'block' : 'hidden'
              )}>
                <AssistantTab isActive={activeTab === 'assistant'} />
              </div>
              <div className={cn(
                "absolute inset-0 overflow-auto",
                activeTab === 'settings' ? 'block' : 'hidden'
              )}>
                <SettingsTab isActive={activeTab === 'settings'} />
              </div>
            </div>
          </TabLayout>
        </div>
      </div>
      
      <Toaster 
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: 'rgba(30, 41, 59, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            color: 'white',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.2)',
          },
        }}
      />
    </div>
  );
};

export default App;
