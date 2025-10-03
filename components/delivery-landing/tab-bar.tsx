export type TabBar = 'Delivery' | 'Pick-up' | 'Shops'
interface TabProps {
    activeTab: TabBar;
    setActiveTab: (tab: TabBar) => void;
}
export default function Tabs({ activeTab, setActiveTab }: TabProps) {
    const tabs:TabBar[] = ['Delivery', 'Pick-up', 'Shops'];
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`whitespace-nowrap py-4 px-1 border-b-2 font-bold text-sm ${activeTab === tab ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    )
};