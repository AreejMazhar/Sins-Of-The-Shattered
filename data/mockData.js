window.campaignData = {
    quests: [
        {
            id: 'q9',
            title: "Investigate Astri's Note and Relationships",
            status: 'completed',
            isMainQuest: false,
            level: 1,
            description: "Astri died leaving behind a cryptic apologetic note, love letters, and a poem. Suspicions of affairs with Emily, Louis, or a 'S'. Investigate her connections.",
            objectives: ['Find Astri\'s true motive', 'Investigate Emily and Erendor'],
            tasks: [
                {text: 'Find love letters', completed: true},
                {text: 'Read tavern staff book', completed: true},
                {text: 'Discover Emily\'s grave connection', completed: true}
            ],
            rewards: 'Information on Flaming Fist inner workings',
            location: "Baldur's Gate",
            npc: 'Astri'
        },
        {
            id: 'q10',
            title: 'Aid Lily and Find Her Mother',
            status: 'completed',
            isMainQuest: false,
            level: 1,
            description: 'Lily is a traumatized orphaned child holding a fey creature. Find her mother and get Lily to safety.',
            objectives: ['Find Lily\'s mother', 'Escort Lily to safety'],
            tasks: [
                {text: 'Find mother\'s body', completed: true},
                {text: 'Give mother\'s necklace to Lily', completed: true},
                {text: 'Use Speak with Dead on mother', completed: true},
                {text: 'Leave Lily with Azuriel', completed: true}
            ],
            rewards: 'Goodwill',
            location: "Wyrm's Rock",
            npc: 'Lily'
        },
        {
            id: 'q11',
            title: 'Investigate the Shard of Loyalty',
            status: 'active',
            isMainQuest: true,
            level: 3,
            description: 'The Shard of Loyalty was revealed after defeating Titania. It is connected to the party\'s life force. The Duke warned of its history and danger.',
            objectives: ['Protect the shard', 'Research its origins'],
            tasks: [
                {text: 'Defend against hooded figure theft', completed: true},
                {text: 'Find an infernal/primordial expert in Waterdeep', completed: false}
            ],
            rewards: 'Unknown artifact power',
            location: 'Waterdeep (Target)',
            npc: 'Duke of Baldur\'s Gate'
        },
        {
            id: 'q12',
            title: 'Travel via Trollclaws Route',
            status: 'completed',
            isMainQuest: true,
            level: 3,
            description: 'Take the fast, dangerous path through the Field of the Dead and Trollclaws to reach Erendor Norris in Waterdeep for contract translation.',
            objectives: ['Survive the Trollclaws', 'Reach Waterdeep'],
            tasks: [
                {text: 'Navigate the Field of the Dead', completed: true},
                {text: 'Fight off undead and trolls', completed: true},
                {text: 'Enter Waterdeep portal', completed: true}
            ],
            rewards: 'Safe passage to Waterdeep',
            location: 'Trollclaws',
            npc: 'Boris'
        },
        {
            id: 'q1',
            title: 'The Shadow over Oakhaven',
            status: 'active',
            isMainQuest: true,
            level: 3,
            description: 'Investigate the disappearance of the local blacksmith.',
            objectives: ['Find the blacksmith', 'Defeat the goblin raiding party'],
            tasks: [
                {text: 'Speak to Mayor Thorne', completed: true},
                {text: 'Find footprint trails', completed: false},
                {text: 'Locate Gob-hole cave', completed: false}
            ],
            rewards: '500 gp, 1x Minor Health Potion',
            location: 'Oakhaven Forest',
            npc: 'Mayor Thorne'
        },
        {
            id: 'q3',
            title: 'Investigate the Staining and Great Stag Cult',
            status: 'active',
            isMainQuest: true,
            level: 4,
            description: 'Found research on "Blood of the Ancient" (stag blood), phases of Staining; 400+ facilities; connection to Watch; Vale exposed but resisted.',
            objectives: ['Investigate the Staining', 'Find the 400+ facilities', 'Contact Sophia'],
            tasks: [
                {text: 'Investigate basement lab', completed: true},
                {text: 'Rescue trapped tiefling children', completed: true},
                {text: 'Find Sophia and warn her', completed: false},
                {text: 'Track Great Stag Cult origins', completed: false}
            ],
            rewards: 'Unknown - The fate of Faerûn',
            location: "Baldur's Gate, South Ward",
            npc: 'Violet'
        },
        {
            id: 'q4',
            title: 'Find Dominique the Translator',
            status: 'active',
            isMainQuest: true,
            level: 4,
            description: 'Dominique is a missing translator hiding in the southern sewage canal. They know Ancient Infernal and may hold key information about the grimoire and the Revolution.',
            objectives: ['Find Dominique in the sewers', 'Learn what they know'],
            tasks: [
                {text: 'Get lead from Violet', completed: true},
                {text: 'Navigate southern sewage canal', completed: false},
                {text: 'Meet Dominique', completed: false}
            ],
            rewards: 'Information on the Revolution Army and Staining',
            location: "Southern Sewage Canal, Baldur's Gate",
            npc: 'Violet'
        },
        {
            id: 'q5',
            title: 'Liberate Children from Underground Facility',
            status: 'completed',
            isMainQuest: false,
            level: 3,
            description: 'Agreed to assist Violet the tracer in eliminating 4 individuals assaulting children in exchange for leads on Dominique the translator.',
            objectives: ['Find underground facility', 'Rescue children'],
            tasks: [
                {text: "Locate facility behind tavern bartender's house", completed: true},
                {text: 'Defeat 4 masked cultists', completed: true},
                {text: 'Rescue 5 scribing children', completed: true},
                {text: 'Store children safely in pocket dimension', completed: true}
            ],
            rewards: "Lead on Dominique's location, mana-contact card from Violet",
            location: "Underground facility, Baldur's Gate",
            npc: 'Violet'
        },
        {
            id: 'q6',
            title: 'Uncover the People of the Antler',
            status: 'active',
            isMainQuest: true,
            level: 4,
            description: 'Visions in the cursed door revealed masked cultists with antler symbols matching the heirlooms and grimoire. A burning village, a stag skull leader, and a shadowy figure who hid the grimoire. The cult must be found.',
            objectives: ['Follow the antler symbol trail', 'Find the burning village', 'Identify the stag skull leader'],
            tasks: [
                {text: 'Witness the visions', completed: true},
                {text: 'Research antler cult connections', completed: false},
                {text: 'Find the shard mentioned by Duke', completed: false},
                {text: 'Track down the cloaked drow mentor from Alenia\'s vision', completed: false}
            ],
            rewards: 'Truth about Durnehviir\'s and Alenia\'s origins',
            location: 'Unknown — linked to Waterdeep and Baldur\'s Gate',
            npc: 'Duke of Baldur\'s Gate'
        },
        {
            id: 'q7',
            title: 'Warn Sophia',
            status: 'active',
            isMainQuest: false,
            level: 3,
            description: 'Sophia survived the black substance longer than expected. She and a swordsman companion need to be located and warned about the Staining and the cult.',
            objectives: ['Find Sophia', 'Warn her about the Staining'],
            tasks: [
                {text: 'Revive Sophia from abomination form', completed: true},
                {text: 'Locate Sophia and swordsman after separation', completed: false},
                {text: 'Brief her on the cult\'s operations', completed: false}
            ],
            rewards: 'An ally with unique knowledge of the Staining\'s effects',
            location: 'Unknown — last seen near the village',
            npc: 'Malachi'
        },
        {
            id: 'q8',
            title: 'Infiltrate the Revolution Army',
            status: 'active',
            isMainQuest: false,
            level: 3,
            description: 'The Revolution Army is led by Veldrin at the Sorcerer\'s Guild. They plan to infiltrate the government using Veldrin and his brother. Their weapons include overthrowing the City Watch.',
            objectives: ['Find Veldrin at the Sorcerer\'s Guild', 'Assess the threat level'],
            tasks: [
                {text: 'Visit Moose\'s Gauntlet and overhear plans', completed: true},
                {text: 'Locate the Sorcerer\'s Guild past End Shift Haven', completed: false},
                {text: 'Confront Veldrin about his background', completed: false}
            ],
            rewards: 'Information on Nyloth\'s brother and revolutionary activity',
            location: "Sorcerer's Guild, Baldur's Gate",
            npc: 'Veldrin'
        }
    ],

    characters: [
        {
            id: 'c1',
            name: 'Alenia Blackfrost',
            class: 'Sorcerer',
            race: 'Elf (Drow)',
            level: 4,
            hp: 32,
            ac: 15,
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alenia',
            appearance: `Hair: White. Eyes: White (blind). Skin: Deep purple. Build: Skinny and tall. Height: 6'2".

Clothing: A crown made of black ice. A blindfold over her eyes. Crop-top with robes acting as a cape with ice detailing. Pants with another robe layered with ice designs. Boots made of black ice. A staff made of bones decorated with bells and pearls.`,
            personality: `On the outside: Rarely speaks, but when she does it's stern and to the point. Very observant and judgemental. Prefers solitude and areas with little to no people. Looks cold and talks like she hates the other person.

On the inside: Actually cares deeply about people but keeps feelings to herself. Loves animals, nature, flowers, and clouds. Wants to be seen by someone who would understand her and not kill her. Forgets things unintentionally, even very big details.`,
            quirks: `Can "see" without eyes through sound, wind, warmth and cold — even the slightest changes around her create vivid pictures in her mind. Loves watching insects do their things. Husky voice, as if she's a chronic smoker. Goes for walks at night. Swears by ice cold showers.`,
            bio: `An ancient Drow elf sorcerer who has been living alone since she was young. She had a "Master" not long ago who helped her hone her powers, but she cannot recall their name. Her first 100 years are a blur to her. Her parents are hated by the locals of the Drow caverns for unknown reasons — some say they tried to take over, some say they were evil sorcerers, but nothing is confirmed.

Because of her parents, she faces constant bounties and hunts. She lost her eyes when one such hunt nearly succeeded — a blinding spell so powerful it destroyed her retinas. She has since mastered all her other senses to compensate, forming vivid mental images of everything around her.

She had only one true friend ever, who died during a bounty hunt trying to protect her. She has tried countless times to reach out to her own Drow people, but even those who didn't want her dead shunned her.

Outside the Drow caverns, she traveled across Faerûn. In Waterdeep, she curiously sought to "see" fish through her senses, and at a tavern met Durnehviir, who took her to find the most exquisite fish the city had to offer.

After nearly 100 years of hiding, she was caught — not by her own people but by Wyrm's Rock Prison guards. She was accused of attempting to assassinate the Drow cavern ruler. She is now imprisoned at Wyrm's Rock and in the chaos of the fey invasion, was freed alongside the others.

In prison, she encountered Durnehviir from Waterdeep — and Liora Ashveil, a woman from Shadowfell who claims Alenia visited her realm 20 years ago "looking for answers." Alenia has no memory of this.

In Session 10, a vision revealed Alenia's 10th birthday: the abduction of her mother by armed captors, her mother fighting back and killing many, and a Cloaked Drow Mentor who later dosed young Alenia with River Lethe water — causing her amnesia.`,
            goals: `Short-term: Get out of prison. Survive without being hunted.
Long-term: Find out who her family is. Discover who she was before she lost her memories. Learn her true age (she speculates over 200). Make more friends and make people believe she doesn't want them dead.`,
            skills: `Sharp non-visual perception. Magical object identification. Insight and people-reading at first contact. Ability to bring groups together even through her cold exterior.`,
            quotes: [
                "I don't hate you. This is just my face.",
                "I see more with my eyes closed than you ever will with yours open.",
                "They call it a curse. I call it a different kind of sight.",
                "Trust no memory, including your own.",
                "My parents' sins are not mine — but I still carry them."
            ]
        },
        {
            id: 'c2',
            name: 'Vale Corvane',
            class: 'Illusionist Wizard',
            race: 'Tiefling',
            level: 4,
            hp: 28,
            ac: 14,
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Vale',
            appearance: `Hair: Long, black, slightly unkempt. Usually tied back. Eyes: Pure white, faintly glowing in dim light. Skin: Purplish hue with black stains creeping from nails to elbows. Build: Lean rather than muscular. Horns: Curved, purplish-black. Tail: Long, curled around his leg, spiked at the end. Height: 5'10". Weight: 150 lbs.

Clothing: A long deep gray hooded cloak, patched in multiple places. A simple cloth mask worn in the city. Worn linen shirt with stitched repairs, loose sleeves to cover stained arms. A wide leather belt with spell component pouches. Gloves to hide his hands. Sturdy, worn, patched boots.

Accessories: His grimoire — bound in cracked leather with shifting diagrams on the cover. A small charm necklace from his mother, hidden under his shirt. Chalk, charcoal, parchment scraps, and small trinkets he's collected.`,
            personality: `On the outside: Speaks in a measured, monotone voice. Rarely smiles or shows emotion. Watches more than he speaks but will engage if prompted. Keeps his distance. Distrustful; assumes most people have ulterior motives. Obsessively protective of his grimoire.

On the inside: Deeply compassionate but struggles to express it — his care comes through quiet gestures: staying on watch, fixing someone's gear, covering for another. Secretly loves campfire warmth, animals, music, and the rare kindness of strangers. Lonely, but hides it. Fascinated by truth and falsehood; sees illusions as both a shield and a mirror of the world.`,
            quirks: `Tail twitches when anxious or excited — always denies it. Fiddles with parchment scraps, sketching patterns when lost in thought. Collects odd trinkets (feathers, stones, buttons) but insists they're "useless clutter." Will glare and hiss if anyone touches his grimoire. Every night traces a diagram from the grimoire in the air. Shadow motes drift from his fingertips unconsciously when deep in thought.`,
            bio: `Vale grew up in the Lower City of Baldur's Gate, marked from birth by his Tiefling heritage. His mother kept a difficult distance, worn thin by hardship. The city offered little kindness to those with horns and a tail.

He taught himself to survive by becoming invisible — through silence, shadow, and eventually illusion magic. His gift wasn't formally trained: he found an abandoned grimoire in the slums whose shifting diagrams taught him more than any academy could. The grimoire became his anchor, his teacher, his only constant.

He was imprisoned under suspicion and prejudice — framed for sorcery he didn't cast, accused simply for being a Tiefling who knew too much magic. In Wyrm's Rock he kept to himself, the grimoire hidden close.

In Session 9, visions revealed Vale's past: a shadowy figure deliberately hid the grimoire for him to find. The grimoire may be connected to the People of the Antler cult — whose symbol also appears in its pages.

His shadow-cat Nyx follows him everywhere, the only companion to whom he shows unguarded affection.`,
            goals: `Short-term: Protect the grimoire at all costs. Regain freedom and prove he can't be shackled again. Keep his secrets.
Long-term: Uncover the grimoire's origins — who wrote it, why it was abandoned, whether the antler cult connection is real. Find belonging. Learn to trust, though he'd never admit that.`,
            skills: `Master illusionist. Stealth, deception, misdirection. Deep knowledge of arcane theory from the grimoire. Exceptional observation. Nyx the shadow-cat familiar.`,
            quotes: [
                "Illusions are not lies. They're truths wearing different clothes.",
                "Silence is safer.",
                "Everyone's wearing a mask. Mine is just honest about it.",
                "Don't touch the grimoire. I won't ask twice.",
                "Trust is a luxury. I deal in certainties."
            ]
        },
        {
            id: 'c3',
            name: 'Durnehviir',
            class: 'Warlock (Pact of the Spirit Lake)',
            race: 'Tiefling',
            level: 4,
            hp: 36,
            ac: 16,
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Durnehviir',
            appearance: `Hair: Black short curls with crimson edges, stray locks framing the face. Eyes: Molten gold with vertical pupils and black sclera. Skin: Magenta-purple tone. Build: Slender but wiry from years of performance. Horns: Magenta-colored antlers with golden markings (post-Spirit Lake transformation). Tail: Fiendish. Height: 5'6". Weight: 130 lbs.

Clothing: Black velvet tunic with ruffled v-neck, crimson trousers cinched with a gold moon-and-stars belt, tucked into velvet boots. A sheer crimson shawl embroidered with golden moons and stars.

Accessories: Golden rings and earrings, black nail polish, black neckband engraved with a golden star. An antler-crested emblem heirloom always kept in pocket. A guitar — a former lover's gift.`,
            personality: `On the outside: Charming, flamboyant, and prone to sarcasm as a defense mechanism. Reckless and impulsive, especially when bored.

On the inside: Struggles with self-worth and fear of abandonment. Riddled with guilt (especially over Sylvia's death) and haunted by paranoia from visions. Mentally checks in with their Spirit patron before risky moves.`,
            quirks: `Talks to their patron mentally or mutters when frustrated. Loves pranking arrogant nobles. Uses Mage Hand to "poke" people when bored. Whispers small prayers to Eilistraee. Plucks quiet tunes on guitar when feeling down. Taps right foot or fiddles with the antler-emblem when anxious. Plays with tarot cards for comfort. Has kleptomanic tendencies with shiny objects.`,
            bio: `Durnehviir knows nothing of their origins before age six, when they woke up under the care of two seldarine drow brothers in Waterdeep: Nyloth, a stern wizard-father, and Veldrin, a charismatic rogue who taught them mischief.

By eighteen, they found work as a barkeeper at the Crawling Spider tavern and formed a performing troupe with twin travelers Serana and Sylvia. Their bond with Serana deepened into love. For a time, life was whole.

Then masked hunters attacked the tavern. Nyloth and Veldrin came to the rescue — but Sylvia lay dead on the floor. Serana's tearful eyes said: This is your fault.

Back home, Nyloth finally revealed: Durnehviir had been delivered to his door by a cloaked stranger with an antler-crested emblem and the words: "Take care of the child. Give this emblem to them when the time comes."

Holding the emblem alone, Durnehviir saw visions: a burning village, masked killers. They set out seeking answers, were ambushed again at a strange lake, and chose to drown rather than be captured.

The Spirit of the Lake revived them. It is bound to their soul as patron — their body transformed with magenta antlers and golden eyes. They were eventually imprisoned in Wyrm's Rock, crossing paths with the others.

Session 9 trance-visions revealed masked cultists with antler symbols matching Durnehviir's own emblem, and a stag skull leader who may be connected to their bloodline.`,
            goals: `Short-term: Survive. Befriend their Spirit patron.
Long-term: Uncover the truth about the masked attackers and the burning village. Discover the antler-emblem's significance. Understand why the Spirit of the Lake chose them.`,
            skills: `Performance and deception. Mage Hand tricks and sleight of hand. Eldritch Blast combat. Patron-granted visions. Waterdeep underground knowledge from their entertainer days.`,
            quotes: [
                "I'm not reckless. I'm enthusiastically spontaneous.",
                "The Spirit and I have an understanding. Mostly. Usually.",
                "I grew up in a city that looks down on people like me. I learned to look them in the eye anyway.",
                "I can't help it — my hands just gravitate toward shinies. It's basically a medical condition.",
                "They took everything from me once. Not again."
            ]
        },
        {
            id: 'c4',
            name: 'Liora Ashveil',
            class: 'Sorcerer (Wild Magic — Graviturgy)',
            race: 'Shadar-kai',
            level: 4,
            hp: 34,
            ac: 15,
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Liora',
            appearance: `Hair: Silvery-white with a dark streak falling over one side. Eyes: Pale, ghostly gray. Skin: Smooth ash-gray with an icy undertone. Build: Tall and lean. Height: 6'0".

Clothing: A long black coat with feathered pauldrons. Form-fitted top with a deep neckline and asymmetrical sleeves (one black, one blood red). Red leather shorts with black accents, straps, and a belt with pouches and a dagger. Black leggings tucked into dark combat boots. A dark choker with a crimson gem.

Accessories: Niblet, her magical raven companion.`,
            personality: `On the outside: Calm and composed — gives the impression nothing can rattle her. Strong and capable, projecting confidence and resilience.

On the inside: Haunted by grief from her mother's death and early Shadowfell life. Curious about her magic, deeply wary of the chaos Wild Graviturgy can unleash. Secretly enjoys small joys — moonlight, quiet rivers, watching Niblet play. Wonders if she will ever truly belong anywhere.`,
            quirks: `Talks to Niblet as if it's a confidant — joking, arguing, giving it orders. Observes people silently for patterns before interacting. Fidgets with magical or shiny trinkets when thinking. Walks with Niblet under moonlight to meditate. Occasionally hums or whistles softly while working.`,
            bio: `Liora Ashveil was born in the Shadowfell, raised by a loving mother Lumira and an abusive, absent father Malrek — a sworn commander of the Raven Queen who regarded her as nothing.

At age six, she sought her father out as soldiers marched through her village. He struck her to the ground: "You are nothing — an imbecile born of weakness."

At seven, her mother died of illness. Grief consumed her, but the hatred for Malrek kept her alive. During this fragile time, Alenia Blackfrost secretly left supplies for the orphaned girl and crafted a magical raven, Niblet, to help her survive — though Liora never knew who her benefactor was.

She wandered the Shadowfell alone until, collapsed by a riverbank, she dreamed of a silver light. The goddess Sehanine Moonbow bestowed her Wild Magic. Niblet never left her side after that.

Sixteen years later in Baldur's Gate, she encountered her father once more. A surge of uncontrolled Wild Graviturgy killed him. Guards closed in, and she was sent to Wyrm's Rock Prison — where she met Alenia, the woman who had unknowingly saved her life years ago, though Alenia has no memory of it.`,
            goals: `Short-term: Gain control over her Wild Graviturgy surge. Survive the wider world.
Long-term: Understand the full capabilities of her magic. Discover her magical legacy. Find someone who truly sees her. Build a life where she can explore her power freely.`,
            skills: `Wild Magic Graviturgy Sorcery. Emotional resilience from survival. Niblet communication. Quiet observation of people and patterns.`,
            quotes: [
                "Chaos is not my enemy. It is my inheritance.",
                "Niblet understands me better than most people do. This says more about people than about Niblet.",
                "I have walked the Shadowfell alone. I do not fear the dark.",
                "Control is not about suppression. It is about knowing when to let go.",
                "My mother said: even in the darkest place, you can choose your light."
            ]
        }
    ],

    discoveries: [
        { id: 'd1', date: 'Session 1', text: 'Discovered a secret cavern beneath Wyrm\'s Rock Prison, opened by the "frosted lions" riddle.' },
        { id: 'd2', date: 'Session 1', text: 'Albert the prisoner\'s cell remains charmed shut — insight reveals his "forgotten" status. He may not be what he seems.' },
        { id: 'd3', date: 'Session 2', text: 'Nightwing was defeated as the boss inside the castle section above Wyrm\'s Rock.' },
        { id: 'd4', date: 'Session 4', text: 'Titania — the fae boss — was cursed with a devil sigil and showed a frightening vision of betrayal before dissipating.' },
        { id: 'd5', date: 'Session 5', text: 'Arundon identified the Ancient Infernal contract. A decoder in Waterdeep may be able to translate it.' },
        { id: 'd6', date: 'Session 7', text: 'Belial the incubus was found in a crypt kissing corpses. Astri\'s grave revealed a journal refusing marriage to Valtor, confessing love to Emily.' },
        { id: 'd7', date: 'Session 8', text: 'Jeffrey the village chief was hoarding food in an underground base, starving villagers. Josephine is a sentient, possibly lying painting.' },
        { id: 'd8', date: 'Session 9', text: 'Trance-visions revealed masked cultists with antler symbols matching both Durnehviir\'s emblem and Vale\'s grimoire. A shadowy figure deliberately hid the grimoire for Vale to find.' },
        { id: 'd9', date: 'Session 10', text: 'Three hags (Night, Green, Sea) were concealed as village women. They offered shards for boons but were rejected and defeated. Net rewards: Worm\'s Eye Amulet, Memory Lantern, grimoire page, memory vial.' },
        { id: 'd10', date: 'Session 10', text: 'Alenia\'s vision: her mother was abducted on Alenia\'s 10th birthday. A cloaked Drow Mentor later dosed young Alenia with River Lethe water — causing her amnesia.' },
        { id: 'd11', date: 'Session 13', text: 'The Crawling Spider is now "Impenders" — seized after the masked hunter raid. Inside: a golden crescent key, bloodied mask, Mama J\'s note, Serana\'s notebook with song lyrics.' },
        { id: 'd12', date: 'Session 14', text: 'Nyloth\'s tower contains memory-puzzles voiced by Nyloth and Veldrin. A bypass device creates illusory ID papers.' },
        { id: 'd13', date: 'Session 15', text: 'Hidden attic compartment in the tower has devil cat contracts offering resurrection of Nyloth\'s daughter Amelia — unsigned. Piano lullaby revealed hidden text.' },
        { id: 'd14', date: 'Session 17', text: 'The Staining is a 40-year-old ritual involving Blood of the Ancient stag, turning tiefling victims into scribes for the Great Stag entity. 400+ facilities exist across Faerûn.' },
        { id: 'd15', date: 'Session 17', text: 'Vale was exposed to the Staining\'s black substance but resisted. Sophia also survived. They must be warned — and her location found.' }
    ],

    history: window.sessionHistoryData || [],

    items: [
        { id: 'i1', name: 'Sword of Light', rarity: 'rare', description: 'Glows dimly in the presence of undead.', type: 'weapon', history: 'Forged in the sun-drenched forges of Elsweyr.', emoji: '🗡️' },
        { id: 'i2', name: 'Potion of Healing', rarity: 'common', description: 'Restores 2d4+2 HP.', type: 'consumable', history: 'Brewed by the local alchemist.', emoji: '🧪' },
        { id: 'i3', name: 'Dragon Scale Shield', rarity: 'epic', description: 'Grants resistance to fire damage.', type: 'armor', history: 'Crafted from the scales of the fallen red dragon, Ignis.', emoji: '🛡️' },
        { id: 'i4', name: 'Regal Greataxe', rarity: 'uncommon', description: 'A heavy greataxe with a diamond-encrusted handle.', type: 'weapon', history: 'Looted from a fey creature during the Wyrm\'s Rock invasion.', emoji: '🪓' },
        { id: 'i5', name: 'Magic Orb', rarity: 'rare', description: 'A humming orb of unknown origin from the fey incursion.', type: 'arcane focus', history: 'Recovered from a fey construct after the prison battle.', emoji: '🔮' },
        { id: 'i6', name: 'Mana-Contact Card', rarity: 'uncommon', description: 'A card infused with magical energy that allows contact with its creator.', type: 'consumable', history: 'Given by Violet the tracer after rescuing the children.', emoji: '📇' },
        { id: 'i7', name: 'Sleight of Hand Bracelet', rarity: 'uncommon', description: '+3 to Sleight of Hand checks.', type: 'jewelry', history: "Found in Veldren's room in Nyloth's tower.", emoji: '💍' },
        { id: 'i8', name: "Vale's Grimoire", rarity: 'legendary', description: 'Shifting diagrams on the cover. Seems to teach magic of its own accord. Possibly linked to the antler cult.', type: 'arcane tome', history: "Found abandoned in Baldur's Gate Lower City. Origin unknown.", emoji: '📖' },
        { id: 'i9', name: "Worm's Eye Amulet", rarity: 'rare', description: 'An amulet recovered from the hag coven\'s defeat. Its properties are yet unknown.', type: 'jewelry', history: 'Taken from the three hags in Session 10.', emoji: '🪬' },
        { id: 'i10', name: 'Memory Lantern', rarity: 'rare', description: 'A lantern that can display or absorb memories. Given by the hags as a reward for defeating them.', type: 'arcane item', history: 'Reward from defeating the hag coven.', emoji: '🏮' },
        { id: 'i11', name: 'Grimoire Page', rarity: 'uncommon', description: 'A single page from a mysterious tome, featuring unfamiliar script.', type: 'arcane item', history: "Recovered from the hags — matches Vale's grimoire style.", emoji: '📜' },
        { id: 'i12', name: 'Golden Crescent Key', rarity: 'uncommon', description: 'A golden crescent-shaped key. Opens the hidden hatch in the Crawling Spider.', type: 'key', history: 'Found in the ruins of the Crawling Spider (Impenders) in Session 13.', emoji: '🗝️' }
    ],

    npcs: [
        // ============ FRIENDLY ============
        {
            id: 'n1', name: 'Albert', role: 'Suspicious Prisoner', location: "Wyrm's Rock Prison",
            trait: 'Suspiciously friendly — reenacted the party\'s capture and helped from inside',
            secret: 'Cell is charmed shut. Insight reveals a "forgotten" status. He may be far more than a simple prisoner.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Albert'
        },
        {
            id: 'n2', name: 'Valtor', role: 'Flaming Fist Gauntlet', location: 'Lower City, Baldur\'s Gate',
            trait: 'Stern, grief-stricken. Released the party himself during the fey attack. Grieves Astri.',
            secret: 'Astri\'s grave journal revealed she refused Valtor\'s marriage proposal, confessing love to Emily instead.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Valtor'
        },
        {
            id: 'n3', name: 'Lily', role: 'Rescued Child', location: "Wyrm's Rock Prison (rescued)",
            trait: 'Traumatized but brave. Was grappling a fey construct when found, mourning her slain mother.',
            secret: 'Was using a spell against the fey before the party arrived. Hidden potential.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lily'
        },
        {
            id: 'n4', name: 'Boris Borealis', role: 'Druid Ally (White Stag)', location: "Wyrm's Rock / Baldur's Gate",
            trait: 'Wild and nature-aligned. Shifts from white stag form. Vouched for the party.',
            secret: 'Declined joining the party, citing duty. Has knowledge of Faerûn travel routes and maps. Healed Emily from an ink overdose in Session 5.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Boris'
        },
        {
            id: 'n5', name: 'Sir Kassadin', role: 'Flaming Fist Leader', location: "Wyrm's Rock / Crossing",
            trait: 'Elegant, organized fighter. Led the group against the fey.',
            secret: 'Pursued fey toward the crossing with Glinda and Boris after the prison battle.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Kassadin'
        },
        {
            id: 'n6', name: 'Glinda', role: 'Fighter Ally', location: "Baldur's Gate",
            trait: 'Stays in Baldur\'s Gate. Offered help and a warm farewell to the party.',
            secret: 'Fought fey dancers alongside the party during the prison escape.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Glinda'
        },
        {
            id: 'n7', name: 'Emily', role: 'Poet / Astri\'s Love', location: "Baldur's Gate",
            trait: 'Poetry writer. Was protected by Azuriel. Overdosed on ink after learning of Astri\'s death.',
            secret: 'Astri\'s grave journal named Emily as her true love, not Valtor. Emily\'s name appears on the grave beside Astri — though the inside was empty.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emily'
        },
        {
            id: 'n8', name: 'Azuriel', role: 'Flaming Fist Tiefling', location: "Baldur's Gate",
            trait: 'Has a nip piercing. Guards Emily and Lily. Informed Emily about Astri.',
            secret: 'Looking after Liliana (Lily). Part of the Flaming Fist but shows genuine care for civilians.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Azuriel'
        },
        {
            id: 'n9', name: 'Erendor', role: 'Flaming Fist Lieutenant', location: "Baldur's Gate",
            trait: 'Third rank. Acts as mentor. Keeps a journal of students.',
            secret: 'Knows about a critical shard. Cares deeply for Emily\'s wellbeing.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Erendor'
        },
        {
            id: 'n10', name: 'Minerva', role: 'Non-Binary Investigator / Fighter', location: 'Traveling with party',
            trait: 'They/them. Carries a void dagger and wields black flames. Joined the party\'s quest.',
            secret: 'Was investigating a concubine in connection with the death of a noble father. Swam across a river to assist. Strong fighter who rescued others in combat.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Minerva'
        },
        {
            id: 'n11', name: 'Arundon', role: 'Poet Master / Scholar', location: "Baldur's Gate / Waterdeep (contact)",
            trait: 'Identified the Ancient Infernal contract from the party\'s findings.',
            secret: 'Has a decoder contact in Waterdeep who can translate the contract.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Arundon'
        },
        {
            id: 'n12', name: 'Malachi (Swordsman)', role: 'Survivor / Bounty Hunter', location: 'Underground dungeon / Village',
            trait: 'Suspicious but eventually cooperative. Had Jeffrey and Sophia with him.',
            secret: 'Was sent unconscious in a cave after killing ghouls in response to the village bounty. Revealed the hags destroyed his village.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Malachi'
        },
        {
            id: 'n13', name: 'Sophia', role: "Jeffrey's Daughter / Staining Survivor", location: 'Unknown — last seen near village',
            trait: 'White hair, red eyes. Succumbed to and was revived from an abomination form.',
            secret: 'Survived exposure to the black staining substance longer than expected. Must be found and warned. Her immunity may be key to understanding the Staining.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sophia'
        },
        {
            id: 'n14', name: 'Rovina', role: 'Thieves\' Guild Vampire Scout', location: 'Dark Ward, Waterdeep',
            trait: 'Calculating, survival-focused. Planning to flee the city due to the new Watch.',
            secret: 'Led the party through monster-infested sewage tunnels. Has knowledge of Waterdeep smuggling routes. Knows about Dominique\'s possible location.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Rovina'
        },
        {
            id: 'n15', name: 'Monerva', role: 'Vampire Patrol Leader', location: 'Waterdeep Dark Ward',
            trait: 'Sold the party citizen passes for 300 gold. Knows Veldrin from childhood.',
            secret: 'Directed the party to the sewers guild for further passage.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Monerva'
        },
        {
            id: 'n16', name: 'Mama J', role: 'Crawling Spider Figure', location: 'Crawling Spider (now Impenders)',
            trait: 'Left a note holding items for the party. Her room was intact with fabulous paintings.',
            secret: 'Note expressed hope that "Tachiko" is safe — an unknown figure. Packed away her paintings and furniture in a pocket dimension.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=MamaJ'
        },
        {
            id: 'n17', name: 'Nyloth', role: 'Adoptive Father / Wizard', location: "Waterdeep (tower) — left the city",
            trait: 'Stern, overprotective father figure to Durnehviir. Renowned wizard.',
            secret: 'Hid Durnehviir\'s origins for years. Has an unsigned devil cat resurrection contract for his daughter Amelia. His tower is full of memory-puzzles and traps.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nyloth'
        },
        {
            id: 'n18', name: 'Violet', role: 'Tracer', location: "Baldur's Gate, Tavern",
            trait: 'Hooded, calculating. Constantly sharpening a dagger. Locates missing people for a living.',
            secret: 'Gave the party a mana-contact card. Knows where Dominique hides in the sewer. Organized the midnight raid on the cultist facility.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Violet'
        },
        {
            id: 'n19', name: 'Thea', role: 'Sorcerer', location: "Tymora's Blessing Tavern, South Ward",
            trait: 'Informative, curious. Has knowledge of the grimoire aura and its transformative properties.',
            secret: 'Discussed Dominique\'s disappearance — they were described as a prankster who\'s been missing two years. Expert in Ancient Infernal.',
            attitude: 'Friendly',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Thea'
        },

        // ============ NEUTRAL ============
        {
            id: 'n20', name: 'Gem Lady', role: 'Cryptic Observer', location: 'Multiple taverns',
            trait: 'Stares at a gem across taverns. Offers help if the party is "playing with fate."',
            secret: 'Hints at knowing Dominique. May have prophetic or divine knowledge.',
            attitude: 'Neutral',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=GemLady'
        },
        {
            id: 'n21', name: 'Serana', role: 'Surviving Twin Performer', location: 'Unknown — left the city',
            trait: 'Grief-stricken. Blamed Durnehviir for Sylvia\'s death with her eyes alone.',
            secret: 'Left Baldur\'s Gate without a word. Her notebook with song lyrics and a sketch was found in the ruins of the Crawling Spider.',
            attitude: 'Neutral',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Serana'
        },
        {
            id: 'n22', name: 'Lilia', role: 'Revolution Recruit', location: "Second Tavern, Baldur's Gate",
            trait: 'Eager, new recruit. Has a butterfly companion.',
            secret: 'Recruitment ends in 10 days. She knows Veldrin personally through the army.',
            attitude: 'Neutral',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lilia'
        },
        {
            id: 'n23', name: 'Jeffrey', role: 'Village Chief', location: 'Village near Waterdeep',
            trait: 'Traumatized, sunken eyes. Was hoarding food while villagers starved.',
            secret: 'Had a secret underground base with food suppliers. Daughter Sophia turned into an abomination and had to be revived. May cooperate now.',
            attitude: 'Neutral',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jeffrey'
        },
        {
            id: 'n24', name: 'Belial', role: 'Incubus-like Entity', location: 'Crypt near river',
            trait: 'Winged, dark-haired, wears a loincloth. Was found kissing corpses. Seductive.',
            secret: 'Minerva was indifferent to his seductive abilities. His motives in the crypt are unknown.',
            attitude: 'Neutral',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Belial'
        },
        {
            id: 'n25', name: 'Josephine', role: 'Sentient Painting', location: "Abandoned manor / Pocket Dimension",
            trait: 'An evasive woman in a moving portrait by Sir Saint George. Changes from white to black dress.',
            secret: 'Appears to lie. Requested to be released from the painting. May be imprisoned intentionally.',
            attitude: 'Neutral',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Josephine'
        },
        {
            id: 'n26', name: 'Dunder Dunder', role: 'Familiar Cat', location: 'With Durnehviir',
            trait: 'A Siamese cat with black eyes, released from a marble.',
            secret: 'Clings to Durnehviir exclusively. Origin and purpose unknown.',
            attitude: 'Neutral',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=DunderDunder'
        },
        {
            id: 'n27', name: 'Duke of Baldur\'s Gate', role: 'Leader of Baldur\'s Gate (Will\'s Father)', location: "Baldur's Gate",
            trait: 'Elder Raven Guard. Delivered a public speech ordering increased surveillance.',
            secret: 'Knows about the shards — key objects tied to the overarching mystery. Ambrose stood behind him during the speech.',
            attitude: 'Neutral',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Duke'
        },
        {
            id: 'n28', name: 'Simon', role: 'Mentioned Figure', location: 'Unknown',
            trait: 'Name cried out by the dying tiefling child in the Staining facility.',
            secret: 'His connection to the Staining and the tiefling children is completely unknown.',
            attitude: 'Neutral',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Simon'
        },

        // ============ HOSTILE ============
        {
            id: 'n29', name: 'Veldrin (Veldren)', role: 'Revolution Leader / Nyloth\'s Brother', location: "Sorcerer's Guild, Baldur's Gate",
            trait: 'Charismatic, dangerous. Leads an uprising against the City Watch.',
            secret: 'He is Nyloth\'s brother — someone Durnehviir knows as family. Is simultaneously Monerva\'s childhood figure of charity. His revolution plan involves infiltrating government. His true motive is unknown.',
            attitude: 'Hostile',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Veldrin'
        },
        {
            id: 'n30', name: 'The Masked Hunters', role: 'Unknown Pursuers', location: 'Waterdeep (Crawling Spider) / Spirit Lake',
            trait: 'Ruthless, precise. Targeted Durnehviir specifically.',
            secret: 'Know something about Durnehviir\'s true origins. Their antler symbol matches the cult in the visions. First attacked at the Crawling Spider tavern; attacked again at the spirit lake.',
            attitude: 'Hostile',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=MaskedHunters'
        },
        {
            id: 'n31', name: 'The Great Stag Cult (Masked Cultists)', role: 'Great Stag Cult Servants', location: "Underground facility, Baldur's Gate",
            trait: 'Fanatical, powerful. Oversaw 5 tranced children scribing forbidden knowledge.',
            secret: 'Part of the Staining cult using Blood of the Ancient stag. 400+ facilities across Faerûn. Two sisters were slain instantly by the party\'s AoE spells.',
            attitude: 'Hostile',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=MaskedCult'
        },
        {
            id: 'n32', name: 'Titania (Fae Boss)', role: 'Fae Boss', location: "Wyrm's Rock (outer) — Defeated",
            trait: 'Corrupted by a devil sigil. Controlled fey creatures and corrupted beasts.',
            secret: 'Showed the party a vision of betrayal before dissipating. The sigil that cursed her may be connected to the cult.',
            attitude: 'Hostile',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Titania'
        },
        {
            id: 'n33', name: 'Nightwing', role: 'Castle Boss', location: "Wyrm's Rock — Defeated",
            trait: 'Boss-class enemy encountered and defeated in the castle area above the prison.',
            secret: 'No further details known about their allegiances or motives.',
            attitude: 'Hostile',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nightwing'
        },
        {
            id: 'n34', name: 'The Hag Coven (Aubrey, Valentine, Madeline)', role: 'Night Hag, Sea Hag, Green Hag', location: 'Village near Waterdeep — Defeated',
            trait: 'Shape-shifted into village women (Aubrey, Valentine, Madeline) to deceive the party.',
            secret: 'Created an abomination from Sophia\'s body. Offered the party shards in exchange for boons (memories, grimoire origin) but were refused and defeated.',
            attitude: 'Hostile',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=HagCoven'
        },
        {
            id: 'n35', name: 'Malrek Ashveil (Deceased)', role: "Liora's Father", location: "Deceased — Baldur's Gate",
            trait: 'Sworn commander in the Raven Queen\'s service. Cruel and absent.',
            secret: 'Struck Liora down as a child in public: "You are nothing." Was killed by Liora\'s Wild Magic surge in Baldur\'s Gate 16 years later.',
            attitude: 'Hostile',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Malrek'
        },
        {
            id: 'n36', name: 'Cloaked Drow Mentor', role: 'Sorcery Teacher (Alenia\'s Past)', location: 'Unknown',
            trait: 'White hair, unfamiliar symbol on cloak. Dosed young Alenia with River Lethe water causing her amnesia.',
            secret: 'Was present at the moment of Alenia\'s mother\'s abduction. Directly responsible for Alenia losing her memories. Motives unknown.',
            attitude: 'Hostile',
            image: 'https://api.dicebear.com/7.x/adventurer/svg?seed=CloackedDrow'
        }
    ]
};
