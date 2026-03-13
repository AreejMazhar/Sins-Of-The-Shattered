window.renderCharacters = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'characters-container fade-in';

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">The Adventuring Party</h2>
        </div>
        <div class="grid-cards">
            ${data.characters.map(char => `
                <div class="card char-card" data-id="${char.id}">
                    <img src="${char.image}" alt="${char.name}" style="width:100px; height:100px; border-radius:50%; margin:0 auto 1rem; display:block; border:2px solid var(--accent-gold);">
                    <h3 style="text-align:center;">${char.name}</h3>
                    <p style="text-align:center; color:var(--accent-gold); font-size:0.9rem;">Level ${char.level} ${char.race} ${char.class}</p>
                    <div style="display:flex; justify-content:space-around; margin-top:1rem; border-top:1px solid var(--panel-border); padding-top:1rem;">
                        <span class="text-success" title="Hit Points">❤️ ${char.hp}</span>
                        <span class="text-magic" title="Armor Class">🛡️ ${char.ac}</span>
                        <span class="text-gold" title="Gold">🪙 ${char.gold || 0}</span>
                    </div>
                    <div style="margin-top:0.8rem; font-style:italic; font-size:0.85rem; color:var(--text-muted); text-align:center; padding:0 0.5rem;">
                        "${(char.quotes && char.quotes.length) ? char.quotes[0] : ''}"
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Add interactivity
    const cards = container.querySelectorAll('.char-card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            const char = data.characters.find(c => c.id === id);

            const tabsHtml = `
                <div style="display:flex; gap:1rem; border-bottom:1px solid var(--panel-border); margin-bottom:1.5rem;">
                    <button id="tab-bio" class="char-tab btn" style="border:none; border-bottom:2px solid var(--accent-gold); border-radius:0; background:transparent; padding-bottom:0.5rem;">Biography</button>
                    <button id="tab-looks" class="char-tab btn" style="border:none; border-bottom:2px solid transparent; border-radius:0; background:transparent; padding-bottom:0.5rem;">Appearance</button>
                    <button id="tab-persona" class="char-tab btn" style="border:none; border-bottom:2px solid transparent; border-radius:0; background:transparent; padding-bottom:0.5rem;">Personality</button>
                    <button id="tab-quotes" class="char-tab btn" style="border:none; border-bottom:2px solid transparent; border-radius:0; background:transparent; padding-bottom:0.5rem;">Quotes</button>
                </div>
            `;

            appInstance.openModal(`
                <div style="display:flex; gap:2rem; flex-wrap:wrap; margin-bottom:1.5rem;">
                    <div style="flex:1; min-width:180px; text-align:center;">
                        <img id="char-modal-img" src="${char.image}" style="width:160px; height:160px; border-radius:10px; border:3px solid var(--accent-gold); object-fit:cover;">
                        <div style="margin-top:0.5rem; display:flex; gap:0.5rem; justify-content:center;">
                            <button id="edit-char-img-btn" class="btn" style="font-size:0.75rem; padding:0.3rem 0.6rem; background:var(--panel-border);">Edit Image</button>
                            <button id="edit-char-btn" class="btn" style="font-size:0.75rem; padding:0.3rem 0.6rem; background:var(--accent-gold); color:var(--bg-dark);">✏️ Edit</button>
                        </div>
                        <h2 style="font-size:1.8rem; margin-top:1rem;">${char.name}</h2>
                        <h4 class="text-gold">${char.race} ${char.class}</h4>
                        <div style="display:flex; justify-content:space-around; margin-top:1rem; gap:0.5rem;">
                            <div class="stat-box" style="flex:1">
                                <div class="stat-value text-success">${char.hp}</div>
                                <div class="stat-label">HP</div>
                            </div>
                            <div class="stat-box" style="flex:1">
                                <div class="stat-value text-magic">${char.ac}</div>
                                <div class="stat-label">AC</div>
                            </div>
                            <div class="stat-box" style="flex:1">
                                <div class="stat-value">${char.level}</div>
                                <div class="stat-label">Lvl</div>
                            </div>
                        </div>
                        <!-- Gold Tracker -->
                        <div style="margin-top:1rem; background:var(--bg-dark); border:1px solid var(--panel-border); border-radius:var(--radius-md); padding:0.8rem;">
                            <div style="color:var(--accent-gold); font-size:0.8rem; font-weight:bold; margin-bottom:0.4rem;">🪙 GOLD</div>
                            <div style="display:flex; align-items:center; gap:0.4rem; justify-content:center;">
                                <button id="gold-minus" class="btn" style="padding:0.1rem 0.5rem; min-width:auto; font-size:1rem; background:var(--danger);">−</button>
                                <input type="number" id="gold-input" value="${char.gold || 0}" min="0" style="width:70px; text-align:center; padding:0.3rem; margin:0; font-size:1rem;" />
                                <button id="gold-plus" class="btn" style="padding:0.1rem 0.5rem; min-width:auto; font-size:1rem; background:var(--success);">+</button>
                            </div>
                            <button id="gold-save" class="btn" style="width:100%; margin-top:0.5rem; padding:0.3rem; font-size:0.8rem; background:var(--accent-gold); color:var(--bg-dark);">Save Gold</button>
                        </div>
                    </div>
                    <div style="flex:3; min-width:300px;">
                        ${tabsHtml}

                        <!-- Bio Tab -->
                        <div id="content-bio" class="char-tab-content">
                            <p style="color:var(--text-muted); line-height:1.8; white-space:pre-wrap; font-size:0.95rem;">${char.bio || 'No biography recorded.'}</p>
                            ${char.goals ? `<h4 style="margin-top:1.5rem; margin-bottom:0.5rem;" class="text-gold">Goals</h4><p style="color:var(--text-muted); white-space:pre-wrap; font-size:0.9rem;">${char.goals}</p>` : ''}
                            ${char.skills ? `<h4 style="margin-top:1.5rem; margin-bottom:0.5rem;" class="text-gold">Skills &amp; Value</h4><p style="color:var(--text-muted); white-space:pre-wrap; font-size:0.9rem;">${char.skills}</p>` : ''}
                        </div>

                        <!-- Appearance Tab -->
                        <div id="content-looks" class="char-tab-content" style="display:none;">
                            <p style="color:var(--text-muted); line-height:1.8; white-space:pre-wrap; font-size:0.95rem;">${char.appearance || 'No appearance details recorded.'}</p>
                        </div>

                        <!-- Personality Tab -->
                        <div id="content-persona" class="char-tab-content" style="display:none;">
                            <p style="color:var(--text-muted); line-height:1.8; white-space:pre-wrap; font-size:0.95rem;">${char.personality || 'No personality details recorded.'}</p>
                            ${char.quirks ? `<h4 style="margin-top:1.5rem; margin-bottom:0.5rem;" class="text-gold">Quirks &amp; Habits</h4><p style="color:var(--text-muted); white-space:pre-wrap; font-size:0.9rem;">${char.quirks}</p>` : ''}
                        </div>

                        <!-- Quotes Tab -->
                        <div id="content-quotes" class="char-tab-content" style="display:none;">
                            <div id="quote-list" style="max-height:220px; overflow-y:auto; margin-bottom:1rem; padding-right:0.5rem;">
                                ${(char.quotes || []).map((q, idx) => 
                                    '<div style="display:flex; justify-content:space-between; align-items:center; border-left:3px solid var(--accent-gold); margin-bottom:0.8rem; background:rgba(0,0,0,0.1); border-radius:0 var(--radius-sm) var(--radius-sm) 0; padding:0.5rem 1rem;">' +
                                        '<div style="font-style:italic;">"' + q + '"</div>' +
                                        '<div style="display:flex; gap:0.5rem; margin-left:1rem;">' +
                                            '<button class="btn edit-quote-btn" data-idx="' + idx + '" style="padding:0.2rem 0.5rem; font-size:0.8rem; min-width:auto;">✏️</button>' +
                                            '<button class="btn delete-quote-btn" data-idx="' + idx + '" style="padding:0.2rem 0.5rem; font-size:0.8rem; background:var(--danger); min-width:auto;">🗑️</button>' +
                                        '</div>' +
                                    '</div>'
                                ).join('')}
                                ${(!char.quotes || !char.quotes.length) ? '<p class="text-muted">No quotes recorded.</p>' : ''}
                            </div>
                            <div style="display:flex; gap:0.5rem;">
                                <input type="text" id="new-quote-input" placeholder="Add a memorable quote..." style="flex:1; margin:0;" />
                                <button id="add-quote-btn" class="btn">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            `, (modalBody) => {
                // Tab switching
                const tabs = ['bio', 'looks', 'persona', 'quotes'];
                tabs.forEach(tabKey => {
                    const btn = modalBody.querySelector('#tab-' + tabKey);
                    const content = modalBody.querySelector('#content-' + tabKey);
                    if(btn) {
                        btn.addEventListener('click', () => {
                            modalBody.querySelectorAll('.char-tab').forEach(b => b.style.borderBottomColor = 'transparent');
                            modalBody.querySelectorAll('.char-tab-content').forEach(c => c.style.display = 'none');
                            btn.style.borderBottomColor = 'var(--accent-gold)';
                            if(content) content.style.display = 'block';
                        });
                    }
                });

                // Edit Profile Image Logic
                const editImgBtn = modalBody.querySelector('#edit-char-img-btn');
                if (editImgBtn) {
                    editImgBtn.addEventListener('click', () => {
                        const newUrl = prompt("Enter new profile image URL:", char.image);
                        if (newUrl && newUrl.trim() !== "") {
                            char.image = newUrl.trim();
                            modalBody.querySelector('#char-modal-img').src = char.image;
                            DB.save('characters', char);
                            appInstance.renderView('characters');
                        }
                    });
                }

                // Gold tracker logic
                const goldInput = modalBody.querySelector('#gold-input');
                const goldMinus = modalBody.querySelector('#gold-minus');
                const goldPlus = modalBody.querySelector('#gold-plus');
                const goldSave = modalBody.querySelector('#gold-save');

                if (goldMinus) goldMinus.addEventListener('click', () => {
                    goldInput.value = Math.max(0, parseInt(goldInput.value || 0) - 1);
                });
                if (goldPlus) goldPlus.addEventListener('click', () => {
                    goldInput.value = parseInt(goldInput.value || 0) + 1;
                });
                if (goldSave) goldSave.addEventListener('click', () => {
                    char.gold = parseInt(goldInput.value) || 0;
                    DB.save('characters', char);
                    appInstance.renderView('characters');
                    appInstance.closeModal();
                });

                // Edit Character button
                const editCharBtn = modalBody.querySelector('#edit-char-btn');
                if (editCharBtn) {
                    editCharBtn.addEventListener('click', () => {
                        appInstance.openModal(`
                            <h2 class="text-gold" style="margin-bottom:1.5rem;">Edit: ${char.name}</h2>
                            <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                                <div style="flex:1; min-width:200px;">
                                    <label>Name</label>
                                    <input type="text" id="ec-name" value="${char.name.replace(/"/g, '&quot;')}" />
                                    <label>Race</label>
                                    <input type="text" id="ec-race" value="${(char.race || '').replace(/"/g, '&quot;')}" />
                                    <label>Class</label>
                                    <input type="text" id="ec-class" value="${(char.class || '').replace(/"/g, '&quot;')}" />
                                    <label>Level</label>
                                    <input type="number" id="ec-level" value="${char.level || 1}" min="1" max="20"/>
                                </div>
                                <div style="flex:1; min-width:200px;">
                                    <label>Hit Points (HP)</label>
                                    <input type="number" id="ec-hp" value="${char.hp || 0}" min="0" />
                                    <label>Armor Class (AC)</label>
                                    <input type="number" id="ec-ac" value="${char.ac || 0}" min="0" />
                                    <label>Gold (gp)</label>
                                    <input type="number" id="ec-gold" value="${char.gold || 0}" min="0" />
                                </div>
                            </div>
                            <label>Biography</label>
                            <textarea id="ec-bio" rows="3">${char.bio || ''}</textarea>
                            <label>Goals</label>
                            <textarea id="ec-goals" rows="2">${char.goals || ''}</textarea>
                            <label>Skills &amp; Value</label>
                            <textarea id="ec-skills" rows="2">${char.skills || ''}</textarea>
                            <label>Appearance</label>
                            <textarea id="ec-appearance" rows="2">${char.appearance || ''}</textarea>
                            <label>Personality</label>
                            <textarea id="ec-personality" rows="2">${char.personality || ''}</textarea>
                            <label>Quirks &amp; Habits</label>
                            <textarea id="ec-quirks" rows="2">${char.quirks || ''}</textarea>
                            <div style="text-align:right; margin-top:1rem;">
                                <button id="save-ec-btn" class="btn" style="background:var(--accent-gold); color:var(--bg-dark);">Save Changes</button>
                            </div>
                        `, (editBody) => {
                            editBody.querySelector('#save-ec-btn').addEventListener('click', () => {
                                char.name = editBody.querySelector('#ec-name').value;
                                char.race = editBody.querySelector('#ec-race').value;
                                char.class = editBody.querySelector('#ec-class').value;
                                char.level = parseInt(editBody.querySelector('#ec-level').value) || 1;
                                char.hp = parseInt(editBody.querySelector('#ec-hp').value) || 0;
                                char.ac = parseInt(editBody.querySelector('#ec-ac').value) || 0;
                                char.gold = parseInt(editBody.querySelector('#ec-gold').value) || 0;
                                char.bio = editBody.querySelector('#ec-bio').value;
                                char.goals = editBody.querySelector('#ec-goals').value;
                                char.skills = editBody.querySelector('#ec-skills').value;
                                char.appearance = editBody.querySelector('#ec-appearance').value;
                                char.personality = editBody.querySelector('#ec-personality').value;
                                char.quirks = editBody.querySelector('#ec-quirks').value;
                                DB.save('characters', char);
                                appInstance.closeModal();
                                appInstance.renderView('characters');
                            });
                        });
                    });
                }

                // Quotes Logic
                const addQuoteBtn = modalBody.querySelector('#add-quote-btn');
                const quoteInput = modalBody.querySelector('#new-quote-input');
                const quoteList = modalBody.querySelector('#quote-list');

                const renderQuotes = () => {
                    quoteList.innerHTML = (char.quotes || []).map((quote, idx) =>
                        '<div style="display:flex; justify-content:space-between; align-items:center; border-left:3px solid var(--accent-gold); margin-bottom:0.8rem; background:rgba(0,0,0,0.1); border-radius:0 var(--radius-sm) var(--radius-sm) 0; padding:0.5rem 1rem;">' +
                            '<div style="font-style:italic;">"' + quote + '"</div>' +
                            '<div style="display:flex; gap:0.5rem; margin-left:1rem;">' +
                                '<button class="btn edit-quote-btn" data-idx="' + idx + '" style="padding:0.2rem 0.5rem; font-size:0.8rem; min-width:auto;">✏️</button>' +
                                '<button class="btn delete-quote-btn" data-idx="' + idx + '" style="padding:0.2rem 0.5rem; font-size:0.8rem; background:var(--danger); min-width:auto;">🗑️</button>' +
                            '</div>' +
                        '</div>'
                    ).join('');
                };

                if(addQuoteBtn) {
                    addQuoteBtn.addEventListener('click', () => {
                        const q = quoteInput.value.trim();
                        if (!q) return;
                        if (!char.quotes) char.quotes = [];
                        char.quotes.push(q);
                        renderQuotes();
                        quoteInput.value = '';
                    });
                    
                    quoteInput.addEventListener('keydown', (e) => {
                        if(e.key === 'Enter') addQuoteBtn.click();
                    });
                }

                if (quoteList) {
                    quoteList.addEventListener('click', (e) => {
                        const editBtn = e.target.closest('.edit-quote-btn');
                        const delBtn = e.target.closest('.delete-quote-btn');

                        if (editBtn) {
                            const idx = parseInt(editBtn.dataset.idx);
                            const newQuote = prompt("Edit quote:", char.quotes[idx]);
                            if (newQuote !== null && newQuote.trim() !== '') {
                                char.quotes[idx] = newQuote.trim();
                                renderQuotes();
                            }
                        }

                        if (delBtn) {
                            const idx = parseInt(delBtn.dataset.idx);
                            if (confirm("Are you sure you want to delete this quote?")) {
                                char.quotes.splice(idx, 1);
                                renderQuotes();
                            }
                        }
                    });
                }
            });
        });
    });

    return container;
}
