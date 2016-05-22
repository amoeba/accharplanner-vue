var attr_max = 330
    level_min = 5,
    level_max = 275;

new Vue({
    el: '#app',
    data: {
          'name': 'Kolthar',
          'level' : 5,
          'strength' : 30,
          'endurance': 30,
          'coordination': 30,
          'quickness': 30,
          'focus': 30,
          'self': 30
    },
    computed: {
      health: function() {
        return this.endurance / 2;
      },
      stamina: function() {
      	return this.endurance;
      },
      mana: function() {
      	return this.self
      },
    	someskill: function() {
      	return this.strength * 2 + this.level;
 			},
      attr_sum: function() {
        return this.strength + this.endurance + this.coordination + this.quickness + this.focus + this.self;
      }
    },
    methods: {
      level_increase: function() {
        if (this.level + 1 <= level_max) {
          this.level = this.level + 1;
        }
      },
      level_decrease: function() {
        if (this.level - 1 >= level_min) {
          this.level = this.level - 1;
        }
      },
      strength_increase: function() {
        if (this.strength == 100) {
          return;
        } else if (this.strength > 100) {
          this.strength = 100;
        }

        this.strength = this.strength + 1;
        var new_sum = this.strength + this.endurance + this.coordination;
        var extra = new_sum - attr_max;

        if (extra > 0) {
          this.endurance = this.endurance - extra;
        }
      }
    }
})
