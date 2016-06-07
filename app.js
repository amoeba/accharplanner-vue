var attr_max = 330,
    level_min = 5,
    level_max = 275;

// Skill functions
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
        name: 'Arcane Lore',
        training: 'specialized',
        value: -1
      },
      'heavy_weapons': {
        name: 'Heavy Weapons',
        training: 'trained',
        value: -1
      },
      'healing': {
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
      return 52 + parseInt(this.level);
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

      this.skills.arcane_lore.value =  skills.arcane_lore(new_attributes);
      this.skills.heavy_weapons.value = skills.heavy_weapons(new_attributes);
      this.skills.healing.value = skills.healing(new_attributes);
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
    }
  }
})

vm.$watch('attributes', function(oldval, newval) {
  vm.update_skills(newval);
}, { deep: true })

// Initialize skill values
vm.update_skills(vm.$get('attributes'));
