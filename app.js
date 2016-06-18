var attr_max = 330,
    level_min = 5,
    level_max = 275;

var int = parseInt;
var skills = {
  alchemy:              function(a) { return (int(a.coordination) + int(a.focus)) / 3; },
  arcane_lore:          function(a) { return int(a.focus) / 3; },
  armor_tinkering:      function(a) { return (int(a.endurance) + int(a.focus)) / 2; },
  assess_creature:      function(a) { return 0; },
  assess_person:        function(a) { return 0; },
  cooking:              function(a) { return (int(a.coordination) + int(a.focus)) / 3; },
  creature_enchantment: function(a) { return (int(a.focus) + int(a.self)) / 4; },
  deception:            function(a) { return 0; },
  dual_wield:           function(a) { return (int(a.strength) + int(a.coordination)) / 3; },
  dirty_fighting:       function(a) { return (int(a.strength) + int(a.coordination)) / 3; },
  finesse_weapons:      function(a) { return (int(a.coordination) + int(a.quickness)) / 3; },
  fletching:            function(a) { return (int(a.coordination) + int(a.focus)) / 3; },
  healing:              function(a) { return (int(a.focus) + int(a.coordination)) / 3; },
  heavy_weapons:        function(a) { return (int(a.strength) + int(a.coordination)) / 3; },
  item_enchantment:     function(a) { return (int(a.focus) + int(a.self)) / 4; },
  item_tinkering:       function(a) { return (int(a.focus) + int(a.coordination)) / 2; },
  jump:                 function(a) { return (int(a.strength) + int(a.coordination)) / 2; },
  leadership:           function(a) { return 0; },
  life_magic:           function(a) { return (int(a.focus) + int(a.self)) / 4; },
  light_weapons:        function(a) { return (int(a.strength) + int(a.coordination)) / 3; },
  lockpick:             function(a) { return (int(a.coordination) + int(a.focus)) / 3; },
  loyalty:              function(a) { return 0; },
  magic_defense:        function(a) { return (int(a.focus) + int(a.self)) / 7; },
  magic_item_tinkering: function(a) { return int(a.focus); },
  mana_conversion:      function(a) { return (int(a.focus) + int(a.self)) / 6; },
  melee_defense:        function(a) { return (int(a.coordination) + int(a.quickness)) / 3; },
  missile_defense:      function(a) { return (int(a.coordination) + int(a.quickness)) / 5; },
  missile_weapons:      function(a) { return int(a.coordination) / 2; },
  recklessness:         function(a) { return (int(a.strength) + int(a.quickness)) / 3; },
  run:                  function(a) { return int(a.quickness); },
  salvaging:            function(a) { return 0; },
  shield:               function(a) { return (int(a.strength) + int(a.coordination)) / 2; },
  sneak_attack:         function(a) { return (int(a.coordination) + int(a.quickness)) / 3; },
  summoning:            function(a) { return (int(a.endurance) + int(a.self)) / 3; },
  two_handed_combat:    function(a) { return (int(a.strength) + int(a.coordination)) / 3; },
  void_magic:           function(a) { return (int(a.focus) + int(a.self)) / 4; },
  war_magic:            function(a) { return (int(a.focus) + int(a.self)) / 4; },
  weapon_tinkering:     function(a) { return (int(a.strength) + int(a.focus)) / 2; }
}

var cost = {
  alchemy: { trained: 6, specialized: 6 },
  arcane_lore: { trained: 0, specialized: 2 },
  armor_tinkering: { trained: 4, specialized: -1 },
  assess_creature: { trained: 0, specialized: 2 },
  assess_person: { trained: 2, specialized: 2 },
  cooking: { trained: 4, specialized: 4 },
  creature_enchantment: { trained: 8, specialized: 8 },
  deception: { trained: 4, specialized: 2 },
  dual_wield: { trained: 2, specialized: 2 },
  dirty_fighting: { trained: 2, specialized: 2 },
  finesse_weapons: { trained: 4, specialized: 4 },
  fletching: { trained: 4, specialized: 4 },
  healing: { trained: 6, specialized: 4 },
  heavy_weapons: { trained: 6, specialized: 6 },
  item_enchantment: { trained: 8, specialized: 8 },
  item_tinkering: { trained: 2, specialized: -1 },
  jump: { trained: 0, specialized: 4 },
  leadership: { trained: 4, specialized: 2 },
  life_magic: { trained: 12, specialized: 8 },
  light_weapons: { trained: 4, specialized: 4 },
  lockpick: { trained: 6, specialized: 4 },
  loyalty: { trained: 0, specialized: 2 },
  magic_defense: { trained: 0, specialized: 12 },
  magic_item_tinkering: { trained: 4, specialized: -1 },
  mana_conversion: { trained: 6, specialized: 6 },
  melee_defense: { trained: 10, specialized: 10 },
  missile_defense: { trained: 6, specialized: 4 },
  missile_weapons: { trained: 6, specialized: 6 },
  recklessness: { trained: 4, specialized: 2 },
  run: { trained: 0, specialized: 4 },
  salvaging: { trained: 0, specialized: -1 },
  shield: { trained: 2, specialized: 2 },
  sneak_attack: { trained: 4, specialized: 2 },
  summoning: { trained: 8, specialized: 4 },
  two_handed_combat: { trained: 8, specialized: 8 },
  void_magic: { trained: 16, specialized: 12 },
  war_magic: { trained: 16, specialized: 12 },
  weapon_tinkering: { trained: 4, specialized: -1 }
};

var untrained_state = {
  alchemy: 'unusable',
  arcane_lore: 'trained',
  armor_tinkering: 'untrained',
  assess_creature: 'unusable',
  assess_person: 'unusable',
  cooking: 'unusable',
  creature_enchantment: 'unusable',
  deception: 'unusable',
  dual_wield: 'unusable',
  dirty_fighting: 'unusable',
  finesse_weapons: 'untrained',
  fletching: 'unusable',
  healing: 'unusable',
  heavy_weapons: 'untrained',
  item_enchantment: 'unusable',
  item_tinkering: 'untrained',
  jump: 'trained',
  leadership: 'untrained',
  life_magic: 'unusable',
  light_weapons: 'untrained',
  lockpick: 'unusable',
  loyalty: 'trained',
  magic_defense: 'trained',
  magic_item_tinkering: 'untrained',
  mana_conversion: 'unusable',
  melee_defense: 'untrained',
  missile_defense: 'untrained',
  missile_weapons: 'untrained',
  recklessness: 'unusable',
  run: 'trained',
  salvaging: 'trained',
  shield: 'untrained',
  sneak_attack: 'unusable',
  summoning: 'untrained',
  two_handed_combat: 'untrained',
  void_magic: 'unusable',
  war_magic: 'unusable',
  weapon_tinkering: 'untrained'
};

var credits_by_level = {
  1: 0,
	2: 1,
	3: 2,
	4: 3,
	5: 4,
	6: 5,
	7: 6,
	8: 7,
	9: 8,
	10: 9,
	12:	10,
	14:	11,
	16:	12,
	18:	13,
	20:	14,
	23:	15,
	26:	16,
	29:	17,
	32:	18,
	35:	19,
	40:	20,
	45:	21,
	50:	22,
	55:	23,
	60:	24,
	65:	25,
	70:	26,
	75:	27,
	80:	28,
	85:	29,
	90:	30,
	95:	31,
	100: 32,
	105: 33,
	110: 34,
	115: 35,
	120: 36,
	125: 37,
	130: 38,
	140: 39,
	150: 40,
	160: 41,
	180: 42,
	200: 43,
	225: 44,
	250: 45,
	275: 46
};

var closest = function(array, value) {
  var idx = 0;
  for (var i = array.length - 1; i >= 0; i--) {
    if(Math.abs(value - array[i]) < Math.abs(value - array[idx])){
      idx = i;
    }
  }

  return array[idx];
};

var skill_credits = function(level) {
  return credits_by_level[closest(_.keys(credits_by_level), level)];
};

var vm = new Vue({
  el: '#app',
  data: {
    name: 'Kolthar',
    level: 275,
    max: true, // All XP spent in stats/skills
    extra_skill_credits: {
      railrea: false,
      oswald: false,
      lum1: false,
      lum2: false
    },
    attributes: {
      strength: {
        key: 'strength',
        base: 100
      },
      endurance: {
        key: 'endurance',
        base: 100
      },
      coordination: {
        key: 'coordination',
        base: 100
      },
      quickness: {
        key: 'quickness',
        base: 10
      },
      focus: {
        key: 'focus',
        base: 10
      },
      self: {
        key: 'self',
        base: 10
      }
    },
    skills: {
      alchemy: {
        key: 'alchemy',
        name: 'Alchemy',
        training: 'unusable'
      },
	    arcane_lore: {
        key: 'arcane_lore',
        name: 'Arcane Lore',
        training: 'trained'
      },
	    armor_tinkering: {
        key: 'armor_tinkering',
        name: 'Armor Tinkering',
        training: 'untrained'
      },
	    assess_creature: {
        key: 'assess_creature',
        name: 'Assess Creature',
        training: 'unusable'
      },
	    assess_person: {
        key: 'assess_person',
        name: 'Assess Person',
        training: 'unusable'
      },
	    cooking: {
        key: 'cooking',
        name: 'Cooking',
        training: 'unusable'
      },
	    creature_enchantment: {
        key: 'creature_enchantment',
        name: 'Creature Enchantment',
        training: 'unusable'
      },
	    deception: {
        key: 'deception',
        name: 'Deception',
        training: 'unusable'
      },
	    dual_wield: {
        key: 'dual_wield',
        name: 'Dual Wield',
        training: 'unusable'
      },
	    dirty_fighting: {
        key: 'dirty_fighting',
        name: 'Dirty Fighting',
        training: 'unusable'
      },
	    finesse_weapons: {
        key: 'finesse_weapons',
        name: 'Finesse Weapons',
        training: 'untrained'
      },
	    fletching: {
        key: 'fletching',
        name: 'Fletching',
        training: 'unusable'
      },
	    healing: {
        key: 'healing',
        name: 'Healing',
        training: 'unusable'
      },
	    heavy_weapons: {
        key: 'heavy_weapons',
        name: 'Heavy Weapons',
        training: 'untrained'
      },
	    item_enchantment: {
        key: 'item_enchantment',
        name: 'Item Enchantment',
        training: 'unusable'
      },
	    item_tinkering: {
        key: 'item_tinkering',
        name: 'Item Tinkering',
        training: 'untrained'
      },
	    jump: {
        key: 'jump',
        name: 'Jump',
        training: 'trained'
      },
	    leadership: {
        key: 'leadership',
        name: 'Leadership',
        training: 'untrained'
      },
	    life_magic: {
        key: 'life_magic',
        name: 'Life Magic',
        training: 'unusable'
      },
	    light_weapons: {
        key: 'light_weapons',
        name: 'Light Weapons',
        training: 'untrained'
      },
	    lockpick: {
        key: 'lockpick',
        name: 'Lockpick',
        training: 'unusable'
      },
	    loyalty: {
        key: 'loyalty',
        name: 'Loyalty',
        training: 'trained'
      },
	    magic_defense: {
        key: 'magic_defense',
        name: 'Magic Defense',
        training: 'trained'
      },
	    magic_item_tinkering: {
        key: 'magic_item_tinkering',
        name: 'Magic Item Tinkering',
        training: 'untrained'
      },
	    mana_conversion: {
        key: 'mana_conversion',
        name: 'Alchemy',
        training: 'unusable'
      },
	    melee_defense: {
        key: 'melee_defense',
        name: 'Melee Defense',
        training: 'untrained'
      },
	    missile_defense: {
        key: 'missile_defense',
        name: 'Missile Defense',
        training: 'untrained'
      },
	    missile_weapons: {
        key: 'missile_weapons',
        name: 'Missile Weapons',
        training: 'untrained'
      },
	    recklessness: {
        key: 'recklessness',
        name: 'Recklessness',
        training: 'unusable'
      },
	    run: {
        key: 'run',
        name: 'Run',
        training: 'trained'
      },
	    salvaging: {
        key: 'salvaging',
        name: 'Salvaging',
        training: 'trained'
      },
	    shield: {
        key: 'shield',
        name: 'Shield',
        training: 'untrained'
      },
	    sneak_attack: {
        key: 'sneak_attack',
        name: 'Sneak Attack',
        training: 'unusable'
      },
	    summoning: {
        key: 'summoning',
        name: 'Summoning',
        training: 'untrained'
      },
	    two_handed_combat: {
        key: 'two_handed_combat',
        name: 'Two Handed Combat',
        training: 'untrained'
      },
	    void_magic: {
        key: 'void_magic',
        name: 'Void Magic',
        training: 'unusable'
      },
	    war_magic: {
        key: 'war_magic',
        name: 'War Magic',
        training: 'unusable'
      },
	    weapon_tinkering: {
        key: 'weapon_tinkering',
        name: 'Weapon Tinkering',
        training: 'untrained'
      }
    }
  },
  computed: {
    strength: function() {
      return int(this.attributes.strength.base) +
        (this.max ? 190 : 0);
    },
    endurance: function() {
      return int(this.attributes.endurance.base) +
        (this.max ? 190 : 0);
    },
    coordination: function() {
      return int(this.attributes.coordination.base) +
        (this.max ? 190 : 0);
    },
    quickness: function() {
      return int(this.attributes.quickness.base) +
        (this.max ? 190 : 0);
    },
    focus: function() {
      return int(this.attributes.focus.base) +
        (this.max ? 190 : 0);
    },
    self: function() {
      return int(this.attributes.self.base) +
        (this.max ? 190 : 0);
    },
    health: function () {
      return int(this.endurance / 2);
    },
    stamina: function () {
      return int(this.endurance);
    },
    mana: function () {
      return int(this.self);
    },
    attr_sum: function () {
      return int(this.attributes.strength.base) +
          int(this.attributes.endurance.base) +
          int(this.attributes.coordination.base) +
          int(this.attributes.quickness.base) +
          int(this.attributes.focus.base) +
          int(this.attributes.self.base);
    },
    alchemy:              function(a) { return int((int(this.coordination) + int(this.focus)) / 3); },
    arcane_lore:          function(a) { return int(int(this.focus) / 3); },
    armor_tinkering:      function(a) { return int((int(this.endurance) + int(this.focus)) / 2); },
    assess_creature:      function(a) { return int(0); },
    assess_person:        function(a) { return int(0); },
    cooking:              function(a) { return int((int(this.coordination) + int(this.focus)) / 3); },
    creature_enchantment: function(a) { return int((int(this.focus) + int(this.self)) / 4); },
    deception:            function(a) { return int(0); },
    dual_wield:           function(a) { return int((int(this.strength) + int(this.coordination)) / 3); },
    dirty_fighting:       function(a) { return int((int(this.strength) + int(this.coordination)) / 3); },
    finesse_weapons:      function(a) { return int((int(this.coordination) + int(this.quickness)) / 3); },
    fletching:            function(a) { return int((int(this.coordination) + int(this.focus)) / 3); },
    healing:              function(a) { return int((int(this.focus) + int(this.coordination)) / 3); },
    heavy_weapons:        function(a) { return int((int(this.strength) + int(this.coordination)) / 3); },
    item_enchantment:     function(a) { return int((int(this.focus) + int(this.self)) / 4); },
    item_tinkering:       function(a) { return int((int(this.focus) + int(this.coordination)) / 2); },
    jump:                 function(a) { return int((int(this.strength) + int(this.coordination)) / 2); },
    leadership:           function(a) { return int(0); },
    life_magic:           function(a) { return int((int(this.focus) + int(this.self)) / 4); },
    light_weapons:        function(a) { return int((int(this.strength) + int(this.coordination)) / 3); },
    lockpick:             function(a) { return int((int(this.coordination) + int(this.focus)) / 3); },
    loyalty:              function(a) { return int(0); },
    magic_defense:        function(a) { return int((int(this.focus) + int(this.self)) / 7); },
    magic_item_tinkering: function(a) { return int(int(this.focus)); },
    mana_conversion:      function(a) { return int((int(this.focus) + int(this.self)) / 6); },
    melee_defense:        function(a) { return int((int(this.coordination) + int(this.quickness)) / 3); },
    missile_defense:      function(a) { return int((int(this.coordination) + int(this.quickness)) / 5); },
    missile_weapons:      function(a) { return int(int(this.coordination) / 2); },
    recklessness:         function(a) { return int((int(this.strength) + int(this.quickness)) / 3); },
    run:                  function(a) { return int(int(this.quickness)); },
    salvaging:            function(a) { return int(0); },
    shield:               function(a) { return int((int(this.strength) + int(this.coordination)) / 2); },
    sneak_attack:         function(a) { return int((int(this.coordination) + int(this.quickness)) / 3); },
    summoning:            function(a) { return int((int(this.endurance) + int(this.self)) / 3); },
    two_handed_combat:    function(a) { return int((int(this.strength) + int(this.coordination)) / 3); },
    void_magic:           function(a) { return int((int(this.focus) + int(this.self)) / 4); },
    war_magic:            function(a) { return int((int(this.focus) + int(this.self)) / 4); },
    weapon_tinkering:     function(a) { return int((int(this.strength) + int(this.focus)) / 2); },
    used_skill_credits: function () {
      return 0 + _.reduce(_.map(_.filter(this.skills, function(s) { return s.training == "trained"; }), function(s) { return cost[s.key][s.training]; }), function(s,v) { return s + v; }, 0) +
             _.reduce(_.map(_.filter(this.skills, function(s) { return s.training == "specialized"; }), function(s) { return cost[s.key][s.training]; }), function(s,v) { return s + v; }, 0);
    },
    remaining_skill_credits: function() {
      return this.total_skill_credits - this.used_skill_credits;
    },
    total_skill_credits: function () {
      return 52 + skill_credits(this.level) +
        (this.extra_skill_credits.oswald ? 1 : 0) +
        (this.extra_skill_credits.railrea ? 1 : 0) +
        (this.extra_skill_credits.lum1 ? 1 : 0) +
        (this.extra_skill_credits.lum2 ? 1 : 0);
    },
    specialized_skills: function () {
      var sk = _.filter(this.skills, function(skill) {
        return skill.training == "specialized";
      });

      for (var i = 0; i < sk.length; i++) {
        sk[i].value = this[sk[i].key];
        sk[i].enabled = false;
      }

      return sk;
    },
    trained_skills: function () {
      var sk = _.filter(this.skills, function(skill) {
        return skill.training == "trained";
      });

      for (var i = 0; i < sk.length; i++) {
        sk[i].value = this[sk[i].key];
        sk[i].enabled = (cost[sk[i].key].specialized <= this.remaining_skill_credits) ? "enabled" : "disabled";
      }

      return sk;
    },
    untrained_skills: function () {
      var sk = _.filter(this.skills, function(skill) {
        return skill.training == "untrained";
      });

      for (var i = 0; i < sk.length; i++) {
        sk[i].value = this[sk[i].key];
        sk[i].enabled = (cost[sk[i].key].trained <= this.remaining_skill_credits) ? "enabled" : "disabled";
      }

      return sk;
    },
    unusable_skills: function () {
      var sk = _.filter(this.skills, function(skill) {
        return skill.training == "unusable";
      });

      for (var i = 0; i < sk.length; i++) {
        sk[i].value = this[sk[i].key];
        sk[i].enabled = (cost[sk[i].key].trained <= this.remaining_skill_credits) ? "enabled" : "disabled";
      }

      return sk;
    }
  },
  methods: {
    attr_change: function(event) {
      var attribute = event.target.id;

      if (this.attr_sum > attr_max) {
        this.dampen_other_attrs(attribute);
      }
    },
    dampen_other_attrs: function(attribute) {
      var to_dampen = _.filter(this.attributes, function(a) { return a.key != attribute && a.base > 10; });
      var vals = _.map(to_dampen, function(a) { return a.base; })
      var extra = this.attr_sum - attr_max;

      while (extra > 0) {
        for (j = 0; j < vals.length; j++) {
          if (vals[j] <= 10) continue;
          --vals[j];
          extra -= 1;
        }
      }

      for (var k = 0; k < to_dampen.length; k++) {
        this.attributes[to_dampen[k].key].base = vals[k];
      }
    },
    training_increase: function(event) {
      console.log('training_increase()');

      var key = event.target.attributes[0].value;
      var training = this.skills[key].training;

      if (training == 'untrained' || training == 'unusable') {
        if (this.remaining_skill_credits >= cost[key].trained) {
          this.skills[key].training = 'trained';
        } else {
          console.log("Not enough available skill credits.");
        }
      } else if (training == 'trained') {
        if (this.remaining_skill_credits >= cost[key].specialized) {
          this.skills[key].training = 'specialized';
        } else {
          console.log("Not enough available skill credits.");
        }
      }
    },
    training_decrease: function(event) {
      console.log('training_decrease()');

      var key = event.target.attributes[0].value;
      var training = this.skills[key].training;

      if (training == 'specialized') {
        this.skills[key].training = 'trained';
      } else if (training == 'trained') {
        this.skills[key].training = untrained_state[key];
      }
    },
    reset_skills: function(event) {
      console.log("reset_skills()");

      _.each(this.skills, function(s) {
        s.training = untrained_state[s.key];
      })
    }
  }
});
