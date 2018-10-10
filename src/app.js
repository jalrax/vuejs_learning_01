new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    damage: 0,
    turns: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      this.playerAttacks();
      this.monsterAttacks();
    },
    specialAttack() {
      this.playerAttacks(10, 20);
      this.monsterAttacks(8, 15);
    },
    heal() {
      this.playerHealth <= 90 ? this.playerHealth += 10 : this.playerHealth = 100;
      this.turn(true, 0);
      this.monsterAttacks();
    },
    giveUp() {
      this.gameIsRunning = false;
    },
    playerAttacks(min = 3, max = 10) {
      this.monsterHealth -= this.calculateDamage(min, max);
      this.turn(true, min);
    },
    monsterAttacks(min = 5, max = 12) {
      this.playerHealth -= this.calculateDamage(min, max);
      this.turn(false, min);
    },
    calculateDamage(min, max) {
      this.damage = Math.max(Math.floor(Math.random() * max) + 1, min);
      return this.damage;
    },
    turn(isPlayer, min) {
      min > 0
        ? this.turns.unshift({
          isPlayer: isPlayer,
          isHealed: false,
          text: isPlayer
            ? `Player hits Monster ${min > 3 ? 'hard' : ''} for ${this.damage}`
            : `Monster hits Player ${min > 5 ? 'hard' : ''} for ${this.damage}`
        })
        : this.turns.unshift({
          isPlayer: isPlayer,
          isHealed: true,
          text: `Player heals for 10`
        });

    },
    gameStarter(isWon) {
      const text = isWon ? 'won' : 'lost';
      if (confirm(`You have ${text}! Do you want to start a new game?`)) {
        this.startGame();
      } else {
        this.gameIsRunning = false;
      }
    }
  },
  watch: {
    playerHealth(value) {
      value <= 0 && !!this.gameIsRunning ? this.gameStarter(false) : null;
    },
    monsterHealth(value) {
      value <= 0 && !!this.gameIsRunning ? this.gameStarter(true) : null;
    },
    gameIsRunning(value) {
      if (!value) {
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns = [];
      }
    }
  }
});