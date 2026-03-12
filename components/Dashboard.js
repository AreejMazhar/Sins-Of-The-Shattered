window.renderDashboard = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'dashboard-container fade-in';

    // Calculate total party gold
    const totalGold = data.characters.reduce((sum, c) => sum + (Number(c.gold) || 0), 0);

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Campaign Dashboard</h2>
        </div>

        <div class="dashboard-grid">
            <!-- Left Column: Recap + Quests -->
            <div class="dash-col-left">
                <!-- Session History / Recap (moved above quests) -->
                <div class="widget">
                    <h3 class="widget-title" style="display:flex; justify-content:space-between; align-items:center;">
                        <span><span class="text-gold">📜</span> Latest Session Recap</span>
                    </h3>
                    <div class="history-list" id="dash-recap-container"></div>
                </div>

                <!-- Active Quests -->
                <div class="widget">
                    <h3 class="widget-title"><span class="text-gold">⚔️</span> Active Quests</h3>
                    <div id="dash-quests-grid"></div>
                </div>
            </div>

            <!-- Right Column: Party and Quotes -->
            <div class="dash-col-right">
                <!-- Party Members -->
                <div class="widget">
                    <h3 class="widget-title" style="display:flex; justify-content:space-between; align-items:center;">
                        <span><span class="text-gold">🛡️</span> The Party</span>
                        <span style="font-size:0.85rem; color:var(--accent-gold); background:rgba(0,0,0,0.3); padding:0.2rem 0.7rem; border-radius:10px; border:1px solid var(--accent-gold);">
                            🪙 Party Gold: <strong>${totalGold.toLocaleString()} gp</strong>
                        </span>
                    </h3>
                    <div class="party-list">
                        ${data.characters.map(char => `
                            <div class="party-member card" data-id="${char.id}">
                                <div style="display:flex; align-items:center; gap:10px; justify-content:space-between;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <img src="${char.image}" alt="${char.name}" style="width:40px; height:40px; border-radius:50%; border:1px solid var(--accent-gold);">
                                        <div>
                                            <strong>${char.name}</strong>
                                            <div style="font-size:0.8rem; color:var(--text-muted)">Lvl ${char.level} ${char.class}</div>
                                        </div>
                                    </div>
                                    <div style="font-size:0.85rem; color:var(--accent-gold); white-space:nowrap;">🪙 ${(char.gold || 0).toLocaleString()}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Latest Quotes -->
                <div class="widget">
                    <h3 class="widget-title"><span class="text-gold">🧿</span> Latest Quotes</h3>
                    <div id="dash-quotes-container" style="font-style:italic; padding:1rem; background:rgba(0,0,0,0.2); border-left:4px solid var(--accent-gold); border-radius:var(--radius-sm);"></div>
                </div>
            </div>
        </div>
    `;

    // Populate Active Quests (split main / side, only name + location + reward)
    const questsGrid = container.querySelector('#dash-quests-grid');
    const activeQuests = data.quests.filter(q => q.status === 'active');
    const mainActive = activeQuests.filter(q => q.isMainQuest !== false);
    const sideActive = activeQuests.filter(q => q.isMainQuest === false);

    if (activeQuests.length === 0) {
        questsGrid.innerHTML = `<p class="text-muted">No active quests at the moment.</p>`;
    } else {
        let html = '';

        if (mainActive.length > 0) {
            html += `<h4 style="color:var(--accent-gold); border-bottom:1px solid var(--accent-gold); padding-bottom:0.3rem; margin:0.5rem 0 0.8rem; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px;">Main Quests</h4>`;
            html += mainActive.map(quest => `
                <div class="card" style="padding:0.8rem 1rem; margin-bottom:0.6rem; cursor:pointer;" onclick="document.querySelector('button[data-target=\\'quests\\']').click()">
                    <div style="display:flex; justify-content:space-between; align-items:baseline; gap:0.5rem; flex-wrap:wrap;">
                        <strong style="font-size:0.95rem;">${quest.title}</strong>
                        <span class="text-gold" style="font-size:0.8rem; white-space:nowrap;">🏆 ${quest.rewards || 'Unknown'}</span>
                    </div>
                    <div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.25rem;">📍 ${quest.location}</div>
                </div>
            `).join('');
        }

        if (sideActive.length > 0) {
            html += `<h4 style="color:var(--text-muted); border-bottom:1px solid var(--text-muted); padding-bottom:0.3rem; margin:1rem 0 0.8rem; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px;">Side Quests</h4>`;
            html += sideActive.map(quest => `
                <div class="card" style="padding:0.8rem 1rem; margin-bottom:0.6rem; cursor:pointer;" onclick="document.querySelector('button[data-target=\\'quests\\']').click()">
                    <div style="display:flex; justify-content:space-between; align-items:baseline; gap:0.5rem; flex-wrap:wrap;">
                        <strong style="font-size:0.95rem;">${quest.title}</strong>
                        <span class="text-gold" style="font-size:0.8rem; white-space:nowrap;">🏆 ${quest.rewards || 'Unknown'}</span>
                    </div>
                    <div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.25rem;">📍 ${quest.location}</div>
                </div>
            `).join('');
        }

        questsGrid.innerHTML = html;
    }

    // Interactive Party Members
    container.querySelectorAll('.party-member').forEach(member => {
        member.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const character = data.characters.find(c => c.id === id);
            appInstance.openModal(`
                <div style="display:flex; gap:2rem;">
                    <img src="${character.image}" alt="${character.name}" style="width:150px; height:150px; border-radius:10px; border:2px solid var(--accent-gold);">
                    <div>
                        <h2 style="font-size:2rem; margin-bottom:0.5rem;">${character.name}</h2>
                        <div class="text-gold" style="font-size:1.1rem; margin-bottom:1rem;">Level ${character.level} ${character.race} ${character.class}</div>
                        <p>${character.bio}</p>
                    </div>
                </div>
                <div style="display:flex; justify-content:space-around; margin-top:2rem; background:rgba(0,0,0,0.4); padding:1rem; border-radius:var(--radius-md);">
                    <div class="stat-box">
                        <div class="stat-value text-success">${character.hp}</div>
                        <div class="stat-label">Hit Points</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${character.ac}</div>
                        <div class="stat-label">Armor Class</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value text-gold">${(character.gold || 0).toLocaleString()}</div>
                        <div class="stat-label">Gold (gp)</div>
                    </div>
                </div>
            `);
        });
    });

    // Populate Latest Recap (always index 0 — newest entry)
    const recapContainer = container.querySelector('#dash-recap-container');
    if (data.history && data.history.length > 0) {
        const latestSession = data.history[0];
        recapContainer.innerHTML = `
            <div class="history-item" style="padding:1rem; border:1px solid var(--panel-border); background:var(--bg-dark); border-radius:var(--radius-sm);">
                <h4 style="margin-bottom:0.5rem; color:var(--accent-gold);">${latestSession.title}</h4>
                <p class="text-muted" style="font-size:0.95rem; line-height:1.5;">${latestSession.summary}</p>
                <div style="margin-top:1rem; text-align:right;">
                    <button class="btn" style="padding:0.3rem 0.8rem; font-size:0.85rem;" onclick="document.querySelector('button[data-target=\\'journal\\']').click()">Read Full Journal</button>
                </div>
            </div>
        `;
    } else {
        recapContainer.innerHTML = `<p class="text-muted">No session logs available. Add one in the Session Journal!</p>`;
    }

    // Populate Rotating Quotes
    const quotesContainer = container.querySelector('#dash-quotes-container');
    let allQuotes = [];
    data.characters.forEach(c => {
        if (c.quotes && c.quotes.length > 0) {
            c.quotes.forEach(q => allQuotes.push({ text: q, author: c.name }));
        }
    });

    if (allQuotes.length > 0) {
        const renderRandomQuote = () => {
            const rand = allQuotes[Math.floor(Math.random() * allQuotes.length)];
            quotesContainer.innerHTML = `
                <div class="fade-in" style="font-size:1.05rem;">
                    "${rand.text}"
                    <div style="text-align:right; margin-top:0.5rem; font-weight:bold; font-size:0.9rem; color:var(--accent-gold); font-style:normal;">
                        — ${rand.author}
                    </div>
                </div>
            `;
        };
        renderRandomQuote();
        let quoteInterval = setInterval(() => {
            if (!document.contains(quotesContainer)) { clearInterval(quoteInterval); return; }
            renderRandomQuote();
        }, 8000);
    } else {
        quotesContainer.innerHTML = `<p class="text-muted">No quotes recorded yet.</p>`;
    }

    return container;
}
