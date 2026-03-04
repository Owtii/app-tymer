const fs = require('fs');

const icons = {
    Home: ['RouteDetails', 'Dashboard', 'AppLayout'],
    Calendar: ['AppLayout'],
    Bell: ['Profile', 'Dashboard', 'CalendarView', 'AlarmPage', 'AppLayout'],
    BarChart3: ['AppLayout'],
    User: ['Profile', 'AppLayout'],
    ArrowLeft: ['SocialSync', 'RouteDetails', 'Logistics'],
    Users: ['SocialSync'],
    Plus: ['SocialSync', 'Dashboard', 'CalendarView', 'AlarmPage'],
    Hash: ['SocialSync'],
    Share2: ['SocialSync'],
    MessageCircle: ['SocialSync'],
    ChevronRight: ['SocialSync', 'RouteDetails', 'Profile', 'Dashboard', 'CalendarView'],
    Car: ['RouteDetails', 'Logistics', 'Profile', 'Dashboard', 'CalendarView'],
    PersonStanding: ['RouteDetails', 'Dashboard', 'CalendarView'],
    Bus: ['RouteDetails', 'Dashboard', 'CalendarView'],
    MapPin: ['RouteDetails', 'Questionnaire', 'Logistics', 'Profile', 'Dashboard', 'CalendarView', 'AddressInput'],
    Clock: ['RouteDetails', 'Profile', 'Insights', 'Dashboard', 'CalendarView'],
    Navigation: ['RouteDetails', 'Dashboard'],
    Footprints: ['RouteDetails', 'Logistics', 'Dashboard'],
    ChevronLeft: ['Questionnaire', 'Onboarding', 'CalendarView'],
    Check: ['Questionnaire'],
    Settings: ['Profile'],
    Shield: ['Profile'],
    LogOut: ['Profile'],
    FileText: ['Profile'],
    Trash2: ['Profile', 'Dashboard', 'CalendarView', 'AlarmPage'],
    Info: ['Profile'],
    Mail: ['Profile', 'Auth'],
    Lock: ['Profile'],
    Download: ['Profile'],
    HelpCircle: ['Profile'],
    Smartphone: ['Profile', 'AlarmPage'],
    Coffee: ['Logistics'],
    ParkingSquare: ['Logistics'],
    TrendingUp: ['Insights'],
    TrendingDown: ['Insights'],
    Zap: ['Insights'],
    Target: ['Insights'],
    Award: ['Insights'],
    CalendarCheck: ['Insights'],
    Route: ['Insights'],
    CloudRain: ['Dashboard'],
    Cloud: ['Dashboard'],
    Sun: ['Dashboard'],
    CloudSnow: ['Dashboard'],
    CloudLightning: ['Dashboard'],
    CloudDrizzle: ['Dashboard'],
    CloudFog: ['Dashboard'],
    Snowflake: ['Dashboard'],
    Sunrise: ['Dashboard'],
    Cpu: ['Dashboard', 'CalendarView', 'AlarmPage'],
    X: ['Dashboard', 'CalendarView', 'AlarmPage'],
    CalendarOff: ['Dashboard'],
    Pencil: ['Dashboard', 'CalendarView', 'AlarmPage'],
    MoreVertical: ['Dashboard', 'CalendarView'],
    ChevronDown: ['Dashboard', 'CalendarView'],
    Moon: ['Dashboard'],
    Menu: ['CalendarView'],
    Apple: ['Auth'],
    Volume2: ['AlarmPage'],
    Vibrate: ['AlarmPage'],
    Music: ['AlarmPage'],
    Timer: ['AlarmPage'],
    Calculator: ['AlarmPage'],
};

const toKebab = (str) => {
    if (str === 'BarChart3') return 'bar-chart-3';
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Punct App - Icon Usage Report</title>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; background: #fff; color: #333; }
        h1 { margin-bottom: 10px; font-weight: 600; color: #111; }
        .subtitle { margin-bottom: 40px; color: #666; }
        .icons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }
        .icon-card { display: flex; align-items: flex-start; gap: 16px; padding: 20px; border: 1px solid #e5e5e5; border-radius: 12px; background: #fafafa; page-break-inside: avoid; }
        .icon-preview { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; min-width: 48px; background: #fff; border-radius: 8px; border: 1px solid #e5e5e5; color: #111; }
        .icon-info { flex: 1; min-width: 0; }
        .icon-name { font-weight: 600; font-size: 16px; margin: 0 0 8px 0; color: #111; }
        .usage-list { margin: 0; padding: 0 0 0 16px; font-size: 14px; color: #555; }
        .usage-item { margin-bottom: 4px; }
        
        @media print {
            body { padding: 0; }
            .icons-grid { gap: 16px; }
        }
    </style>
</head>
<body>
    <h1>Icon Usage Report</h1>
    <p class="subtitle">A complete list of all Lucide React icons used in the Punct application and their component locations.</p>
    
    <div class="icons-grid">
`;

for (const [name, files] of Object.entries(icons)) {
    let nameToUse = name;
    if (name === 'HomeIcon') nameToUse = 'Home';
    const lucideName = toKebab(nameToUse);
    html += `
        <div class="icon-card">
            <div class="icon-preview">
                <i data-lucide="${lucideName}"></i>
            </div>
            <div class="icon-info">
                <h3 class="icon-name">${name}</h3>
                <ul class="usage-list">
                    ${files.map(f => `<li class="usage-item">${f}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

html += `
    </div>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>
`;

fs.writeFileSync('C:/Users/ali_2/Desktop/app tymer/app tymer/punct/icons_report.html', html);
console.log('HTML report generated.');
