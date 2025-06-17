// Application State Management
class OSRSGuideApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.userProgress = this.loadProgress();
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPage(this.currentPage);
        this.updateActiveNav();
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                this.loadPage(page);
            });
        });

        // Mobile toggle
        document.getElementById('mobile-toggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('show');
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Close sidebar on mobile when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !e.target.closest('.sidebar') && 
                !e.target.closest('.mobile-toggle')) {
                document.getElementById('sidebar').classList.remove('show');
            }
        });
    }

    loadPage(page) {
        this.currentPage = page;
        const content = document.getElementById('content');
        content.innerHTML = this.getPageContent(page);
        content.className = 'content fade-in';
        this.updateActiveNav();
        this.bindPageEvents();
    }

    updateActiveNav() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${this.currentPage}"]`)?.classList.add('active');
    }

    toggleTheme() {
        document.body.classList.toggle('light');
        const isLight = document.body.classList.contains('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        document.getElementById('theme-toggle').textContent = isLight ? '☀️' : '🌙';
    }

    loadProgress() {
        const stored = localStorage.getItem('osrs-progress');
        return stored ? JSON.parse(stored) : {
            skills: {},
            quests: {},
            achievements: {},
            gear: {}
        };
    }

    saveProgress() {
        localStorage.setItem('osrs-progress', JSON.stringify(this.userProgress));
    }

    getPageContent(page) {
        switch(page) {
            case 'dashboard':
                return this.getDashboardContent();
            case 'account-builder':
                return this.getAccountBuilderContent();
            case 'combat-guide':
                return this.getCombatGuideContent();
            case 'combat-equipment':
                return this.getCombatEquipmentContent();
            case 'skill-guides':
                return this.getSkillGuidesContent();
            case 'boss-guides':
                return this.getBossGuidesContent();
            case 'calculators':
                return this.getCalculatorsContent();
            case 'quest-guide':
                return this.getQuestGuideContent();
            case 'slayer-guide':
                return this.getSlayerGuideContent();
            case 'achievement-diaries':
                return this.getAchievementDiariesContent();
            case 'raids':
                return this.getRaidsContent();
            case 'money-making':
                return this.getMoneyMakingContent();
            case 'trackers':
                return this.getTrackersContent();
            default:
                return this.getDashboardContent();
        }
    }

    getDashboardContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Welcome to OSRS MaxGuide Pro</h1>
                <p class="page-subtitle">Your complete companion for efficient maxing and end-game preparation</p>
            </div>

            <div class="grid grid-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🎯 Quick Stats</h3>
                    </div>
                    <div class="progress-container">
                        <div class="progress-header">
                            <span>Combat Level</span>
                            <span>126</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 85%"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-header">
                            <span>Total Level</span>
                            <span>1847 / 2277</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 81%"></div>
                        </div>
                    </div>
                    <div class="progress-container">
                        <div class="progress-header">
                            <span>Quest Points</span>
                            <span>246 / 293</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 84%"></div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">⚡ Priority Tasks</h3>
                    </div>
                    <div class="task-list">
                        <div class="task-item">
                            <span class="task-priority high">🔴</span>
                            <span>Complete Song of the Elves</span>
                        </div>
                        <div class="task-item">
                            <span class="task-priority medium">🟡</span>
                            <span>Train Hunter to 83 for Elite Diaries</span>
                        </div>
                        <div class="task-item">
                            <span class="task-priority low">🟢</span>
                            <span>Obtain Fire Cape</span>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">💰 Recommended Money Makers</h3>
                    </div>
                    <div class="money-methods">
                        <div class="method-item">
                            <span class="method-name">Vorkath</span>
                            <span class="method-profit">4.2M gp/hr</span>
                        </div>
                        <div class="method-item">
                            <span class="method-name">Zulrah</span>
                            <span class="method-profit">3.8M gp/hr</span>
                        </div>
                        <div class="method-item">
                            <span class="method-name">Raids 1 (CoX)</span>
                            <span class="method-profit">5.1M gp/hr</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🚀 Skill Overview</h3>
                </div>
                <div class="grid grid-4" id="skills-grid">
                    ${this.getSkillsGrid()}
                </div>
            </div>
        `;
    }

    getSkillsGrid() {
        const skills = [
            {name: 'Attack', icon: '⚔️', level: 99, xp: 13034431},
            {name: 'Strength', icon: '💪', level: 99, xp: 13034431},
            {name: 'Defence', icon: '🛡️', level: 85, xp: 3258594},
            {name: 'Ranged', icon: '🏹', level: 99, xp: 13034431},
            {name: 'Prayer', icon: '🙏', level: 77, xp: 1475581},
            {name: 'Magic', icon: '🔮', level: 94, xp: 8771558},
            {name: 'Runecraft', icon: '⚱️', level: 77, xp: 1475581},
            {name: 'Construction', icon: '🏠', level: 84, xp: 3064204},
        ];

        return skills.map(skill => `
            <div class="skill-card">
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-level">${skill.level}</div>
                <div class="skill-name">${skill.name}</div>
                <div class="skill-xp">${skill.xp.toLocaleString()} XP</div>
            </div>
        `).join('');
    }

    getCombatEquipmentContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Combat Equipment Guide</h1>
                <p class="page-subtitle">Complete equipment progression from early game to end game</p>
            </div>

            <div class="tier-selector" id="equipment-tier">
                <button class="tier-btn active" data-tier="budget">Budget (< 1M)</button>
                <button class="tier-btn" data-tier="mid">Mid-tier (1-50M)</button>
                <button class="tier-btn" data-tier="high">High-tier (50-500M)</button>
                <button class="tier-btn" data-tier="endgame">End-game (500M+)</button>
            </div>

            <div id="equipment-display">
                ${this.getEquipmentTierContent('budget')}
            </div>
        `;
    }

    getEquipmentTierContent(tier) {
        const equipment = {
            budget: {
                title: "Budget Combat Setup (< 1M total)",
                melee: [
                    {slot: "Weapon", item: "Dragon Scimitar", stats: "+67 Attack", req: "60 Attack, Monkey Madness I", cost: "100K"},
                    {slot: "Shield", item: "Dragon Defender", stats: "+25 Attack, +24 Defence", req: "60 Attack/Defence, Warriors' Guild", cost: "Free"},
                    {slot: "Helmet", item: "Neitz Helm", stats: "+3 Attack, +5 Defence", req: "55 Defence, Fremennik Trials", cost: "50K"},
                    {slot: "Body", item: "Fighter Torso", stats: "+4 Strength", req: "Barbarian Assault", cost: "Free"},
                    {slot: "Legs", item: "Dragon Platelegs", stats: "+0 Attack, +11 Defence", req: "60 Defence", cost: "200K"},
                    {slot: "Gloves", item: "Combat Bracelet", stats: "+2 Attack, +2 Defence", req: "Level 25 Crafting", cost: "15K"},
                    {slot: "Boots", item: "Dragon Boots", stats: "+4 Attack, +4 Defence", req: "60 Defence", cost: "200K"},
                    {slot: "Cape", item: "Obsidian Cape", stats: "+1 Attack, +9 Defence", req: "None", cost: "100K"},
                    {slot: "Amulet", item: "Amulet of Glory", stats: "+3 Attack, +3 Defence", req: "Level 50 Crafting", cost: "30K"}
                ],
                ranged: [
                    {slot: "Weapon", item: "Magic Shortbow (i)", stats: "+69 Ranged", req: "50 Ranged", cost: "300K"},
                    {slot: "Ammunition", item: "Amethyst Arrows", stats: "+55 Ranged", req: "None", cost: "200 gp each"},
                    {slot: "Helmet", item: "Archer Helm", stats: "+5 Defence, +5 Ranged", req: "45 Defence", cost: "80K"},
                    {slot: "Body", item: "Green d'hide Body", stats: "+13 Defence, +15 Ranged", req: "40 Defence/Ranged", cost: "5K"},
                    {slot: "Legs", item: "Green d'hide Chaps", stats: "+12 Defence, +8 Ranged", req: "40 Defence/Ranged", cost: "3K"},
                    {slot: "Gloves", item: "Green d'hide Vambs", stats: "+8 Defence, +8 Ranged", req: "40 Defence/Ranged", cost: "2K"},
                    {slot: "Boots", item: "Snakeskin Boots", stats: "+3 Defence, +3 Ranged", req: "30 Defence/Ranged", cost: "15K"},
                    {slot: "Cape", item: "Ava's Accumulator", stats: "+4 Ranged", req: "Animal Magnetism", cost: "Free"},
                    {slot: "Amulet", item: "Amulet of Glory", stats: "+3 All Combat", req: "Level 50 Crafting", cost: "30K"}
                ]
            },
            mid: {
                title: "Mid-tier Combat Setup (1-50M total)",
                melee: [
                    {slot: "Weapon", item: "Abyssal Whip", stats: "+82 Attack", req: "70 Attack, 85 Slayer", cost: "2.5M"},
                    {slot: "Shield", item: "Dragon Defender", stats: "+25 Attack, +24 Defence", req: "60 Attack/Defence", cost: "Free"},
                    {slot: "Helmet", item: "Helm of Neitiznot", stats: "+3 Attack, +5 Defence", req: "55 Defence", cost: "50K"},
                    {slot: "Body", item: "Bandos Chestplate", stats: "+4 Attack, +33 Defence, +4 Strength", req: "65 Defence", cost: "15M"},
                    {slot: "Legs", item: "Bandos Tassets", stats: "+2 Attack, +31 Defence, +2 Strength", req: "65 Defence", cost: "25M"},
                    {slot: "Gloves", item: "Barrows Gloves", stats: "+12 All Attack Stats", req: "Recipe for Disaster", cost: "130K"},
                    {slot: "Boots", item: "Primordial Boots", stats: "+2 Attack, +5 Defence, +5 Strength", req: "75 Defence", cost: "32M"},
                    {slot: "Cape", item: "Fire Cape", stats: "+4 All Attack Stats, +11 Defence", req: "Fight Caves", cost: "Free"},
                    {slot: "Amulet", item: "Amulet of Torture", stats: "+10 Attack, +15 Strength", req: "75 Hitpoints", cost: "12M"}
                ]
            },
            high: {
                title: "High-tier Combat Setup (50-500M total)",
                melee: [
                    {slot: "Weapon", item: "Ghrazi Rapier", stats: "+94 Attack, +89 Strength", req: "75 Attack, Theatre of Blood", cost: "180M"},
                    {slot: "Shield", item: "Avernic Defender", stats: "+30 Attack, +29 Defence", req: "70 Attack/Defence, Theatre of Blood", cost: "120M"},
                    {slot: "Helmet", item: "Torva Full Helm", stats: "+6 Attack, +55 Defence, +6 Strength", req: "80 Defence", cost: "200M"},
                    {slot: "Body", item: "Torva Platebody", stats: "+8 Attack, +56 Defence, +8 Strength", req: "80 Defence", cost: "600M"},
                    {slot: "Legs", item: "Torva Platelegs", stats: "+6 Attack, +54 Defence, +6 Strength", req: "80 Defence", cost: "400M"}
                ]
            },
            endgame: {
                title: "End-game Combat Setup (500M+ total)",
                melee: [
                    {slot: "Weapon", item: "Scythe of Vitur", stats: "+110 Attack, +75 Strength", req: "75 Attack, Theatre of Blood", cost: "800M"},
                    {slot: "Helmet", item: "Torva Full Helm", stats: "+6 Attack, +55 Defence, +6 Strength", req: "80 Defence", cost: "200M"},
                    {slot: "Body", item: "Torva Platebody", stats: "+8 Attack, +56 Defence, +8 Strength", req: "80 Defence", cost: "600M"},
                    {slot: "Legs", item: "Torva Platelegs", stats: "+6 Attack, +54 Defence, +6 Strength", req: "80 Defence", cost: "400M"},
                    {slot: "Gloves", item: "Ferocious Gloves", stats: "+16 Attack, +16 Strength", req: "80 Attack/Defence, DS2", cost: "Free"},
                    {slot: "Boots", item: "Primordial Boots", stats: "+2 Attack, +5 Defence, +5 Strength", req: "75 Defence", cost: "32M"},
                    {slot: "Cape", item: "Infernal Cape", stats: "+8 All Attack Stats, +12 Defence", req: "Inferno", cost: "Free"},
                    {slot: "Amulet", item: "Amulet of Torture", stats: "+10 Attack, +15 Strength", req: "75 Hitpoints", cost: "12M"}
                ]
            }
        };

        const tierData = equipment[tier];
        if (!tierData) return '';

        return `
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">${tierData.title}</h3>
                </div>
                
                <h4>⚔️ Melee Setup</h4>
                <table class="equipment-table">
                    <thead>
                        <tr>
                            <th>Slot</th>
                            <th>Item</th>
                            <th>Stats</th>
                            <th>Requirements</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tierData.melee.map(item => `
                            <tr>
                                <td>${item.slot}</td>
                                <td><strong>${item.item}</strong></td>
                                <td class="stat-item">${item.stats}</td>
                                <td class="requirement">${item.req}</td>
                                <td class="cost">${item.cost}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                ${tierData.ranged ? `
                    <h4>🏹 Ranged Setup</h4>
                    <table class="equipment-table">
                        <thead>
                            <tr>
                                <th>Slot</th>
                                <th>Item</th>
                                <th>Stats</th>
                                <th>Requirements</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tierData.ranged.map(item => `
                                <tr>
                                    <td>${item.slot}</td>
                                    <td><strong>${item.item}</strong></td>
                                    <td class="stat-item">${item.stats}</td>
                                    <td class="requirement">${item.req}</td>
                                    <td class="cost">${item.cost}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : ''}
            </div>
        `;
    }

    getCombatGuideContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Complete Combat Training Guide</h1>
                <p class="page-subtitle">Efficient methods for maxing all combat skills with detailed equipment recommendations</p>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">⚔️ Melee Training</h3>
                        <span class="card-badge">Essential</span>
                    </div>
                    
                    <h4>Phase 1: Quest Start (Levels 1-40)</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Equipment</h4>
                        <p><strong>Weapon:</strong> Iron Scimitar → Steel Scimitar → Mithril Scimitar<br>
                        <strong>Armor:</strong> Iron Full Helm, Iron Platebody, Iron Platelegs<br>
                        <strong>Total Cost:</strong> ~20K gp</p>
                    </div>
                    
                    <ul>
                        <li><strong>Waterfall Quest</strong> - Instant 30 Attack & Strength (13,750 XP each)</li>
                        <li><strong>Fight Arena</strong> - 12,175 Attack XP</li>
                        <li><strong>Tree Gnome Village</strong> - 11,450 Attack XP</li>
                        <li><strong>Vampire Slayer</strong> - 4,825 Attack XP</li>
                        <li><strong>The Grand Tree</strong> - 18,400 Agility XP + 7,900 Attack XP</li>
                    </ul>
                    
                    <h4>Phase 2: Crab Training (Levels 40-70)</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Equipment</h4>
                        <p><strong>Weapon:</strong> Rune Scimitar → Dragon Scimitar (after Monkey Madness)<br>
                        <strong>Armor:</strong> Rune Full Helm, Rune Platebody, Rune Platelegs<br>
                        <strong>Special:</strong> Combat Bracelet, Amulet of Strength<br>
                        <strong>Total Cost:</strong> ~200K gp</p>
                    </div>
                    
                    <ul>
                        <li><strong>Location:</strong> Sand Crabs (Crabclaw Isle) or Ammonite Crabs (Fossil Island)</li>
                        <li><strong>XP Rates:</strong> 40-60K XP/hr (very AFK)</li>
                        <li><strong>Method:</strong> Attack crabs, reset aggro every 10 minutes</li>
                        <li><strong>Upgrade Path:</strong> Get Dragon Defender from Warriors' Guild at 60 Attack/Defence</li>
                    </ul>
                    
                    <h4>Phase 3: Efficient Training (Levels 70-99)</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Equipment</h4>
                        <p><strong>Weapon:</strong> Abyssal Whip + Dragon Defender<br>
                        <strong>Armor:</strong> Obsidian Armor Set (Berserker Necklace) OR Bandos<br>
                        <strong>Special:</strong> Barrows Gloves, Fire Cape, Dragon Boots<br>
                        <strong>Total Cost:</strong> 3-50M gp depending on gear choice</p>
                    </div>
                    
                    <ul>
                        <li><strong>Nightmare Zone:</strong> 90-110K XP/hr (very AFK with absorption potions)</li>
                        <li><strong>Slayer Tasks:</strong> 70-90K XP/hr (combined training)</li>
                        <li><strong>Dharok's Method:</strong> 120K+ XP/hr at 99 HP (expensive but fast)</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🏹 Ranged Training</h3>
                        <span class="card-badge">High Priority</span>
                    </div>
                    
                    <h4>Phase 1: Early Levels (1-40)</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Equipment</h4>
                        <p><strong>Weapon:</strong> Oak Shortbow → Willow Shortbow<br>
                        <strong>Ammunition:</strong> Iron Arrows → Steel Arrows<br>
                        <strong>Armor:</strong> Leather Armor → Studded Leather<br>
                        <strong>Total Cost:</strong> ~15K gp</p>
                    </div>
                    
                    <ul>
                        <li><strong>Sand/Rock Crabs:</strong> 20-35K XP/hr</li>
                        <li><strong>Essential Quest:</strong> Animal Magnetism for Ava's Accumulator</li>
                        <li><strong>Tip:</strong> Train to 40 Ranged before getting serious about training</li>
                    </ul>
                    
                    <h4>Phase 2: Mid-Level Training (40-75)</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Equipment</h4>
                        <p><strong>Weapon:</strong> Magic Shortbow (i) → Rune Crossbow<br>
                        <strong>Ammunition:</strong> Amethyst Arrows → Broad Bolts<br>
                        <strong>Armor:</strong> Green d'hide → Blue d'hide → Red d'hide<br>
                        <strong>Special:</strong> Ava's Accumulator, Archer Ring<br>
                        <strong>Total Cost:</strong> ~2M gp</p>
                    </div>
                    
                    <ul>
                        <li><strong>Cannon Slayer:</strong> 60-80K XP/hr (expensive but efficient)</li>
                        <li><strong>Sand Crabs:</strong> 45-55K XP/hr (very AFK)</li>
                        <li><strong>Chinchompas:</strong> 200-400K XP/hr (very expensive)</li>
                    </ul>
                    
                    <h4>Phase 3: High-Level Training (75-99)</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Equipment</h4>
                        <p><strong>Weapon:</strong> Toxic Blowpipe → Twisted Bow<br>
                        <strong>Armor:</strong> Black d'hide → Armadyl Armor<br>
                        <strong>Special:</strong> Ava's Assembler, Pegasian Boots<br>
                        <strong>Total Cost:</strong> 15-1000M+ gp</p>
                    </div>
                    
                    <ul>
                        <li><strong>Chinchompas (MM2 Tunnels):</strong> 400-600K XP/hr</li>
                        <li><strong>Slayer with Blowpipe:</strong> 70-90K XP/hr</li>
                        <li><strong>NMZ with Blowpipe:</strong> 90-110K XP/hr (AFK)</li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🔮 Magic Training</h3>
                </div>
                
                <div class="grid grid-2">
                    <div>
                        <h4>Phase 1: Early Magic (1-55)</h4>
                        <div class="equipment-recommendation">
                            <h4>🎯 Recommended Equipment</h4>
                            <p><strong>Weapon:</strong> Staff of Air/Water/Earth/Fire<br>
                            <strong>Runes:</strong> Appropriate elemental runes<br>
                            <strong>Armor:</strong> Wizard Hat, Robes<br>
                            <strong>Total Cost:</strong> ~100K gp</p>
                        </div>
                        
                        <ul>
                            <li><strong>Strike Spells:</strong> Wind → Water → Earth → Fire</li>
                            <li><strong>Curse Spells:</strong> For faster XP but more expensive</li>
                            <li><strong>Splashing:</strong> 13K XP/hr (very AFK but slow)</li>
                            <li><strong>Essential Quest:</strong> Witch's House for free levels</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4>Phase 2: High Alchemy Era (55-70)</h4>
                        <div class="equipment-recommendation">
                            <h4>🎯 Recommended Equipment</h4>
                            <p><strong>Items to Alch:</strong> Yew Longbows, Rune Items<br>
                            <strong>Runes:</strong> Nature runes, Fire runes<br>
                            <strong>Profit/Loss:</strong> Usually break-even or small loss<br>
                            <strong>Total Cost:</strong> Variable (can be profitable)</p>
                        </div>
                        
                        <ul>
                            <li><strong>High Alchemy:</strong> 65K XP/hr (can do while training other skills)</li>
                            <li><strong>Superheat Item:</strong> 50K Magic XP/hr + Smithing XP</li>
                            <li><strong>Enchant Bolts:</strong> 90K XP/hr (expensive but fast)</li>
                        </ul>
                    </div>
                </div>
                
                <h4>Phase 3: Ancient Magicks (70-99)</h4>
                <div class="equipment-recommendation">
                    <h4>🎯 Recommended Equipment</h4>
                    <p><strong>Weapon:</strong> Trident of the Seas → Toxic Trident → Sanguinesti Staff<br>
                    <strong>Armor:</strong> Mystic Robes → Ahrim's → Ancestral<br>
                    <strong>Special:</strong> Occult Necklace, Eternal Boots, Mage's Book<br>
                    <strong>Total Cost:</strong> 50-500M+ gp</p>
                </div>
                
                <ul>
                    <li><strong>Bursting/Barraging Slayer:</strong> 150-250K XP/hr</li>
                    <li><strong>Bursting MM2 Tunnels:</strong> 300-400K XP/hr</li>
                    <li><strong>String Jewellery:</strong> 130K XP/hr (profitable)</li>
                    <li><strong>Plank Make:</strong> 90K XP/hr (profitable with mahogany)</li>
                </ul>
            </div>
        `;
    }

    getAccountBuilderContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Account Builder</h1>
                <p class="page-subtitle">Plan your account progression with recommended quest orders and training paths</p>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🎯 Account Type</h3>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Select your account build:</label>
                        <select class="form-select" id="account-type">
                            <option value="main">Main Account (All skills to 99)</option>
                            <option value="pure">Pure (1 Defence)</option>
                            <option value="zerker">Berserker (45 Defence)</option>
                            <option value="med">Med Level (70 Defence)</option>
                            <option value="ironman">Ironman</option>
                            <option value="hardcore">Hardcore Ironman</option>
                            <option value="ultimate">Ultimate Ironman</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Target Combat Level:</label>
                        <input type="number" class="form-input" id="target-combat" placeholder="126" min="3" max="126">
                    </div>
                    
                    <button class="btn btn-primary">Generate Build Plan</button>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📋 Early Game Checklist</h3>
                    </div>
                    <div class="checklist-container">
                        <label class="checklist-item">
                            <input type="checkbox" data-task="tutorial-island">
                            Complete Tutorial Island
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox" data-task="membership">
                            Purchase Membership
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox" data-task="stronghold">
                            Stronghold of Security (10K gp)
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox" data-task="waterfall">
                            Waterfall Quest (30 Att/Str)
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox" data-task="grand-tree">
                            The Grand Tree (18K Agility XP)
                        </label>
                        <label class="checklist-item">
                            <input type="checkbox" data-task="fight-arena">
                            Fight Arena (12K Attack XP)
                        </label>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🗓️ Optimal Quest Order</h3>
                </div>
                
                <h4>Phase 1: Foundation Building (Levels 1-40)</h4>
                <table class="equipment-table">
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Quest</th>
                            <th>Requirements</th>
                            <th>Rewards</th>
                            <th>Why Important</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><strong>Waterfall Quest</strong></td>
                            <td>None</td>
                            <td class="stat-item">13,750 Attack & Strength XP</td>
                            <td>Skips slow early combat levels</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td><strong>Fight Arena</strong></td>
                            <td>None</td>
                            <td class="stat-item">12,175 Attack XP</td>
                            <td>More attack XP for weapon access</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td><strong>Tree Gnome Village</strong></td>
                            <td>None</td>
                            <td class="stat-item">11,450 Attack XP</td>
                            <td>Continues attack progression</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td><strong>The Grand Tree</strong></td>
                            <td>None</td>
                            <td class="stat-item">18,400 Agility + 7,900 Attack XP</td>
                            <td>Huge Agility boost + spirit trees</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td><strong>Animal Magnetism</strong></td>
                            <td>18 Slayer, 19 Crafting</td>
                            <td class="stat-item">Ava's Accumulator</td>
                            <td>Essential for ranged training</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td><strong>Monk's Friend</strong></td>
                            <td>None</td>
                            <td class="stat-item">2,000 Woodcutting XP</td>
                            <td>Quick woodcutting boost</td>
                        </tr>
                    </tbody>
                </table>

                <h4>Phase 2: Skill Unlocks (Levels 40-70)</h4>
                <table class="equipment-table">
                    <thead>
                        <tr>
                            <th>Quest</th>
                            <th>Requirements</th>
                            <th>Rewards</th>
                            <th>Unlocks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Fairy Tale I</strong></td>
                            <td>Started Lost City</td>
                            <td class="stat-item">Magic secateurs</td>
                            <td>Better farming yields</td>
                        </tr>
                        <tr>
                            <td><strong>Fairy Tale II</strong></td>
                            <td>40 Thieving, 49 Farming</td>
                            <td class="stat-item">Fairy rings</td>
                            <td>Fast travel network</td>
                        </tr>
                        <tr>
                            <td><strong>Lunar Diplomacy</strong></td>
                            <td>61 Crafting, 40 Defence, 49 Firemaking</td>
                            <td class="stat-item">Lunar spells</td>
                            <td>Useful utility spells</td>
                        </tr>
                        <tr>
                            <td><strong>Recipe for Disaster</strong></td>
                            <td>Various subquests</td>
                            <td class="stat-item">Barrows Gloves</td>
                            <td>Best in slot gloves</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }

    getSkillGuidesContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Complete Skill Guides</h1>
                <p class="page-subtitle">Detailed training methods for every skill with equipment recommendations</p>
            </div>

            <div class="grid grid-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🏃 Agility</h3>
                        <span class="card-badge">Priority: High</span>
                    </div>
                    
                    <h4>Level 1-40: Quest Start</h4>
                    <ul>
                        <li><strong>The Grand Tree:</strong> 18,400 XP (1→35)</li>
                        <li><strong>Tourist Trap:</strong> 4,650 XP (choose Agility)</li>
                        <li><strong>Recruiting Drive:</strong> 1,000 XP</li>
                    </ul>
                    
                    <h4>Level 40-60: Canifis Rooftops</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Equipment</h4>
                        <p><strong>Priority:</strong> Graceful outfit pieces as you earn marks<br>
                        <strong>Food:</strong> Cakes or better for emergency healing<br>
                        <strong>Profit:</strong> Marks of Grace → Amylase crystals</p>
                    </div>
                    <ul>
                        <li><strong>XP Rate:</strong> 19K XP/hr</li>
                        <li><strong>Marks of Grace:</strong> 12-15 per hour</li>
                        <li><strong>Goal:</strong> Full Graceful outfit (260 marks)</li>
                    </ul>
                    
                    <h4>Level 60-99: Course Progression</h4>
                    <ul>
                        <li><strong>60-70:</strong> Seers' Village (45K XP/hr with Kandarin Hard diary)</li>
                        <li><strong>70-80:</strong> Pollnivneach (52K XP/hr)</li>
                        <li><strong>80-90:</strong> Rellekka (55K XP/hr)</li>
                        <li><strong>90-99:</strong> Ardougne (62K XP/hr)</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🤏 Thieving</h3>
                        <span class="card-badge">Fast Skill</span>
                    </div>
                    
                    <h4>Level 1-25: Quest Start</h4>
                    <ul>
                        <li><strong>Fight Arena:</strong> 12,175 XP (1→24)</li>
                        <li><strong>The Feud:</strong> 15,000 XP</li>
                    </ul>
                    
                    <h4>Level 25-55: Blackjacking</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Equipment</h4>
                        <p><strong>Weapon:</strong> Blackjack (Maple at 25, Willow at 35)<br>
                        <strong>Food:</strong> Wines of Zamorak or jugs of wine<br>
                        <strong>Location:</strong> Pollnivneach (after The Feud quest)</p>
                    </div>
                    <ul>
                        <li><strong>25-45:</strong> Blackjack Bandits (60K XP/hr)</li>
                        <li><strong>45-55:</strong> Blackjack Menaphites (80K XP/hr)</li>
                    </ul>
                    
                    <h4>Level 55-99: Ardougne Knights</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Equipment</h4>
                        <p><strong>Essential:</strong> Dodgy necklaces (prevent stunning)<br>
                        <strong>Gloves:</strong> Gloves of silence (5% better success rate)<br>
                        <strong>Profit:</strong> 200-300K gp/hr at high levels</p>
                    </div>
                    <ul>
                        <li><strong>55-95:</strong> Ardougne Knights (200K+ XP/hr)</li>
                        <li><strong>Alternative:</strong> Pyramid Plunder (100K XP/hr + chance for sceptre)</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🙏 Prayer</h3>
                        <span class="card-badge">Expensive</span>
                    </div>
                    
                    <h4>Level 1-43: Gilded Altar Method</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Setup</h4>
                        <p><strong>Location:</strong> Player-owned house with gilded altar<br>
                        <strong>Bones:</strong> Dragon bones (252 XP each with altar)<br>
                        <strong>Cost:</strong> ~3K gp per bone<br>
                        <strong>XP Rate:</strong> 350K+ XP/hr</p>
                    </div>
                    
                    <h4>Alternative: Chaos Altar (Wilderness)</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Risk vs Reward</h4>
                        <p><strong>XP Bonus:</strong> 50% chance to not consume bone<br>
                        <strong>Effective Cost:</strong> ~50% cheaper than gilded altar<br>
                        <strong>Risk:</strong> Wilderness PKers<br>
                        <strong>Strategy:</strong> Bring 3-4 inventories, noted bones + coins</p>
                    </div>
                    
                    <h4>Level 43+: Important Prayer Unlocks</h4>
                    <ul>
                        <li><strong>43:</strong> Protection prayers (essential for bossing)</li>
                        <li><strong>70:</strong> Piety (requires King's Ransom quest)</li>
                        <li><strong>74:</strong> Rigour (requires Chronicle)</li>
                        <li><strong>77:</strong> Augury (requires Chronicle)</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🏠 Construction</h3>
                        <span class="card-badge">Very Expensive</span>
                    </div>
                    
                    <h4>Level 1-33: Basic Furniture</h4>
                    <ul>
                        <li><strong>Method:</strong> Crude wooden chairs → Wooden chairs</li>
                        <li><strong>Cost:</strong> ~500K gp</li>
                        <li><strong>XP Rate:</strong> 50K XP/hr</li>
                    </ul>
                    
                    <h4>Level 33-74: Oak Larders</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Optimal Setup</h4>
                        <p><strong>Materials:</strong> Oak planks (380 gp each from sawmill)<br>
                        <strong>Location:</strong> Kitchen in player-owned house<br>
                        <strong>Butler:</strong> Demon butler for fast banking<br>
                        <strong>Cost:</strong> ~25M gp total to 74</p>
                    </div>
                    <ul>
                        <li><strong>XP Rate:</strong> 150K XP/hr</li>
                        <li><strong>XP per Larder:</strong> 480 XP</li>
                        <li><strong>Cost per XP:</strong> ~16 gp/XP</li>
                    </ul>
                    
                    <h4>Level 74-99: Dungeon Doors or Mahogany Homes</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Method Comparison</h4>
                        <p><strong>Dungeon Doors:</strong> 200K XP/hr, ~20 gp/XP (expensive)<br>
                        <strong>Mahogany Homes:</strong> 80K XP/hr, 2-3 gp/XP (affordable)<br>
                        <strong>Recommendation:</strong> Mahogany Homes for budget builds</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🧪 Herblore</h3>
                        <span class="card-badge">Profitable</span>
                    </div>
                    
                    <h4>Level 1-38: Quest Start</h4>
                    <ul>
                        <li><strong>Druidic Ritual:</strong> Starts Herblore</li>
                        <li><strong>Jungle Potion:</strong> 775 XP</li>
                        <li><strong>Recruitment Drive:</strong> 1,000 XP (if not used for Agility)</li>
                        <li><strong>The Dig Site:</strong> 15,300 XP (requires 25 Herblore)</li>
                    </ul>
                    
                    <h4>Level 38-55: Prayer Potions</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Profitable Training</h4>
                        <p><strong>Materials:</strong> Ranarr weed + Snape grass<br>
                        <strong>Profit:</strong> Usually 1-3 gp/XP profit<br>
                        <strong>XP Rate:</strong> 60K XP/hr<br>
                        <strong>Requirements:</strong> 38 Herblore</p>
                    </div>
                    
                    <h4>Level 55-81: Super Combat Potions</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Efficient Method</h4>
                        <p><strong>Materials:</strong> Torstol + Barbarian herblore<br>
                        <strong>XP Rate:</strong> 150K XP/hr<br>
                        <strong>Profit/Loss:</strong> Usually break-even<br>
                        <strong>Unlock:</strong> Barbarian Herblore from Barbarian Training</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🌱 Farming</h3>
                        <span class="card-badge">Daily Activity</span>
                    </div>
                    
                    <h4>Passive Training Strategy</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Essential Equipment</h4>
                        <p><strong>Tools:</strong> Magic secateurs (Fairy Tale I)<br>
                        <strong>Compost:</strong> Ultracompost for best yields<br>
                        <strong>Teleports:</strong> Various farming teleports<br>
                        <strong>Profit:</strong> 500K-2M gp per run depending on herbs</p>
                    </div>
                    
                    <h4>Daily Runs (15-20 minutes)</h4>
                    <ul>
                        <li><strong>Herb Runs:</strong> 5-8 patches, plant ranarr/snapdragon</li>
                        <li><strong>Tree Runs:</strong> 7+ patches, plant highest affordable tree</li>
                        <li><strong>Fruit Trees:</strong> 6 patches, massive XP but expensive</li>
                        <li><strong>Special:</strong> Calquat, crystal tree, redwood</li>
                    </ul>
                    
                    <h4>XP and Profit Guide</h4>
                    <table class="equipment-table">
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Herbs</th>
                                <th>Trees</th>
                                <th>Daily XP</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1-32</td>
                                <td>Attack potions → Prayer potions</td>
                                <td>Oak trees</td>
                                <td>15K</td>
                                <td>50K gp</td>
                            </tr>
                            <tr>
                                <td>32-45</td>
                                <td>Prayer potions → Ranarr</td>
                                <td>Willow trees</td>
                                <td>25K</td>
                                <td>80K gp</td>
                            </tr>
                            <tr>
                                <td>45-68</td>
                                <td>Ranarr weeds</td>
                                <td>Maple trees</td>
                                <td>35K</td>
                                <td>150K gp</td>
                            </tr>
                            <tr>
                                <td>68-99</td>
                                <td>Snapdragon</td>
                                <td>Yew → Magic trees</td>
                                <td>50K+</td>
                                <td>300K+ gp</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">⛏️ Mining</h3>
                        <span class="card-badge">AFK-Friendly</span>
                    </div>

                    <h4>Level 1-30: Quest Start</h4>
                    <ul>
                        <li><strong>Doric's Quest:</strong> 1,300 XP</li>
                        <li><strong>The Dig Site:</strong> 15,300 XP</li>
                    </ul>

                    <h4>Level 30-70: Motherlode Mine</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Equipment</h4>
                        <p><strong>Pickaxe:</strong> Dragon pickaxe if possible<br>
                        <strong>Outfit:</strong> Prospector for bonus XP<br>
                        <strong>Profit:</strong> Gold nuggets for pay-dirt sacks</p>
                    </div>
                    <ul>
                        <li><strong>XP Rate:</strong> 25-45K XP/hr</li>
                        <li><strong>Goal:</strong> Full Prospector (180 nuggets)</li>
                    </ul>

                    <h4>Level 70-99: Blast Mine / 3-tick Granite</h4>
                    <ul>
                        <li><strong>Blast Mine:</strong> 65K XP/hr + profit</li>
                        <li><strong>3-tick Granite:</strong> 90K+ XP/hr</li>
                        <li><strong>Amethyst:</strong> 20K XP/hr but good gp</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">⚒️ Smithing</h3>
                        <span class="card-badge">Costly</span>
                    </div>

                    <h4>Level 1-40: Quest Boost</h4>
                    <ul>
                        <li><strong>The Knight's Sword:</strong> 12,725 XP</li>
                        <li><strong>Elemental Workshop I:</strong> 5,000 XP</li>
                    </ul>

                    <h4>Level 40-70: Steel/Iron Items</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Efficient Training</h4>
                        <p><strong>Method:</strong> Blast Furnace steel bars<br>
                        <strong>Cost:</strong> Moderate, profit possible with coal bag</p>
                    </div>
                    <ul>
                        <li><strong>XP Rate:</strong> 80K XP/hr</li>
                    </ul>

                    <h4>Level 70-99: Gold Bars or Blast Furnace</h4>
                    <ul>
                        <li><strong>Gold Bars with Gauntlets:</strong> 130K XP/hr</li>
                        <li><strong>Blast Furnace Rune Items:</strong> 250K XP/hr (very expensive)</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🎣 Fishing</h3>
                        <span class="card-badge">Chill</span>
                    </div>

                    <h4>Level 1-20: Shrimp & Anchovies</h4>
                    <ul>
                        <li>Draynor Village or Lumbridge Swamp</li>
                    </ul>

                    <h4>Level 20-70: Fly Fishing</h4>
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Gear</h4>
                        <p>Use feathers with a fly fishing rod in Barbarian Village<br>
                        Bank trout and salmon for early cooking levels</p>
                    </div>
                    <ul>
                        <li><strong>XP Rate:</strong> 30-50K XP/hr</li>
                    </ul>

                    <h4>Level 70-99: Barbarian Fishing or Sharks</h4>
                    <ul>
                        <li><strong>Barbarian Fishing:</strong> 70K XP/hr plus Strength & Agility XP</li>
                        <li><strong>Sharks:</strong> 20K XP/hr but profitable</li>
                    </ul>
                </div>
            </div>
        `;
    }

    getBossGuidesContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Boss Guides</h1>
                <p class="page-subtitle">Complete strategies and gear setups for all major bosses</p>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🐉 Vorkath</h3>
                        <span class="card-badge">4.2M gp/hr</span>
                    </div>
                    
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Setup</h4>
                        <p><strong>Weapon:</strong> Dragon Hunter Crossbow + Dragon Bolts (e)<br>
                        <strong>Armor:</strong> Elite Void or Armadyl<br>
                        <strong>Special:</strong> Salve Amulet (ei), Pegasian Boots<br>
                        <strong>Total Cost:</strong> ~150M gp optimal setup</p>
                    </div>
                    
                    <h4>Strategy</h4>
                    <ul>
                        <li><strong>Phase 1:</strong> Attack normally, avoid acid pools</li>
                        <li><strong>Acid Phase:</strong> Use Crumble Undead on zombified spawn</li>
                        <li><strong>Fireball:</strong> Walk 2-3 squares to avoid</li>
                        <li><strong>Ice Attack:</strong> Keep moving to avoid freeze</li>
                    </ul>
                    
                    <h4>Inventory Setup</h4>
                    <ul>
                        <li>1x Super Extended Antifire</li>
                        <li>1x Ranging Potion</li>
                        <li>4x Karambwan + 16x Manta Ray</li>
                        <li>1x House Teleport</li>
                        <li>Rest: Dragon bolts (e)</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🐍 Zulrah</h3>
                        <span class="card-badge">3.8M gp/hr</span>
                    </div>
                    
                    <div class="equipment-recommendation">
                        <h4>🎯 Recommended Setup</h4>
                        <p><strong>Range Weapon:</strong> Toxic Blowpipe + Adamant Darts<br>
                        <strong>Mage Weapon:</strong> Trident of the Seas<br>
                        <strong>Armor:</strong> Void (switches) or Ahrim's/d'hide<br>
                        <strong>Total Cost:</strong> ~30M gp budget setup</p>
                    </div>
                    
                    <h4>Rotation Patterns</h4>
                    <ul>
                        <li><strong>Green Phase:</strong> Use Magic (Trident)</li>
                        <li><strong>Blue Phase:</strong> Use Ranged (Blowpipe)</li>
                        <li><strong>Red Phase:</strong> No combat, avoid damage</li>
                        <li><strong>Jad Phase:</strong> Prayer flick based on attack style</li>
                    </ul>
                    
                    <h4>Key Tips</h4>
                    <ul>
                        <li>Learn the 4 rotation patterns</li>
                        <li>Use Zulrah helper plugins for learning</li>
                        <li>Prioritize avoiding damage over DPS while learning</li>
                        <li>Bring anti-venom+ for poison immunity</li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">⚡ Chambers of Xeric (Raids 1)</h3>
                    <span class="card-badge">5.1M gp/hr</span>
                </div>
                
                <div class="equipment-recommendation">
                    <h4>🎯 Beginner Raid Setup</h4>
                    <p><strong>Melee:</strong> Whip, Dragon Defender, Bandos armor<br>
                    <strong>Range:</strong> Blowpipe, Void or d'hide<br>
                    <strong>Magic:</strong> Trident, Ahrim's robes<br>
                    <strong>Total Cost:</strong> ~100M gp for solid beginner setup</p>
                </div>
                
                <h4>Room Strategies</h4>
                <div class="grid grid-2">
                    <div>
                        <h5>Tekton</h5>
                        <ul>
                            <li>Bring pickaxe and hammer</li>
                            <li>Mine rocks to reset his defence</li>
                            <li>Attack when he's not enraged</li>
                        </ul>
                        
                        <h5>Shamans</h5>
                        <ul>
                            <li>Kill purple shamans first</li>
                            <li>Avoid standing near other players</li>
                            <li>Move away from spawning orbs</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h5>Vasa Nistirio</h5>
                        <ul>
                            <li>Attack crystals to lower his defence</li>
                            <li>Run behind rocks during rock fall</li>
                            <li>Use ranged when he teleports</li>
                        </ul>
                        
                        <h5>Vespula</h5>
                        <ul>
                            <li>Kill portal first</li>
                            <li>Focus abyssal portal when boss lands</li>
                            <li>Avoid the healing pools</li>
                        </ul>
                    </div>
                </div>
                
                <h4>Olm (Final Boss)</h4>
                <ul>
                    <li><strong>Hand Phases:</strong> Attack left hand → right hand → head</li>
                    <li><strong>Special Attacks:</strong> Learn to identify and react to crystals, portals, lightning</li>
                    <li><strong>Head Phase:</strong> Only attack when both hands are disabled</li>
                    <li><strong>Running Head:</strong> Follow head and attack while moving</li>
                </ul>
            </div>
        `;
    }

    getCalculatorsContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Advanced Calculators</h1>
                <p class="page-subtitle">Comprehensive tools for planning your OSRS progression</p>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">📊 Experience Calculator</h3>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Current XP:</label>
                        <input type="number" class="form-input" id="current-xp" placeholder="Enter current XP">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Target Level:</label>
                        <input type="number" class="form-input" id="target-level" min="1" max="99" placeholder="1-99">
                    </div>
                    <button class="btn btn-primary" id="calc-xp">Calculate XP Needed</button>
                    <div class="result" id="xp-result"></div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🙏 Prayer Calculator</h3>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Current Level:</label>
                        <input type="number" class="form-input" id="prayer-current" min="1" max="99" value="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Target Level:</label>
                        <input type="number" class="form-input" id="prayer-target" min="1" max="99">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Bone Type:</label>
                        <select class="form-select" id="bone-type">
                            <option value="252,3000">Dragon bones (252 XP, ~3k gp)</option>
                            <option value="500,12000">Superior dragon bones (500 XP, ~12k gp)</option>
                            <option value="350,8000">Wyvern bones (350 XP, ~8k gp)</option>
                            <option value="125,600">Big bones (125 XP, ~600 gp)</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" id="calc-prayer">Calculate Cost</button>
                    <div class="result" id="prayer-result"></div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">💰 Boss Profit Calculator</h3>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Drop Value (GP):</label>
                        <input type="number" class="form-input" id="drop-value" placeholder="e.g., 100000000">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Drop Rate (1/x):</label>
                        <input type="number" class="form-input" id="drop-rate" placeholder="e.g., 5000">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Kills per Hour:</label>
                        <input type="number" class="form-input" id="kills-per-hour" value="20">
                    </div>
                    <button class="btn btn-primary" id="calc-profit">Calculate Profit</button>
                    <div class="result" id="profit-result"></div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🏠 Construction Calculator</h3>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Current Level:</label>
                        <input type="number" class="form-input" id="con-current" min="1" max="99" value="1">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Target Level:</label>
                        <input type="number" class="form-input" id="con-target" min="1" max="99">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Method:</label>
                        <select class="form-select" id="con-method">
                            <option value="480,1520">Oak Larders (480 XP, 1520 gp)</option>
                            <option value="1406,4830">Mahogany Tables (1406 XP, 4830 gp)</option>
                            <option value="200,150">Mahogany Homes (200 XP, 150 gp)</option>
                        </select>
                    </div>
                    <button class="btn btn-primary" id="calc-construction">Calculate Cost</button>
                    <div class="result" id="construction-result"></div>
                </div>
            </div>
        `;
    }

    getQuestGuideContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Complete Quest Guide</h1>
                <p class="page-subtitle">Optimal quest orders for efficient account progression</p>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🎯 Essential Early Quests</h3>
                </div>
                
                <table class="equipment-table">
                    <thead>
                        <tr>
                            <th>Priority</th>
                            <th>Quest</th>
                            <th>Requirements</th>
                            <th>XP Rewards</th>
                            <th>Important Unlocks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="stat-item">1</td>
                            <td><strong>Waterfall Quest</strong></td>
                            <td>None</td>
                            <td class="stat-item">13,750 Attack + Strength</td>
                            <td>Instant level 30 combat stats</td>
                        </tr>
                        <tr>
                            <td class="stat-item">2</td>
                            <td><strong>Fight Arena</strong></td>
                            <td>None</td>
                            <td class="stat-item">12,175 Attack</td>
                            <td>More attack XP progression</td>
                        </tr>
                        <tr>
                            <td class="stat-item">3</td>
                            <td><strong>The Grand Tree</strong></td>
                            <td>None</td>
                            <td class="stat-item">18,400 Agility + 7,900 Attack</td>
                            <td>Spirit trees, gnome gliders</td>
                        </tr>
                        <tr>
                            <td class="stat-item">4</td>
                            <td><strong>Tree Gnome Village</strong></td>
                            <td>None</td>
                            <td class="stat-item">11,450 Attack</td>
                            <td>Access to gnome stronghold</td>
                        </tr>
                        <tr>
                            <td class="stat-item">5</td>
                            <td><strong>Animal Magnetism</strong></td>
                            <td>18 Slayer, 19 Crafting, 30 Ranged</td>
                            <td class="stat-item">1,000 Slayer + Crafting</td>
                            <td>Ava's accumulator (essential for ranged)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">🔓 Major Unlock Quests</h3>
                    </div>
                    
                    <h4>Transportation</h4>
                    <ul>
                        <li><strong>Fairy Tale I & II:</strong> Fairy ring network</li>
                        <li><strong>The Grand Tree:</strong> Spirit trees</li>
                        <li><strong>Ghosts Ahoy:</strong> Ectophial (fast Morytania teleport)</li>
                        <li><strong>Shilo Village:</strong> Access to Shilo Village</li>
                    </ul>
                    
                    <h4>Combat Upgrades</h4>
                    <ul>
                        <li><strong>Monkey Madness I:</strong> Dragon weapons</li>
                        <li><strong>Heroes' Quest:</strong> Dragon battleaxe/mace</li>
                        <li><strong>Legends' Quest:</strong> Dragon sq shield</li>
                        <li><strong>King's Ransom:</strong> Piety prayer</li>
                    </ul>
                    
                    <h4>Skill Unlocks</h4>
                    <ul>
                        <li><strong>Druidic Ritual:</strong> Herblore skill</li>
                        <li><strong>Rune Mysteries:</strong> Runecrafting skill</li>
                        <li><strong>Lunar Diplomacy:</strong> Lunar spellbook</li>
                        <li><strong>Desert Treasure:</strong> Ancient magicks</li>
                    </ul>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">👑 Recipe for Disaster</h3>
                        <span class="card-badge">Best in Slot Gloves</span>
                    </div>
                    
                    <h4>Subquest Order</h4>
                    <ol>
                        <li><strong>Cook's Assistant:</strong> Start the quest</li>
                        <li><strong>Goblin generals:</strong> Easy, no requirements</li>
                        <li><strong>Evil Dave:</strong> 25 Cooking, easy spices</li>
                        <li><strong>Pirate Pete:</strong> 31 Cooking, The Corsair Curse</li>
                        <li><strong>Lumbridge Guide:</strong> 40 Cooking, simple ingredients</li>
                        <li><strong>Dwarf:</strong> Fishing Contest quest</li>
                        <li><strong>Skrach Uglogwee:</strong> Big Chompy Bird Hunting</li>
                        <li><strong>Sir Amik Varze:</strong> Black Knight's Fortress</li>
                        <li><strong>Monkey Ambassador:</strong> Monkey Madness I</li>
                        <li><strong>Awowogei:</strong> 70+ Cooking, expensive ingredients</li>
                    </ol>
                    
                    <h4>Glove Progression</h4>
                    <ul>
                        <li><strong>Iron gloves:</strong> 1 subquest (+1 Attack/Defence)</li>
                        <li><strong>Bronze gloves:</strong> 3 subquests (+2 Attack/Defence)</li>
                        <li><strong>Steel gloves:</strong> 4 subquests (+3 Attack/Defence)</li>
                        <li><strong>Black gloves:</strong> 5 subquests (+4 Attack/Defence)</li>
                        <li><strong>Mithril gloves:</strong> 6 subquests (+5 Attack/Defence)</li>
                        <li><strong>Adamant gloves:</strong> 7 subquests (+7 Attack/Defence)</li>
                        <li><strong>Rune gloves:</strong> 8 subquests (+8 Attack/Defence)</li>
                        <li><strong>Dragon gloves:</strong> 9 subquests (+9 Attack/Defence)</li>
                        <li><strong>Barrows gloves:</strong> All 10 subquests (+12 all Attack stats)</li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">🏆 End-Game Quest Requirements</h3>
                </div>
                
                <div class="grid grid-2">
                    <div>
                        <h4>Song of the Elves</h4>
                        <div class="equipment-recommendation">
                            <h4>Requirements</h4>
                            <p><strong>Skills:</strong> 70 Agility, 70 Construction, 70 Farming, 70 Herblore, 70 Hunter, 70 Mining, 70 Smithing, 70 Woodcutting<br>
                            <strong>Quests:</strong> Regicide, Roving Elves, Sheep Herder, Underground Pass</p>
                        </div>
                        <ul>
                            <li><strong>Unlocks:</strong> Prifddinas city</li>
                            <li><strong>Unlocks:</strong> The Gauntlet minigame</li>
                            <li><strong>Unlocks:</strong> Crystal armor and weapons</li>
                            <li><strong>XP Rewards:</strong> 20,000 XP in Agility, Construction, Farming, Herblore, Hunter, Mining, Smithing, Woodcutting</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4>Dragon Slayer II</h4>
                        <div class="equipment-recommendation">
                            <h4>Requirements</h4>
                            <p><strong>Skills:</strong> 75 Magic, 70 Smithing, 68 Mining, 62 Crafting, 60 Agility, 50 Construction<br>
                            <strong>Quests:</strong> Legends' Quest, Dream Mentor, A Tail of Two Cats, Animal Magnetism, Ghosts Ahoy, Bone Voyage, Client of Kourend</p>
                        </div>
                        <ul>
                            <li><strong>Unlocks:</strong> Vorkath boss fights</li>
                            <li><strong>Unlocks:</strong> Myths' Guild</li>
                            <li><strong>Unlocks:</strong> Dragon platebody</li>
                            <li><strong>XP Rewards:</strong> 18,000 Smithing, 15,000 Magic</li>
                        </ul>
                    </div>
        </div>
    </div>
`;
    }

    getSlayerGuideContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Slayer Guide</h1>
                <p class="page-subtitle">Strategies for efficient slayer training are coming soon.</p>
            </div>
            <p>Content under construction.</p>
        `;
    }

    getAchievementDiariesContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Achievement Diaries</h1>
                <p class="page-subtitle">A checklist of diary tasks for all regions.</p>
            </div>
            <p>Content under construction.</p>
        `;
    }

    getRaidsContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Raids Guide</h1>
                <p class="page-subtitle">Detailed raid strategies coming soon.</p>
            </div>
            <p>Content under construction.</p>
        `;
    }

    getMoneyMakingContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Money Making</h1>
                <p class="page-subtitle">Profitable methods will be added soon.</p>
            </div>
            <p>Content under construction.</p>
        `;
    }

    getTrackersContent() {
        return `
            <div class="page-header">
                <h1 class="page-title">Progress Trackers</h1>
                <p class="page-subtitle">Mark tasks complete to track your journey.</p>
            </div>

            <div class="progress-container">
                <div class="progress-header">
                    <span>Overall Progress</span>
                    <span id="overall-progress">0%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="overall-progress-bar" style="width:0%"></div>
                </div>
            </div>

            <div class="checklist-container">
                <label class="checklist-item">
                    <input type="checkbox" data-task="quest-rfd"> Complete Recipe for Disaster
                </label>
                <label class="checklist-item">
                    <input type="checkbox" data-task="fire-cape"> Obtain Fire Cape
                </label>
                <label class="checklist-item">
                    <input type="checkbox" data-task="ds2"> Finish Dragon Slayer II
                </label>
                <label class="checklist-item">
                    <input type="checkbox" data-task="max-total"> Achieve 2277 total level
                </label>
            </div>
        `;
    }

    bindPageEvents() {
        // Equipment tier selector
        const tierButtons = document.querySelectorAll('.tier-btn');
        tierButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tierButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tier = btn.dataset.tier;
                document.getElementById('equipment-display').innerHTML = this.getEquipmentTierContent(tier);
            });
        });

        // Calculator bindings
        this.bindCalculators();
        
        // Progress tracking
        this.bindProgressTrackers();
    }

    bindCalculators() {
        // XP Calculator
        const xpCalc = document.getElementById('calc-xp');
        if (xpCalc) {
            xpCalc.addEventListener('click', () => {
                const current = parseInt(document.getElementById('current-xp').value, 10) || 0;
                const target = parseInt(document.getElementById('target-level').value, 10);
                
                if (!target || target < 1 || target > 99) {
                    this.showResult('xp-result', 'Please enter a target level between 1 and 99.');
                    return;
                }

                const targetXp = xpForLevel(target);
                const needed = targetXp - current;
                const currentLevel = levelForXp(current);

                if (needed <= 0) {
                    this.showResult('xp-result', '🎉 Target level already achieved!');
                } else {
                    this.showResult('xp-result', 
                        `🎯 XP needed: ${needed.toLocaleString()}\n📊 Current level: ${currentLevel}\n⏱️ At 50k XP/hr: ${Math.ceil(needed / 50000)} hours`);
                }
            });
        }

        // Prayer Calculator
        const prayerCalc = document.getElementById('calc-prayer');
        if (prayerCalc) {
            prayerCalc.addEventListener('click', () => {
                const currentLevel = parseInt(document.getElementById('prayer-current').value, 10) || 1;
                const target = parseInt(document.getElementById('prayer-target').value, 10);
                const boneData = document.getElementById('bone-type').value.split(',');
                const xpPerBone = parseInt(boneData[0], 10);
                const costPerBone = parseInt(boneData[1], 10);

                if (!target || target < 1 || target > 99 || target <= currentLevel) {
                    this.showResult('prayer-result', 'Enter a valid target level higher than current level.');
                    return;
                }

                const currentXp = xpForLevel(currentLevel);
                const targetXp = xpForLevel(target);
                const neededXp = targetXp - currentXp;
                const bones = Math.ceil(neededXp / xpPerBone);
                const cost = bones * costPerBone;

                this.showResult('prayer-result', 
                    `🦴 Bones needed: ${bones.toLocaleString()}\n💰 Total cost: ${cost.toLocaleString()} gp\n📊 XP needed: ${neededXp.toLocaleString()}`);
            });
        }

        // Profit Calculator
        const profitCalc = document.getElementById('calc-profit');
        if (profitCalc) {
            profitCalc.addEventListener('click', () => {
                const value = parseInt(document.getElementById('drop-value').value, 10) || 0;
                const rate = parseInt(document.getElementById('drop-rate').value, 10) || 0;
                const kills = parseInt(document.getElementById('kills-per-hour').value, 10) || 0;

                if (value <= 0 || rate <= 0 || kills <= 0) {
                    this.showResult('profit-result', 'Please enter valid positive numbers for all fields.');
                    return;
                }

                const expectedProfit = (value / rate) * kills;
                const dropChance = ((kills / rate) * 100);
                const hoursForDrop = rate / kills;

                this.showResult('profit-result', 
                    `💰 Expected profit: ${expectedProfit.toLocaleString()} gp/hr\n🎯 Drop chance per hour: ${dropChance.toFixed(2)}%\n⏱️ Expected hours for drop: ${hoursForDrop.toFixed(1)}`);
            });
        }

        // Construction Calculator
        const conCalc = document.getElementById('calc-construction');
        if (conCalc) {
            conCalc.addEventListener('click', () => {
                const currentLevel = parseInt(document.getElementById('con-current').value, 10) || 1;
                const target = parseInt(document.getElementById('con-target').value, 10);
                const methodData = document.getElementById('con-method').value.split(',');
                const xpPerAction = parseInt(methodData[0], 10);
                const costPerAction = parseInt(methodData[1], 10);

                if (!target || target < 1 || target > 99 || target <= currentLevel) {
                    this.showResult('construction-result', 'Enter a valid target level higher than current level.');
                    return;
                }

                const currentXp = xpForLevel(currentLevel);
                const targetXp = xpForLevel(target);
                const neededXp = targetXp - currentXp;
                const actions = Math.ceil(neededXp / xpPerAction);
                const cost = actions * costPerAction;

                this.showResult('construction-result', 
                    `🔨 Actions needed: ${actions.toLocaleString()}\n💰 Total cost: ${cost.toLocaleString()} gp\n📊 Cost per XP: ${(cost / neededXp).toFixed(1)} gp/xp`);
            });
        }
    }

    bindProgressTrackers() {
        // Bind checkbox events for progress tracking
        document.querySelectorAll('[data-task], [data-storage-key]').forEach(checkbox => {
            const key = checkbox.dataset.task || checkbox.dataset.storageKey;
            if (key) {
                const stored = localStorage.getItem(`osrs-${key}`) === 'true';
                checkbox.checked = stored;
                
                checkbox.addEventListener('change', () => {
                    localStorage.setItem(`osrs-${key}`, checkbox.checked);
                    this.updateProgressBars();
                });
            }
        });

        this.updateProgressBars();
    }

    updateProgressBars() {
        // Update any visible progress bars based on completed tasks
        const checkboxes = document.querySelectorAll('[data-task], [data-storage-key]');
        if (checkboxes.length > 0) {
            const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
            const total = checkboxes.length;
            const percentage = Math.round((completed / total) * 100);
            
            const progressBar = document.getElementById('overall-progress-bar');
            const progressText = document.getElementById('overall-progress');
            
            if (progressBar && progressText) {
                progressBar.style.width = `${percentage}%`;
                progressText.textContent = `${percentage}%`;
            }
        }
    }

    showResult(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.classList.add('show');
            setTimeout(() => element.classList.remove('show'), 8000);
        }
    }

}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Load theme
    const stored = localStorage.getItem('theme');
    if (stored === 'light') {
        document.body.classList.add('light');
        document.getElementById('theme-toggle').textContent = '☀️';
    }

    // Initialize app
    window.osrsApp = new OSRSGuideApp();

    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});
