window.renderItems = function(data, appInstance) {
    const container = document.createElement('div');
    container.className = 'items-container fade-in';

    const CATEGORIES = ['Weapons', 'Armour', 'Scrolls', 'Jewelry', 'Artifacts', 'Consumables', 'Misc'];

    container.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">Items &amp; Loot</h2>
            <div style="display:flex; align-items:center; gap:0.6rem; flex-shrink:0;">
                <input type="text" id="item-search" placeholder="Search items..." style="padding:0.5rem; border:1px solid var(--panel-border); color:var(--text-main); border-radius:var(--radius-sm); margin:0; width:150px; background:var(--panel-bg);" />
                <label style="display:flex; align-items:center; gap:0.3rem; margin:0; cursor:pointer; white-space:nowrap;" title="Show only In Pocket Dimension">
                    <input type="checkbox" id="item-pocket-filter" style="margin:0; width:auto;" /> 🌀
                </label>
                <select id="item-rarity-filter" style="padding:0.5rem; border:1px solid var(--panel-border); color:var(--text-main); border-radius:var(--radius-sm); margin:0; background:var(--panel-bg);">
                    <option value="">All Rarities</option>
                    <option value="common">Common</option>
                    <option value="uncommon">Uncommon</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                </select>
                <button id="add-item-btn" class="btn" style="white-space:nowrap; margin:0; color:#fff; border-color:#fff;">+ Add Item</button>
            </div>
        </div>

        <div id="items-by-category" style="margin-top:1.5rem;"></div>
    `;

    function getIconForType(type) {
        if (!type) return null;
        const t = type.toLowerCase();
        if (t === 'weapons' || t === 'weapon') return '🗡️';
        if (t === 'consumables' || t === 'consumable') return '🧪';
        if (t === 'armour' || t === 'armor') return '🛡️';
        if (t === 'scrolls' || t === 'scroll') return '📜';
        if (t === 'jewelry') return '💍';
        if (t === 'artifacts' || t === 'artifact') return '🔮';
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

    function getItemCategory(item) {
        const cat = (item.category || item.type || 'misc').toLowerCase();
        if (cat === 'weapon' || cat === 'weapons') return 'Weapons';
        if (cat === 'armor' || cat === 'armour') return 'Armour';
        if (cat === 'scroll' || cat === 'scrolls') return 'Scrolls';
        if (cat === 'jewelry') return 'Jewelry';
        if (cat === 'artifact' || cat === 'artifacts') return 'Artifacts';
        if (cat === 'consumable' || cat === 'consumables') return 'Consumables';
        return 'Misc';
    }

    function renderItemSlot(item) {
        const imgSrc = item.image || null;
        const fallback = item.emoji || getIconForType(item.type);
        const portalBadge = item.inPocketDimension
            ? `<div style="position:absolute; top:4px; left:4px; font-size:1rem; line-height:1; filter:drop-shadow(0 0 4px var(--accent-magic));" title="In Pocket Dimension">🌀</div>`
            : '';
        const countBadge = (item.count && item.count > 1)
            ? `<div style="position:absolute; bottom:4px; right:4px; background:var(--panel-bg); color:var(--text-main); font-size:0.7rem; font-weight:bold; padding:2px 4px; border-radius:4px; border:1px solid var(--panel-border);">x${item.count}</div>`
            : '';
        return `
            <div class="item-slot ${item.rarity}" data-id="${item.id}"
                 data-name="${(item.name || '').toLowerCase()}"
                 data-rarity="${item.rarity || ''}"
                 style="cursor:pointer; display:flex; flex-direction:column; align-items:center; padding:0.75rem 0.5rem; gap:0.4rem; position:relative;">
                ${portalBadge}
                ${countBadge}
                ${imgSrc
                    ? `<img src="${imgSrc}" alt="${item.name}" style="width:60px; height:60px; object-fit:cover; border-radius:8px; border:1px solid var(--panel-border);">`
                    : `<div style="font-size:2.5rem;">${fallback}</div>`
                }
                <div style="font-size:0.75rem; text-align:center; color:var(--text-main); line-height:1.2; word-break:break-word;">${item.name}</div>
            </div>
        `;
    }

    function renderCategories(itemList) {
        const catContainer = container.querySelector('#items-by-category');
        catContainer.innerHTML = '';
        CATEGORIES.forEach(cat => {
            const items = itemList.filter(item => getItemCategory(item) === cat);
            if (items.length === 0) return;
            const section = document.createElement('div');
            section.style.marginBottom = '2.5rem';
            section.innerHTML = `
                <h3 class="bg-header" style="border-bottom:2px solid #fff; padding-bottom:0.4rem; margin-bottom:1rem;">${cat}</h3>
                <div class="item-grid" style="grid-template-columns:repeat(auto-fill, minmax(110px, 1fr)); gap:1.5rem;">
                    ${items.map(item => renderItemSlot(item)).join('')}
                </div>
            `;
            catContainer.appendChild(section);
        });
        bindSlots();
    }

    function applyFilters() {
        const searchVal = container.querySelector('#item-search').value.toLowerCase();
        const rarityVal = container.querySelector('#item-rarity-filter').value.toLowerCase();
        const pocketOnly = container.querySelector('#item-pocket-filter').checked;
        const filtered = data.items.filter(item => {
            const matchSearch = !searchVal || (item.name || '').toLowerCase().includes(searchVal);
            const matchRarity = !rarityVal || (item.rarity || '') === rarityVal;
            const matchPocket = !pocketOnly || item.inPocketDimension;
            return matchSearch && matchRarity && matchPocket;
        });
        renderCategories(filtered);
    }

    container.querySelector('#item-search').addEventListener('input', applyFilters);
    container.querySelector('#item-rarity-filter').addEventListener('change', applyFilters);
    container.querySelector('#item-pocket-filter').addEventListener('change', applyFilters);

    function bindSlots() {
        container.querySelectorAll('.item-slot').forEach(slot => {
            const item = data.items.find(i => i.id === slot.dataset.id);
            if (!item) return;

            slot.addEventListener('mouseenter', (e) => {
                appInstance.showTooltip(e, `
                    <h4 style="color:${getRarityColor(item.rarity)}; margin-bottom:0.5rem;">${item.name}</h4>
                    <p style="font-size:0.8rem; margin-bottom:0.5rem;"><em>${item.rarity ? item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1) : ''} ${getItemCategory(item)}</em></p>
                    <p style="font-size:0.8rem; color:var(--text-muted);">${item.description || ''}</p>
                    ${item.inPocketDimension ? '<p style="font-size:0.75rem; color:var(--accent-magic); margin-top:0.4rem;">🌀 In Pocket Dimension</p>' : ''}
                `);
            });
            slot.addEventListener('mousemove', (e) => appInstance.moveTooltip(e));
            slot.addEventListener('mouseleave', () => appInstance.hideTooltip());

            slot.addEventListener('click', () => {
                appInstance.hideTooltip();
                const imgSrc = item.image || null;
                const fallback = item.emoji || getIconForType(item.type);
                appInstance.openModal(`
                    <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-bottom:1rem;">
                        <button id="edit-item-modal-btn" class="btn" style="background:var(--panel-border);">✏️ Edit Item</button>
                        <button id="delete-item-modal-btn" class="btn" style="background:var(--danger);">🗑️ Delete</button>
                    </div>
                    <div style="text-align:center; margin-bottom:2rem;">
                        ${imgSrc
                            ? `<img src="${imgSrc}" alt="${item.name}" style="max-width:100%; max-height:250px; object-fit:contain; border-radius:12px; border:3px solid ${getRarityColor(item.rarity)}; box-shadow:0 10px 20px rgba(0,0,0,0.5);">`
                            : `<div style="font-size:5rem; text-shadow:0 0 20px ${getRarityColor(item.rarity)};">${fallback}</div>`
                        }
                        <h2 style="font-size:3rem; color:${getRarityColor(item.rarity)}; margin-top:1rem;">${item.name}</h2>
                        <h4 style="color:var(--text-muted); text-transform:uppercase; letter-spacing:2px;">${item.rarity || ''} ${getItemCategory(item)}</h4>
                        ${item.inPocketDimension ? `<div style="color:var(--accent-magic); margin-top:0.5rem; font-size:0.9rem;">🌀 In Pocket Dimension</div>` : ''}
                    </div>
                    <div style="background:var(--bg-dark); padding:2rem; border-radius:var(--radius-md); border:1px solid ${getRarityColor(item.rarity)}; border-left:4px solid ${getRarityColor(item.rarity)};">
                        <h3 class="text-gold" style="margin-bottom:1rem;">Effects &amp; Stats</h3>
                        <p style="font-size:1.1rem; margin-bottom:2rem; font-style:italic; line-height:1.7;">"${item.description || 'No description.'}"</p>
                        <h3 class="text-gold" style="margin-bottom:1rem;">Lore &amp; History</h3>
                        <p style="color:var(--text-muted); line-height:1.6;">${item.history || 'No history recorded.'}</p>
                    </div>
                `, (modalBody) => {
                    modalBody.querySelector('#edit-item-modal-btn').addEventListener('click', () => openEditItemModal(item));
                    modalBody.querySelector('#delete-item-modal-btn').addEventListener('click', () => {
                        if (confirm(`Delete "${item.name}"?`)) {
                            const idx = data.items.findIndex(i => i.id === item.id);
                            if (idx !== -1) data.items.splice(idx, 1);
                            DB.delete('items', item.id);
                            appInstance.closeModal();
                            applyFilters();
                        }
                    });
                });
            });
        });
    }

    function openEditItemModal(item) {
        const EMOJIS = ['🗡️','🛡️','🧪','🔮','📜','💍','💎','🏹','🪓','🦯','🗝️','👑','🎭','⚗️','🧲','🪬','🗺️','🔱','🪄','🎁'];
        let selectedEmoji = item.emoji || EMOJIS[0];
        appInstance.openModal(`
            <h2 class="text-gold" style="margin-bottom:1.5rem;">Edit Item: ${item.name}</h2>
            <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                <div style="flex:1; min-width:200px;">
                    <label>Item Name</label>
                    <input type="text" id="ei-name" value="${(item.name || '').replace(/"/g, '&quot;')}" />
                    <label>Rarity</label>
                    <select id="ei-rarity">
                        <option value="common" ${item.rarity === 'common' ? 'selected' : ''}>Common</option>
                        <option value="uncommon" ${item.rarity === 'uncommon' ? 'selected' : ''}>Uncommon</option>
                        <option value="rare" ${item.rarity === 'rare' ? 'selected' : ''}>Rare</option>
                        <option value="epic" ${item.rarity === 'epic' ? 'selected' : ''}>Epic</option>
                        <option value="legendary" ${item.rarity === 'legendary' ? 'selected' : ''}>Legendary</option>
                    </select>
                    <label>Category</label>
                    <select id="ei-category">
                        <option value="Weapons" ${getItemCategory(item) === 'Weapons' ? 'selected' : ''}>Weapons</option>
                        <option value="Armour" ${getItemCategory(item) === 'Armour' ? 'selected' : ''}>Armour</option>
                        <option value="Scrolls" ${getItemCategory(item) === 'Scrolls' ? 'selected' : ''}>Scrolls</option>
                        <option value="Jewelry" ${getItemCategory(item) === 'Jewelry' ? 'selected' : ''}>Jewelry</option>
                        <option value="Artifacts" ${getItemCategory(item) === 'Artifacts' ? 'selected' : ''}>Artifacts</option>
                        <option value="Consumables" ${getItemCategory(item) === 'Consumables' ? 'selected' : ''}>Consumables</option>
                        <option value="Misc" ${getItemCategory(item) === 'Misc' ? 'selected' : ''}>Misc</option>
                    </select>
                    <div style="display:flex; gap:1rem; align-items:center; margin-top:0.5rem;">
                        <div style="flex:1;">
                            <label>Count</label>
                            <input type="number" id="ei-count" value="${item.count || 1}" min="1" style="margin-bottom:0;" />
                        </div>
                        <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; flex:2;">
                            <input type="checkbox" id="ei-pocket" ${item.inPocketDimension ? 'checked' : ''} style="width:auto; margin:0;" />
                            <span>🌀 In Pocket Dimension</span>
                        </label>
                    </div>
                </div>
                <div style="flex:1; min-width:200px;">
                    <label>Item Image URL</label>
                    <input type="text" id="ei-image" placeholder="https://... (leave blank for emoji)" value="${item.image || ''}" />
                    <label>Fallback Emoji</label>
                    <div class="emoji-grid" id="ei-emoji-picker" style="margin-bottom:0.5rem;">
                        ${EMOJIS.map(em => `<button type="button" class="emoji-btn ${selectedEmoji === em ? 'selected' : ''}" data-emoji="${em}">${em}</button>`).join('')}
                    </div>
                    <label>Description / Effects</label>
                    <textarea id="ei-desc" rows="2">${item.description || ''}</textarea>
                </div>
            </div>
            <label>Lore &amp; History</label>
            <textarea id="ei-history" rows="3">${item.history || ''}</textarea>
            <div style="text-align:right; margin-top:1rem;">
                <button id="save-ei-btn" class="btn" style="background:var(--accent-gold); color:var(--bg-dark);">Save Changes</button>
            </div>
        `, (editBody) => {
            editBody.querySelectorAll('.emoji-btn').forEach(pbtn => {
                pbtn.addEventListener('click', (ev) => {
                    editBody.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
                    ev.currentTarget.classList.add('selected');
                    selectedEmoji = ev.currentTarget.dataset.emoji;
                });
            });
            editBody.querySelector('#save-ei-btn').addEventListener('click', () => {
                item.name = editBody.querySelector('#ei-name').value;
                item.rarity = editBody.querySelector('#ei-rarity').value;
                item.category = editBody.querySelector('#ei-category').value;
                item.type = item.category.toLowerCase();
                item.description = editBody.querySelector('#ei-desc').value;
                item.history = editBody.querySelector('#ei-history').value;
                item.image = editBody.querySelector('#ei-image').value.trim() || null;
                item.emoji = selectedEmoji;
                item.count = parseInt(editBody.querySelector('#ei-count').value, 10) || 1;
                item.inPocketDimension = editBody.querySelector('#ei-pocket').checked;
                
                DB.save('items', item);
                
                appInstance.closeModal();
                applyFilters();
            });
        });
    }

    // Initial render
    renderCategories(data.items);

    // Add Item
    container.querySelector('#add-item-btn').addEventListener('click', () => {
        const EMOJIS = ['🗡️','🛡️','🧪','🔮','📜','💍','💎','🏹','🪓','🦯','🗝️','👑','🎭','⚗️','🧲','🪬','🗺️','🔱','🪄','🎁'];
        let selectedEmoji = EMOJIS[0];
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
                    <label>Category</label>
                    <select id="new-item-category">
                        <option value="Weapons">Weapons</option>
                        <option value="Armour">Armour</option>
                        <option value="Scrolls">Scrolls</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Artifacts">Artifacts</option>
                        <option value="Consumables">Consumables</option>
                        <option value="Misc">Misc</option>
                    </select>
                    <div style="display:flex; gap:1rem; align-items:center; margin-top:0.5rem;">
                        <div style="flex:1;">
                            <label>Count</label>
                            <input type="number" id="new-item-count" value="1" min="1" style="margin-bottom:0;" />
                        </div>
                        <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; flex:2;">
                            <input type="checkbox" id="new-item-pocket" style="width:auto; margin:0;" />
                            <span>🌀 In Pocket Dimension</span>
                        </label>
                    </div>
                </div>
                <div style="flex:1; min-width:200px;">
                    <label>Item Image URL</label>
                    <input type="text" id="new-item-image" placeholder="https://... (leave blank for emoji)" />
                    <label>Fallback Emoji</label>
                    <div class="emoji-grid" id="emoji-picker">
                        ${EMOJIS.map(e => `<button type="button" class="emoji-btn ${e === selectedEmoji ? 'selected' : ''}" data-emoji="${e}">${e}</button>`).join('')}
                    </div>
                    <label>Description / Effects</label>
                    <textarea id="new-item-desc" rows="2" placeholder="What does it do?"></textarea>
                </div>
            </div>
            <label>Lore &amp; History</label>
            <textarea id="new-item-history" rows="3" placeholder="Where did it come from?"></textarea>
            <div style="text-align:right; margin-top:1rem;">
                <button id="save-item-btn" class="btn" style="background:var(--accent-gold); color:var(--bg-dark);">Save Item</button>
            </div>
        `, (modalBody) => {
            modalBody.querySelectorAll('.emoji-btn').forEach(pbtn => {
                pbtn.addEventListener('click', (e) => {
                    modalBody.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
                    e.currentTarget.classList.add('selected');
                    selectedEmoji = e.currentTarget.dataset.emoji;
                });
            });
            modalBody.querySelector('#save-item-btn').addEventListener('click', () => {
                const name = modalBody.querySelector('#new-item-name').value || 'Unknown Item';
                const rarity = modalBody.querySelector('#new-item-rarity').value;
                const category = modalBody.querySelector('#new-item-category').value;
                const imageUrl = modalBody.querySelector('#new-item-image').value.trim();
                const newItem = {
                    id: 'i' + Date.now(),
                    name, rarity,
                    category, type: category.toLowerCase(),
                    description: modalBody.querySelector('#new-item-desc').value,
                    history: modalBody.querySelector('#new-item-history').value,
                    image: imageUrl || null,
                    emoji: selectedEmoji,
                    count: parseInt(modalBody.querySelector('#new-item-count').value, 10) || 1,
                    inPocketDimension: modalBody.querySelector('#new-item-pocket').checked
                };
                
                data.items.unshift(newItem);
                DB.save('items', newItem);
                
                appInstance.closeModal();
                applyFilters();
            });
        });
    });

    return container;
}
