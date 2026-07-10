const Colors = {
  theme: {
    // Brand / Medical UI
    primary: '#0057B8',      
    primaryDark: '#003B73',
    primaryLight: '#E6F0FF',

    background: '#F8FAFC',
    surface: '#FFFFFF',

    text: '#111827',
    textSecondary: '#6B7280',

    border: '#D1D5DB',

    /*
      TRIAGE PRIORITY COLORS
    */

    // Priority 1 - Immediate / Critical
    critical: '#991B1B',
    criticalLight: '#FEE2E2',
    criticalBorder: '#DC2626',

    // Priority 2 - Urgent
    urgent: '#C2410C',
    urgentLight: '#FFEDD5',
    urgentBorder: '#F97316',

    // Priority 3 - Moderate
    moderate: '#A16207',
    moderateLight: '#FEF3C7',

    // Priority 4 - Stable
    stable: '#1D4ED8',
    stableLight: '#DBEAFE',

    // Priority 5 - Minor
    minor: '#15803D',
    minorLight: '#DCFCE7',


    /*
      STATUS COLORS
    */

    pending: '#64748B',
    pendingLight: '#F1F5F9',

    inTransit: '#2563EB',
    inTransitLight: '#DBEAFE',

    synced: '#16A34A',
    syncedLight: '#DCFCE7',


    /*
      NETWORK
    */

    online: '#16A34A',
    onlineLight: '#DCFCE7',

    offline: '#DC2626',
    offlineLight: '#FEE2E2',


    /*
      GENERAL
    */

    white: '#FFFFFF',
    black: '#000000',

    error: '#DC2626',
    success: '#16A34A',
    warning: '#D97706',
  },
};

export default Colors;