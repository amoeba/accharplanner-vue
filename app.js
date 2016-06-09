var attr_max = 330,
    level_min = 5,
    level_max = 275;

// Skill functions
var bonus = function(training) {
  var bonus = 0;

  if (training == "specialized") {
    console.log("Adding a value of 5 to training.");
    bonus = 5;
  }

  return(bonus);
}

var skills = {
  arcane_lore : function(attributes) {
    return parseInt(attributes.focus) / 3;
  },
  heavy_weapons : function(attributes) {
    return (parseInt(attributes.strength) + parseInt(attributes.coordination)) / 3;
  },
  healing : function(attributes) {
    return (parseInt(attributes.focus) + parseInt(attributes.coordination)) / 3;
  }
}


var credits_by_level = { 
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
}

function closest(array, value) {
  var idx = 0;
  for (var i = array.length - 1; i >= 0; i--) {
    if(Math.abs(value - array[i]) < Math.abs(value - array[idx])){
      idx = i;
    }
  }
  
  return array[idx];
}

var skill_credits = function(level) {
  return credits_by_level[closest(_.keys(credits_by_level), level)];
}


var vm = new Vue({
  el: '#app',
  data: {
    'name': 'Kolthar',
    'level': 5,
    'attributes': {
      'strength': 30,
      'endurance': 30,
      'coordination': 30,
      'quickness': 30,
      'focus': 30,
      'self': 30
    },
    'skills': {
      'arcane_lore': {
        key: 'arcane_lore',
        name: 'Arcane Lore',
        training: 'specialized',
        value: -1
      },
      'heavy_weapons': {
        key: 'heavy_weapons',
        name: 'Heavy Weapons',
        training: 'trained',
        value: -1
      },
      'healing': {
        key: 'healing',
        name: 'Healing',
        training: 'untrained',
        value: -1
      }
    }
  },
  computed: {
    health: function () {
      return this.attributes.endurance / 2;
    },
    stamina: function () {
      return this.attributes.endurance;
    },
    mana: function () {
      return this.attributes.self
    },
    attr_sum: function () {
      return this.attributes.strength +
          this.attributes.endurance +
          this.attributes.coordination +
          this.attributes.quickness +
          this.attributes.focus +
          this.attributes.self;
    },
    used_skill_credits: function () {
      return 10;
    },
    total_skill_credits: function () {
      return skill_credits(this.level);
    },
    specialized_skills: function () {
      return _.filter(this.skills, function(skill) {
        return skill.training == "specialized";
      });
    },
    trained_skills: function () {
      return _.filter(this.skills, function(skill) {
        return skill.training == "trained";
      });
    },
    untrained_skills: function () {
      return _.filter(this.skills, function(skill) {
        return skill.training == "untrained";
      });
    }
  },
  methods: {
    update_skills: function(new_attributes) {
      console.log("update_skills...");
      console.log(this.skills);

      this.skills.arcane_lore.value =  Math.round(skills.arcane_lore(new_attributes) + bonus(this.skills.arcane_lore.training));
      this.skills.heavy_weapons.value = Math.round(skills.heavy_weapons(new_attributes) + bonus(this.skills.heavy_weapons.training));
      this.skills.healing.value = Math.round(skills.healing(new_attributes) + bonus(this.skills.healing.training));
    },
    training_increase: function(event) {
      console.log('training_increase...');
      console.log(event);
      console.log(event.target.attributes[0].value);

      var key = event.target.attributes[0].value;
      var training = this.skills[key].training;

      if (training == 'untrained') {
        this.skills[key].training = 'trained';
      } else if (training == 'trained') {
        this.skills[key].training = 'specialized';
      }

      this.update_skills(this.attributes);
    },
    training_decrease: function(event) {
      console.log('training_decrease...');
      console.log(event);
      console.log(event.target.attributes[0].value);

      var key = event.target.attributes[0].value;
      var training = this.skills[key].training;

      if (training == 'specialized') {
        this.skills[key].training = 'trained';
      } else if (training == 'trained') {
        this.skills[key].training = 'untrained';
      }
     
      this.update_skills(this.attributes);
    }
  }
})

vm.$watch('attributes', function(oldval, newval) {
  vm.update_skills(newval);
}, { deep: true })

// Initialize skill values
vm.update_skills(vm.$get('attributes'));
