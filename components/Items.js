window.renderItems = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'items-container fade-in';

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Items & Loot</h2>
            <div style="display:flex; justify-content:space-between; align-items:center; width:65%; gap:1rem;">
                <input type="text" placeholder="Search items..." style="flex:1; padding:0.5rem; background:var(--bg-dark); border:1px solid var(--panel-border); color:var(--text-main); border-radius:var(--radius-sm); margin-bottom:0;" />
                <select style="padding:0.5rem; background:var(--bg-dark); border:1px solid var(--panel-border); color:var(--text-main); border-radius:var(--radius-sm); margin-bottom:0;">
                    <option>All Rarities</option>
                    <option>Common</option>
                    <option>Uncommon</option>
                    <option>Rare</option>
                    <option>Epic</option>
                    <option>Legendary</option>
                </select>
                <button id="add-item-btn" class="btn" style="white-space:nowrap;">+ Add Item</button>
            </div>
        </div>
        
        <div class="item-grid" style="grid-template-columns:repeat(auto-fill, minmax(100px, 1fr)); gap:1.5rem;">
            ${data.items.map(item => `
                <div class="item-slot ${item.rarity}" data-id="${item.id}">
                    <div style="text-align:center;">
                        <div style="font-size:2.5rem; margin-bottom:0.5rem;">${item.emoji || getIconForType(item.type)}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Helpers
    function getIconForType(type) {
        if (type === 'weapon') return '🗡️';
        if (type === 'consumable') return '🧪';
        if (type === 'armor') return '🛡️';
        return '📦';
    }

    function getRarityColor(rarity) {
        if (rarity === 'common') return '#888';
        if (rarity === 'uncommon') return '#4CAF50';
        if (rarity === 'rare') return '#2196F3';
        if (rarity === 'epic') return '#9C27B0';
        if (rarity === 'legendary') return '#FFC107';
        return '#888';
    }

    // Interaction Tooltips and Modals
    const slots = container.querySelectorAll('.item-slot');
    
    slots.forEach(slot => {
        const item = data.items.find(i => i.id === slot.dataset.id);
        
        // Tooltips
        slot.addEventListener('mouseenter', (e) => {
            const html = `
                <h4 style="color:${getRarityColor(item.rarity)}; margin-bottom:0.5rem;">${item.name}</h4>
                <p style="font-size:0.8rem; margin-bottom:0.5rem;"><em>${item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)} ${item.type}</em></p>
                <p style="font-size:0.8rem; color:var(--text-muted);">${item.description}</p>
            `;
            appInstance.showTooltip(e, html);
        });
        
        slot.addEventListener('mousemove', (e) => {
            appInstance.moveTooltip(e);
        });
        
        slot.addEventListener('mouseleave', () => {
            appInstance.hideTooltip();
        });

        // Modals
        slot.addEventListener('click', () => {
            appInstance.hideTooltip();
            appInstance.openModal(`
                <div style="text-align:center; margin-bottom:2rem;">
                    <div style="font-size:5rem; text-shadow:0 0 20px ${getRarityColor(item.rarity)};">${item.emoji || getIconForType(item.type)}</div>
                    <h2 style="font-size:3rem; color:${getRarityColor(item.rarity)}; margin-top:1rem;">${item.name}</h2>
                    <h4 style="color:var(--text-muted); text-transform:uppercase; letter-spacing:2px;">${item.rarity} ${item.type}</h4>
                </div>
                
                <div style="background:rgba(0,0,0,0.4); padding:2rem; border-radius:var(--radius-md); border:1px solid ${getRarityColor(item.rarity)}; border-left:4px solid ${getRarityColor(item.rarity)};">
                    <h3 class="text-gold" style="margin-bottom:1rem;">Effects & Stats</h3>
                    <p style="font-size:1.2rem; margin-bottom:2rem; font-style:italic;">"${item.description}"</p>
                    
                    <h3 class="text-gold" style="margin-bottom:1rem;">Lore & History</h3>
                    <p style="color:var(--text-muted); line-height:1.6;">${item.history}</p>
                </div>
            `);
        });
    });

    // Add Item Modal Logic
    const addBtn = container.querySelector('#add-item-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const emojis = ['🗡️','🛡️','🧪','🔮','📜','💍','💎','🏹','🪓','🦯','🎸','🎺','🍺','🗝️','👑','🎭'];
            let selectedEmoji = emojis[0];

            appInstance.openModal(`
                <h2 class="text-gold" style="margin-bottom:1.5rem;">Create New Item</h2>
                <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                    <div style="flex:1; min-width:200px;">
                        <label>Item Name</label>
                        <input type="text" id="new-item-name" placeholder="E.g. Ring of Shadows" />
                        
                        <label>Rarity</label>
                        <select id="new-item-rarity">
                            <option value="common">Common</option>
                            <option value="uncommon">Uncommon</option>
                            <option value="rare">Rare</option>
                            <option value="epic">Epic</option>
                            <option value="legendary">Legendary</option>
                        </select>
                        
                        <label>Type</label>
                        <select id="new-item-type">
                            <option value="weapon">Weapon</option>
                            <option value="armor">Armor</option>
                            <option value="consumable">Consumable</option>
                            <option value="misc">Miscellaneous</option>
                        </select>
                    </div>
                    <div style="flex:1; min-width:200px;">
                        <label>Select Cover Emoji</label>
                        <div class="emoji-grid" id="emoji-picker">
                            ${emojis.map(e => `<button type="button" class="emoji-btn ${e === selectedEmoji ? 'selected' : ''}" data-emoji="${e}">${e}</button>`).join('')}
                        </div>
                        
                        <label>Description / Effects</label>
                        <textarea id="new-item-desc" rows="2" placeholder="What does it do?"></textarea>
                    </div>
                </div>
                
                <label>Lore & History</label>
                <textarea id="new-item-history" rows="3" placeholder="Where did it come from?"></textarea>
                
                <div style="text-align:right; margin-top:1rem;">
                    <button id="save-item-btn" class="btn" style="background:var(--accent-gold); color:var(--bg-dark);">Save Item</button>
                </div>
            `, (modalBody) => {
                // Initialize emoji picker interaction
                const pickerBtns = modalBody.querySelectorAll('.emoji-btn');
                pickerBtns.forEach(pbtn => {
                    pbtn.addEventListener('click', (e) => {
                        pickerBtns.forEach(b => b.classList.remove('selected'));
                        e.currentTarget.classList.add('selected');
                        selectedEmoji = e.currentTarget.dataset.emoji;
                    });
                });

                // Handle Save
                modalBody.querySelector('#save-item-btn').addEventListener('click', () => {
                    const name = modalBody.querySelector('#new-item-name').value || 'Unknown Item';
                    const rarity = modalBody.querySelector('#new-item-rarity').value;
                    const type = modalBody.querySelector('#new-item-type').value;
                    const desc = modalBody.querySelector('#new-item-desc').value;
                    const hist = modalBody.querySelector('#new-item-history').value;
                    
                    const newItem = {
                        id: 'i' + (Date.now()),
                        name: name,
                        rarity: rarity,
                        type: type,
                        description: desc,
                        history: hist,
                        emoji: selectedEmoji
                    };
                    
                    data.items.unshift(newItem); // Add to top of list
                    appInstance.closeModal();
                    appInstance.renderView('items'); // Remount view
                });
            });
        });
    }

    return container;
}
