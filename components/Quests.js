window.renderQuests = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'quests-container fade-in';

    // Track current filter so re-renders respect it
    let currentFilter = 'all';

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Quest Log</h2>
            <div style="display:flex; gap:10px;">
                <button class="btn active" id="filter-all">All</button>
                <button class="btn" id="filter-active">Active</button>
                <button class="btn" id="filter-completed">Completed</button>
                <button class="btn" id="add-quest-btn" style="margin-left:auto; background:var(--accent-gold); color:var(--bg-dark);">+ Add Quest</button>
            </div>
        </div>
        <div id="quests-container-body">
            ${renderQuestGroups(data.quests, 'all')}
        </div>
    `;

    function renderQuestGroups(quests, filter) {
        let filtered = filter === 'all' ? quests : quests.filter(q => q.status === filter);
        const main = filtered.filter(q => q.isMainQuest !== false);
        const side = filtered.filter(q => q.isMainQuest === false);
        return `
            ${main.length > 0 ? `
                <h3 style="color:var(--accent-gold); border-bottom:1px solid var(--accent-gold); padding-bottom:0.5rem; margin:1.5rem 0 1rem;">Main Quests</h3>
                <div class="grid-cards" style="margin-bottom:2rem;">${main.map(q => renderQuestCard(q)).join('')}</div>` : ''}
            ${side.length > 0 ? `
                <h3 style="color:var(--text-muted); border-bottom:1px solid var(--text-muted); padding-bottom:0.5rem; margin:1.5rem 0 1rem;">Side Quests</h3>
                <div class="grid-cards">${side.map(q => renderQuestCard(q)).join('')}</div>` : ''}
            ${filtered.length === 0 ? '<p class="text-muted">No quests match this filter.</p>' : ''}
        `;
    }

    function renderQuestCard(quest) {
        return `
        <div class="card quest-card" data-id="${quest.id}" style="cursor:pointer;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin-bottom:0.5rem;">${quest.title}</h3>
                <span style="font-size:0.8rem; padding:0.2rem 0.6rem; border-radius:10px; background:${quest.status === 'active' ? 'var(--accent-gold)' : 'var(--success)'}; color:${quest.status === 'active' ? '#000' : '#fff'};">${quest.status.toUpperCase()}</span>
            </div>
            <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1rem;">Location: ${quest.location}</p>
            <p style="font-size:0.9rem; margin-bottom:1rem; min-height:40px;">${quest.description}</p>
            <div style="display:flex; justify-content:space-between; align-items:flex-end;">
                <p style="color:var(--accent-magic); font-size:0.8rem; margin:0;">Giver: ${quest.npc}</p>
                <span class="text-gold" style="font-size:0.8rem;">Lvl ${quest.level || '?'}</span>
            </div>
        </div>`;
    }

    // Filter buttons
    ['all', 'active', 'completed'].forEach(f => {
        const btn = container.querySelector(`#filter-${f}`);
        if (btn) {
            btn.addEventListener('click', () => {
                currentFilter = f;
                container.querySelectorAll('.section-header .btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                container.querySelector('#quests-container-body').innerHTML = renderQuestGroups(data.quests, f);
                bindCards();
            });
        }
    });

    function openQuestModal(quest) {
        let tasksHtml = '';
        if (quest.tasks && quest.tasks.length > 0) {
            tasksHtml = `
                <h3 class="text-gold" style="margin-top:1.5rem; margin-bottom:0.5rem;">Tasks</h3>
                <div id="quest-tasks-list" style="margin-bottom:1.5rem;">
                    ${quest.tasks.map((task, idx) => `
                        <label style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; cursor:pointer;">
                            <input type="checkbox" class="task-checkbox" data-idx="${idx}" ${task.completed ? 'checked' : ''} style="width:auto; margin:0;" />
                            <span style="${task.completed ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${task.text}</span>
                        </label>
                    `).join('')}
                </div>`;
        } else if (quest.objectives) {
            tasksHtml = `
                <h3 class="text-gold" style="margin-top:1.5rem; margin-bottom:0.5rem;">Objectives</h3>
                <ul style="list-style-type:circle; padding-left:1.5rem; margin-bottom:1.5rem;">
                    ${quest.objectives.map(obj => `<li>${quest.status === 'completed' ? '<s>' + obj + '</s> ✓' : obj}</li>`).join('')}
                </ul>`;
        }

        appInstance.openModal(`
            <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom:1px solid var(--panel-border); padding-bottom:1rem; margin-bottom:1.5rem;">
                <h2 style="font-size:2.5rem; color:var(--accent-gold); margin:0;">${quest.title}</h2>
                <div style="display:flex; gap:0.5rem;">
                    <button id="edit-quest-btn" class="btn">Edit Quest</button>
                    <button id="delete-quest-btn" class="btn" style="background:var(--danger);">🗑️ Delete</button>
                </div>
            </div>
            <div style="display:grid; grid-template-columns:2fr 1fr; gap:2rem;">
                <div>
                    <h3 class="text-gold">Description</h3>
                    <p style="margin-bottom:1.5rem; line-height:1.8;">${quest.description}</p>
                    ${tasksHtml}
                </div>
                <div style="background:var(--bg-dark); padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--panel-border); height:fit-content;">
                    <p style="margin-bottom:1rem;"><strong>Status:</strong> <span style="color:${quest.status === 'active' ? 'var(--accent-gold)' : 'var(--success)'};">${quest.status.toUpperCase()}</span></p>
                    <p style="margin-bottom:1rem;"><strong>Type:</strong> ${quest.isMainQuest !== false ? 'Main Quest' : 'Side Quest'}</p>
                    <p style="margin-bottom:1rem;"><strong>Location:</strong> ${quest.location}</p>
                    <p style="margin-bottom:1rem;"><strong>Given By:</strong> ${quest.npc}</p>
                    <p style="margin-bottom:0.5rem;"><strong>Rewards:</strong></p>
                    <div class="text-success" style="padding:1rem; background:rgba(0,0,0,0.3); border-radius:var(--radius-sm); border:1px solid var(--success);">
                        ${quest.rewards}
                    </div>
                </div>
            </div>
        `, (modalBody) => {
            // Task checkboxes — FIX: update data then re-open modal without re-rendering whole view
            modalBody.querySelectorAll('.task-checkbox').forEach(cb => {
                cb.addEventListener('change', (ev) => {
                    const idx = parseInt(ev.target.dataset.idx);
                    quest.tasks[idx].completed = ev.target.checked;

                    const allDone = quest.tasks.every(t => t.completed);
                    if (allDone && quest.status === 'active') quest.status = 'completed';
                    else if (!allDone && quest.status === 'completed') quest.status = 'active';

                    // Persist to DB
                    DB.save('quests', quest);
                    // Close current modal and re-open same quest modal (no full page re-render)
                    appInstance.closeModal();
                    setTimeout(() => openQuestModal(quest), 50);
                });
            });

            // Edit button
            modalBody.querySelector('#edit-quest-btn').addEventListener('click', () => {
                appInstance.openModal(`
                    <h2 class="text-gold" style="margin-bottom:1.5rem;">Edit Quest: ${quest.title}</h2>
                    <label>Quest Title</label>
                    <input type="text" id="eq-title" value="${quest.title.replace(/"/g, '&quot;')}" />
                    <div style="display:flex; gap:1rem;">
                        <div style="flex:1;">
                            <label>Location</label>
                            <input type="text" id="eq-location" value="${quest.location.replace(/"/g, '&quot;')}" />
                        </div>
                        <div style="flex:1;">
                            <label>Quest Giver</label>
                            <input type="text" id="eq-npc" value="${quest.npc.replace(/"/g, '&quot;')}" />
                        </div>
                    </div>
                    <div style="display:flex; gap:1rem;">
                        <div style="flex:1;">
                            <label>Status</label>
                            <select id="eq-status">
                                <option value="active" ${quest.status === 'active' ? 'selected' : ''}>Active</option>
                                <option value="completed" ${quest.status === 'completed' ? 'selected' : ''}>Completed</option>
                            </select>
                        </div>
                        <div style="flex:1;">
                            <label>Type</label>
                            <select id="eq-type">
                                <option value="main" ${quest.isMainQuest !== false ? 'selected' : ''}>Main Quest</option>
                                <option value="side" ${quest.isMainQuest === false ? 'selected' : ''}>Side Quest</option>
                            </select>
                        </div>
                    </div>
                    <label>Rewards</label>
                    <input type="text" id="eq-rewards" value="${(quest.rewards || '').replace(/"/g, '&quot;')}" />
                    <label>Description</label>
                    <textarea id="eq-desc" rows="3">${quest.description}</textarea>
                    <div style="text-align:right; margin-top:1rem;">
                        <button id="save-eq-btn" class="btn" style="background:var(--accent-gold); color:var(--bg-dark);">Save Changes</button>
                    </div>
                `, (editBody) => {
                    editBody.querySelector('#save-eq-btn').addEventListener('click', () => {
                        quest.title = editBody.querySelector('#eq-title').value;
                        quest.location = editBody.querySelector('#eq-location').value;
                        quest.npc = editBody.querySelector('#eq-npc').value;
                        quest.status = editBody.querySelector('#eq-status').value;
                        quest.isMainQuest = editBody.querySelector('#eq-type').value === 'main';
                        quest.rewards = editBody.querySelector('#eq-rewards').value;
                        quest.description = editBody.querySelector('#eq-desc').value;
                        DB.save('quests', quest);
                        appInstance.closeModal();
                        container.querySelector('#quests-container-body').innerHTML = renderQuestGroups(data.quests, currentFilter);
                        bindCards();
                    });
                });
            });

            // Delete button
            modalBody.querySelector('#delete-quest-btn').addEventListener('click', () => {
                if (confirm(`Delete "${quest.title}"?`)) {
                    const idx = data.quests.findIndex(q => q.id === quest.id);
                    if (idx !== -1) data.quests.splice(idx, 1);
                    DB.delete('quests', quest.id);
                    appInstance.closeModal();
                    container.querySelector('#quests-container-body').innerHTML = renderQuestGroups(data.quests, currentFilter);
                    bindCards();
                }
            });
        });
    }

    function bindCards() {
        container.querySelectorAll('.quest-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const id = e.currentTarget.dataset.id;
                const quest = data.quests.find(q => q.id === id);
                if (quest) openQuestModal(quest);
            });
        });
    }

    bindCards();

    // Add Quest
    container.querySelector('#add-quest-btn').addEventListener('click', () => {
        appInstance.openModal(`
            <h2 class="text-gold" style="margin-bottom:1.5rem;">Add New Quest</h2>
            <label>Quest Title</label>
            <input type="text" id="new-quest-title" placeholder="The Missing Ring..." />
            <div style="display:flex; gap:1rem;">
                <div style="flex:1;">
                    <label>Location</label>
                    <input type="text" id="new-quest-location" placeholder="City Market" />
                </div>
                <div style="flex:1;">
                    <label>Quest Giver (NPC)</label>
                    <input type="text" id="new-quest-npc" placeholder="Elder Grump" />
                </div>
            </div>
            <div style="display:flex; gap:1rem;">
                <div style="flex:1;">
                    <label>Quest Category</label>
                    <select id="new-quest-type">
                        <option value="main">Main Quest</option>
                        <option value="side">Side Quest</option>
                    </select>
                </div>
                <div style="flex:1;">
                    <label>Rewards</label>
                    <input type="text" id="new-quest-rewards" placeholder="200 gp" />
                </div>
            </div>
            <label>Description</label>
            <textarea id="new-quest-desc" rows="3" placeholder="Explain the quest..."></textarea>
            <label>Tasks (Comma-separated)</label>
            <input type="text" id="new-quest-tasks" placeholder="Talk to Mayor, Find the sword, Escape" />
            <div style="text-align:right; margin-top:1rem;">
                <button id="save-quest-btn" class="btn" style="background:var(--accent-gold); color:var(--bg-dark);">Save Quest</button>
            </div>
        `, (modalBody) => {
            modalBody.querySelector('#save-quest-btn').addEventListener('click', () => {
                const title = modalBody.querySelector('#new-quest-title').value || 'Uncharted Quest';
                const location = modalBody.querySelector('#new-quest-location').value;
                const npc = modalBody.querySelector('#new-quest-npc').value;
                const type = modalBody.querySelector('#new-quest-type').value;
                const rewards = modalBody.querySelector('#new-quest-rewards').value;
                const desc = modalBody.querySelector('#new-quest-desc').value;
                const tasksArr = modalBody.querySelector('#new-quest-tasks').value
                    .split(',').map(t => ({ text: t.trim(), completed: false })).filter(t => t.text);

                const newQuest = {
                    id: 'q' + Date.now(),
                    title, status: 'active',
                    isMainQuest: type === 'main',
                    level: 1, description: desc,
                    tasks: tasksArr.length > 0 ? tasksArr : null,
                    objectives: tasksArr.length > 0 ? null : ['Investigate'],
                    rewards, location, npc
                };
                data.quests.push(newQuest);
                DB.save('quests', newQuest);

                appInstance.closeModal();
                container.querySelector('#quests-container-body').innerHTML = renderQuestGroups(data.quests, currentFilter);
                bindCards();
            });
        });
    });

    return container;
}
