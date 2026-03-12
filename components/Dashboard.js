window.renderDashboard = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'dashboard-container fade-in';

    const totalGold = data.characters.reduce((sum, c) => sum + (Number(c.gold) || 0), 0);

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Campaign Dashboard</h2>
        </div>

        <div class="dashboard-grid">
            <!-- Left Column: Recap + Quests -->
            <div class="dash-col-left">
                <!-- Latest Session Recap -->
                <div class="widget">
                    <h3 class="widget-title"><span class="text-gold">📜</span> Latest Session Recap</h3>
                    <div id="dash-recap-container"></div>
                </div>

                <!-- Active Quests -->
                <div class="widget">
                    <h3 class="widget-title"><span class="text-gold">⚔️</span> Active Quests</h3>
                    <div id="dash-quests-grid"></div>
                </div>
            </div>

            <!-- Right Column: Party and Quotes -->
            <div class="dash-col-right">
                <div class="widget">
                    <h3 class="widget-title" style="display:flex; justify-content:space-between; align-items:center;">
                        <span><span class="text-gold">🛡️</span> The Party</span>
                        <span style="font-size:0.85rem; color:var(--accent-gold); background:rgba(0,0,0,0.3); padding:0.2rem 0.7rem; border-radius:10px; border:1px solid var(--accent-gold);">
                            🪙 Party Gold: <strong>${totalGold.toLocaleString()} gp</strong>
                        </span>
                    </h3>
                    <div class="party-list" id="dash-party-list">
                        ${data.characters.map(char => `
                            <div class="party-member card" data-id="${char.id}" style="cursor:pointer;">
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

                <div class="widget">
                    <h3 class="widget-title"><span class="text-gold">🧿</span> Latest Quotes</h3>
                    <div id="dash-quotes-container" style="font-style:italic; padding:1rem; background:rgba(0,0,0,0.2); border-left:4px solid var(--accent-gold); border-radius:var(--radius-sm);"></div>
                </div>
            </div>
        </div>
    `;

    // --- Party members: click → open character modal (same as Characters page) ---
    container.querySelectorAll('.party-member').forEach(member => {
        member.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const char = data.characters.find(c => c.id === id);
            if (!char) return;

            // Navigate to characters page then open the matching card
            const charsBtn = document.querySelector('button[data-target="characters"]');
            if (charsBtn) charsBtn.click();

            // Wait for render then trigger the card click
            setTimeout(() => {
                const card = document.querySelector(`.char-card[data-id="${id}"]`);
                if (card) card.click();
            }, 350);
        });
    });

    // --- Active Quests (split main/side, name + location + reward only, click opens quest modal) ---
    const questsGrid = container.querySelector('#dash-quests-grid');
    const activeQuests = data.quests.filter(q => q.status === 'active');
    const mainActive = activeQuests.filter(q => q.isMainQuest !== false);
    const sideActive = activeQuests.filter(q => q.isMainQuest === false);

    function makeQuestCard(quest) {
        const div = document.createElement('div');
        div.className = 'card';
        div.dataset.questId = quest.id;
        div.style.cssText = 'padding:0.8rem 1rem; margin-bottom:0.6rem; cursor:pointer;';
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:baseline; gap:0.5rem; flex-wrap:wrap;">
                <strong style="font-size:0.95rem;">${quest.title}</strong>
                <span class="text-gold" style="font-size:0.8rem; white-space:nowrap;">🏆 ${quest.rewards || 'Unknown'}</span>
            </div>
            <div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.25rem;">📍 ${quest.location}</div>
        `;
        div.addEventListener('click', () => {
            // Navigate to quests page then open that quest's modal
            const questsBtn = document.querySelector('button[data-target="quests"]');
            if (questsBtn) questsBtn.click();
            setTimeout(() => {
                const card = document.querySelector(`.quest-card[data-id="${quest.id}"]`);
                if (card) card.click();
            }, 350);
        });
        return div;
    }

    if (activeQuests.length === 0) {
        questsGrid.innerHTML = `<p class="text-muted">No active quests at the moment.</p>`;
    } else {
        if (mainActive.length > 0) {
            const h = document.createElement('h4');
            h.style.cssText = 'color:var(--accent-gold); border-bottom:1px solid var(--accent-gold); padding-bottom:0.3rem; margin:0.5rem 0 0.8rem; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px;';
            h.textContent = 'Main Quests';
            questsGrid.appendChild(h);
            mainActive.forEach(q => questsGrid.appendChild(makeQuestCard(q)));
        }
        if (sideActive.length > 0) {
            const h = document.createElement('h4');
            h.style.cssText = 'color:var(--text-muted); border-bottom:1px solid var(--text-muted); padding-bottom:0.3rem; margin:1rem 0 0.8rem; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px;';
            h.textContent = 'Side Quests';
            questsGrid.appendChild(h);
            sideActive.forEach(q => questsGrid.appendChild(makeQuestCard(q)));
        }
    }

    // --- Latest Recap: click opens the session modal in Journal ---
    const recapContainer = container.querySelector('#dash-recap-container');
    if (data.history && data.history.length > 0) {
        const latestSession = data.history[0];
        const recapDiv = document.createElement('div');
        recapDiv.style.cssText = 'padding:1rem; border:1px solid var(--panel-border); background:var(--bg-dark); border-radius:var(--radius-sm); cursor:pointer;';
        recapDiv.innerHTML = `
            <h4 style="margin-bottom:0.5rem; color:var(--accent-gold);">${latestSession.title}</h4>
            <p class="text-muted" style="font-size:0.95rem; line-height:1.5; margin-bottom:0.75rem;">${latestSession.summary}</p>
            <p style="font-size:0.8rem; color:var(--accent-gold); opacity:0.7;">📖 Click to read full notes</p>
        `;
        recapDiv.addEventListener('click', () => {
            const journalBtn = document.querySelector('button[data-target="journal"]');
            if (journalBtn) journalBtn.click();
            setTimeout(() => {
                // Find the matching journal card and click it
                const card = document.querySelector(`.journal-card[data-id="${latestSession.id}"]`);
                if (card) card.click();
            }, 350);
        });
        recapContainer.appendChild(recapDiv);
    } else {
        recapContainer.innerHTML = `<p class="text-muted">No session logs available. Add one in the Session Journal!</p>`;
    }

    // --- Rotating Quotes ---
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
                    <div style="text-align:right; margin-top:0.5rem; font-weight:bold; font-size:0.9rem; color:var(--accent-gold); font-style:normal;">— ${rand.author}</div>
                </div>`;
        };
        renderRandomQuote();
        let qi = setInterval(() => {
            if (!document.contains(quotesContainer)) { clearInterval(qi); return; }
            renderRandomQuote();
        }, 8000);
    } else {
        quotesContainer.innerHTML = `<p class="text-muted">No quotes recorded yet.</p>`;
    }

    return container;
}
