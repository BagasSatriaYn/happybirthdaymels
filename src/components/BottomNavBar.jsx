const tabs = [
  { id: 'about',    icon: '👫', label: 'About' },
  { id: 'memory',   icon: '📸', label: 'Memory' },
  { id: 'wishlist', icon: '📝', label: 'Wishlist' },
  { id: 'coupons',  icon: '🎟️', label: 'Coupons' },
  { id: 'quiz',     icon: '💌', label: 'Quiz' },
]

export default function BottomNavBar({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-30 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto px-2 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`nav-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200 min-w-[64px] ${
              activeTab === tab.id ? 'nav-item-active' : 'text-gray-400'
            }`}
            aria-label={tab.label}
          >
            <span className={`text-xl transition-transform duration-200 ${activeTab === tab.id ? 'scale-110' : ''}`}>
              {tab.icon}
            </span>
            <span className={`text-[10px] font-semibold transition-all duration-200 ${
              activeTab === tab.id ? 'text-rose-600' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <div className="w-1 h-1 rounded-full bg-rose-400 mt-0.5" />
            )}
          </button>
        ))}
      </div>
      {/* iOS safe area bottom padding */}
      <div className="h-safe-bottom" />
    </nav>
  )
}
