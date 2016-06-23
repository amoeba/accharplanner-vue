var attr_max = 330,
    level_min = 5,
    level_max = 275,
    max_spec = 70;

var int = Math.round;
var skills = {
  alchemy:              function(a) { return (int(a.coordination.base) + int(a.focus.base)) / 3; },
  arcane_lore:          function(a) { return int(a.focus.base) / 3; },
  armor_tinkering:      function(a) { return (int(a.endurance.base) + int(a.focus.base)) / 2; },
  assess_creature:      function(a) { return 0; },
  assess_person:        function(a) { return 0; },
  cooking:              function(a) { return (int(a.coordination.base) + int(a.focus.base)) / 3; },
  creature_enchantment: function(a) { return (int(a.focus.base) + int(a.self.base)) / 4; },
  deception:            function(a) { return 0; },
  dual_wield:           function(a) { return (int(a.strength.base) + int(a.coordination.base)) / 3; },
  dirty_fighting:       function(a) { return (int(a.strength.base) + int(a.coordination.base)) / 3; },
  finesse_weapons:      function(a) { return (int(a.coordination.base) + int(a.quickness.base)) / 3; },
  fletching:            function(a) { return (int(a.coordination.base) + int(a.focus.base)) / 3; },
  healing:              function(a) { return (int(a.focus.base) + int(a.coordination.base)) / 3; },
  heavy_weapons:        function(a) { return (int(a.strength.base) + int(a.coordination.base)) / 3; },
  item_enchantment:     function(a) { return (int(a.focus.base) + int(a.self.base)) / 4; },
  item_tinkering:       function(a) { return (int(a.focus.base) + int(a.coordination.base)) / 2; },
  jump:                 function(a) { return (int(a.strength.base) + int(a.coordination.base)) / 2; },
  leadership:           function(a) { return 0; },
  life_magic:           function(a) { return (int(a.focus.base) + int(a.self.base)) / 4; },
  light_weapons:        function(a) { return (int(a.strength.base) + int(a.coordination.base)) / 3; },
  lockpick:             function(a) { return (int(a.coordination.base) + int(a.focus.base)) / 3; },
  loyalty:              function(a) { return 0; },
  magic_defense:        function(a) { return (int(a.focus.base) + int(a.self.base)) / 7; },
  magic_item_tinkering: function(a) { return int(a.focus.base); },
  mana_conversion:      function(a) { return (int(a.focus.base) + int(a.self.base)) / 6; },
  melee_defense:        function(a) { return (int(a.coordination.base) + int(a.quickness.base)) / 3; },
  missile_defense:      function(a) { return (int(a.coordination.base) + int(a.quickness.base)) / 5; },
  missile_weapons:      function(a) { return int(a.coordination.base) / 2; },
  recklessness:         function(a) { return (int(a.strength.base) + int(a.quickness.base)) / 3; },
  run:                  function(a) { return int(a.quickness.base); },
  salvaging:            function(a) { return 0; },
  shield:               function(a) { return (int(a.strength.base) + int(a.coordination.base)) / 2; },
  sneak_attack:         function(a) { return (int(a.coordination.base) + int(a.quickness.base)) / 3; },
  summoning:            function(a) { return (int(a.endurance.base) + int(a.self.base)) / 3; },
  two_handed_combat:    function(a) { return (int(a.strength.base) + int(a.coordination.base)) / 3; },
  void_magic:           function(a) { return (int(a.focus.base) + int(a.self.base)) / 4; },
  war_magic:            function(a) { return (int(a.focus.base) + int(a.self.base)) / 4; },
  weapon_tinkering:     function(a) { return (int(a.strength.base) + int(a.focus.base)) / 2; }
}
var bonus = function(training) {
  var bonus = 0;

  if (training == "trained") {
    bonus = 5;
  } else if (training == "specialized") {
    bonus = 10;
  }

  return(bonus);
}

var can_spec = function(skill) {
    return cost[skill].specialized > 0;
}

var can_untrain = function(skill) {
  return cost[skill].trained > 0;
}

var skillfn = function(skill, character, fn) {
  return int(fn(character.attributes)) + bonus(character.skills[skill].training);
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
    level: 1,
    max: false, // All XP spent in stats/skills
    extra_skill_credits: {
      railrea: false,
      oswald: false,
      lum1: false,
      lum2: false
    },
    attributes: {
      strength: {
        key: 'strength',
        base: 10
      },
      endurance: {
        key: 'endurance',
        base: 10
      },
      coordination: {
        key: 'coordination',
        base: 10
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
        training: 'unusable' // default: unusable
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
        training: 'unusable' // default: unusable
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
        training: 'unusable' // default: unusable
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
        name: 'Mana Conversion',
        training: 'unusable'
      },
	    melee_defense: {
        key: 'melee_defense',
        name: 'Melee Defense',
        training: 'untrained' // default: untrained
      },
	    missile_defense: {
        key: 'missile_defense',
        name: 'Missile Defense',
        training: 'untrained'
      },
	    missile_weapons: {
        key: 'missile_weapons',
        name: 'Missile Weapons',
        training: 'untrained' // default: untrained
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
        training: 'untrained' // default: untrained
      },
	    two_handed_combat: {
        key: 'two_handed_combat',
        name: 'Two Handed Combat',
        training: 'untrained'
      },
	    void_magic: {
        key: 'void_magic',
        name: 'Void Magic',
        training: 'unusable' // default: unusable
      },
	    war_magic: {
        key: 'war_magic',
        name: 'War Magic',
        training: 'unusable' // default: unusable
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
    alchemy:              function() { return skillfn("alchemy", this, skills.alchemy); },
    arcane_lore:          function() { return skillfn("arcane_lore", this, skills.arcane_lore); },
    armor_tinkering:      function() { return skillfn("armor_tinkering", this, skills.armor_tinkering); },
    assess_creature:      function() { return skillfn("assess_creature", this, skills.assess_creature); },
    assess_person:        function() { return skillfn("assess_person", this, skills.assess_person); },
    cooking:              function() { return skillfn("cooking", this, skills.cooking); },
    creature_enchantment: function() { return skillfn("creature_enchantment", this, skills.creature_enchantment); },
    deception:            function() { return skillfn("deception", this, skills.deception); },
    dual_wield:           function() { return skillfn("dual_wield", this, skills.dual_wield); },
    dirty_fighting:       function() { return skillfn("dirty_fighting", this, skills.dirty_fighting); },
    finesse_weapons:      function() { return skillfn("finesse_weapons", this, skills.finesse_weapons); },
    fletching:            function() { return skillfn("fletching", this, skills.fletching); },
    healing:              function() { return skillfn("healing", this, skills.healing); },
    heavy_weapons:        function() { return skillfn("heavy_weapons", this, skills.heavy_weapons); },
    item_enchantment:     function() { return skillfn("item_enchantment", this, skills.item_enchantment); },
    item_tinkering:       function() { return skillfn("item_tinkering", this, skills.item_tinkering); },
    jump:                 function() { return skillfn("jump", this, skills.jump); },
    leadership:           function() { return skillfn("leadership", this, skills.leadership); },
    life_magic:           function() { return skillfn("life_magic", this, skills.life_magic); },
    light_weapons:        function() { return skillfn("light_weapons", this, skills.light_weapons); },
    lockpick:             function() { return skillfn("lockpick", this, skills.lockpick); },
    loyalty:              function() { return skillfn("loyalty", this, skills.loyalty); },
    magic_defense:        function() { return skillfn("magic_defense", this, skills.magic_defense); },
    magic_item_tinkering: function() { return skillfn("magic_item_tinkering", this, skills.magic_item_tinkering); },
    mana_conversion:      function() { return skillfn("mana_conversion", this, skills.mana_conversion); },
    melee_defense:        function() { return skillfn("melee_defense", this, skills.melee_defense); },
    missile_defense:      function() { return skillfn("missile_defense", this, skills.missile_defense); },
    missile_weapons:      function() { return skillfn("missile_weapons", this, skills.missile_weapons); },
    recklessness:         function() { return skillfn("recklessness", this, skills.recklessness); },
    run:                  function() { return skillfn("run", this, skills.run); },
    salvaging:            function() { return skillfn("salvaging", this, skills.salvaging); },
    shield:               function() { return skillfn("shield", this, skills.shield); },
    sneak_attack:         function() { return skillfn("sneak_attack", this, skills.sneak_attack); },
    summoning:            function() { return skillfn("summoning", this, skills.summoning); },
    two_handed_combat:    function() { return skillfn("two_handed_combat", this, skills.two_handed_combat); },
    void_magic:           function() { return skillfn("void_magic", this, skills.void_magic); },
    war_magic:            function() { return skillfn("war_magic", this, skills.war_magic); },
    weapon_tinkering:     function() { return skillfn("weapon_tinkering", this, skills.weapon_tinkering); },

    skill_credits_spent: function () {
      return 0 + _.reduce(_.map(_.filter(this.skills, function(s) { return s.training == "trained"; }), function(s) { return cost[s.key][s.training]; }), function(s,v) { return s + v; }, 0) +
             _.reduce(_.map(_.filter(this.skills, function(s) { return s.training == "specialized"; }), function(s) { return cost[s.key][s.training]; }), function(s,v) { return s + v; }, 0);
    },
    skill_credits_spent_specialized: function() {
      return 0 + _.reduce(_.map(_.filter(this.skills, function(s) { return s.training == "specialized"}), function(s) { return cost[s.key].specialized; }), function(s,v) { return s + v; }, 0);
    },
    skill_credits_available: function() {
      return this.skill_credits_total - this.skill_credits_spent;
    },
    skill_credits_total: function () {
      return 52 + skill_credits(this.level) +
        (this.extra_skill_credits.oswald ? 1 : 0) +
        (this.extra_skill_credits.railrea ? 1 : 0) +
        (this.extra_skill_credits.lum1 ? 1 : 0) +
        (this.extra_skill_credits.lum2 ? 1 : 0);
    },
    specialized_skills: function () {
      var skills = _.filter(this.skills, function(skill) { return skill.training == "specialized"; });

      for (var i = 0; i < skills.length; i++) {
        skills[i].value = this[skills[i].key];
        skills[i].increase = "disabled"
        skills[i].decrease = "enabled";
        skills[i].cost_down = cost[skills[i].key].specialized;
      }

      return skills;
    },
    trained_skills: function () {
      var skills = _.filter(this.skills, function(skill) { return skill.training == "trained"; });

      for (var i = 0; i < skills.length; i++) {
        skills[i].value = this[skills[i].key];
        skills[i].increase = can_spec(skills[i].key) ? ((cost[skills[i].key].specialized <= this.skill_credits_available) ? "enabled" : "disabled") : "disabled"
        skills[i].decrease = can_untrain(skills[i].key) ? "enabled" : "disabled";
        skills[i].cost_up = cost[skills[i].key].specialized;
        skills[i].cost_down = cost[skills[i].key].trained;
      }

      return skills;
    },
    untrained_skills: function () {
      var skills = _.filter(this.skills, function(skill) { return skill.training == "untrained"; });

      for (var i = 0; i < skills.length; i++) {
        skills[i].value = this[skills[i].key];
        skills[i].increase = (cost[skills[i].key].trained <= this.skill_credits_available) ? "enabled" : "disabled";
        skills[i].decrease = "enabled";
        skills[i].cost_up = cost[skills[i].key].trained;
      }

      return skills;
    },
    unusable_skills: function () {
      var skills = _.filter(this.skills, function(skill) { return skill.training == "unusable"; });

      for (var i = 0; i < skills.length; i++) {
        skills[i].value = this[skills[i].key];
        skills[i].increase = (cost[skills[i].key].trained <= this.skill_credits_available) ? "enabled" : "disabled";
        skills[i].decrease = "disabled";
        skills[i].cost_up = cost[skills[i].key].trained;
      }

      return skills;
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
        _.each(vals, function(v) {
          if (vals[j] <= 10) continue;
          --vals[j];
          extra -= 1;
        })
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
        if (this.skill_credits_available >= cost[key].trained) {
          this.skills[key].training = 'trained';
        } else {
          console.log("Not enough available skill credits.");
        }
      } else if (training == 'trained') {
        if (this.skill_credits_available < cost[key].specialized) {
          console.log("Not enough available skill credits.");
        } else if ((this.skill_credits_spent_specialized + cost[key].specialized) > max_spec) {
          console.log("You cannot specialize more than " + max_spec + " credits worth of skills.");
        } else {
          this.skills[key].training = 'specialized';
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
