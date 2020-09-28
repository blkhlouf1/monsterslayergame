function getrandomnumber(min, max){
   return Math.floor(Math.random() * (max-min) + min);
}

const app = Vue.createApp({
    data() {
        return{
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null,
            messages: []

        }
    },
    methods: {
        addLogmessage(who , what, value){
        this.messages.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
        })
       },
        restartGame(){
            this.monsterHealth = 100,
            this.playerHealth = 100,
            this.currentRound = 0,
            this.winner = null,
            messages = []

        },
        attackMonster(){
            this.currentRound ++;
            const attackValue = getrandomnumber(5 , 12);
            this.monsterHealth -= attackValue;
            this.addLogmessage('Player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getrandomnumber(8 , 15);
            this.addLogmessage('Monster', 'attack', attackValue);
            this.playerHealth -= attackValue;
        },
        specialAttack(){
            this.currentRound ++;
            const attackValue = getrandomnumber(13 , 20);
            this.monsterHealth -= attackValue;
            this.addLogmessage('Player', 'attack', attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            const healValue = getrandomnumber(10 , 20);
            this.addLogmessage('Player', 'Heal', healValue);
            if(this.playerHealth + healValue >= 100){
                this.playerHealth = 100; 
            } else {
                this.playerHealth += healValue;
            }
        },
        surrender(){
            this.winner = "monster"
        }
    },
    computed: {
        playerStatus(){
            if(this.playerHealth <= 0){
                return {width: '0%'};
            }else 
            return {width: this.playerHealth + '%'};
    },
        monsterStatus(){
            if(this.monsterHealth <= 0){
                return {width: '0%'};
            }else 
            return {width: this.monsterHealth + '%'};
    },
        loadingSpecial(){
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        monsterHealth(value){
            if (value <= 0 && this.playerHealth <= 0){
               this.winner = "draw"
            } else if (value <= 0){
               this.winner = "player"
            }
        },
        playerHealth(value){
            if (value <= 0 && this.monsterHealth <= 0){
                this.winner = "draw";
             } else if (value <= 0){
                this.winner = "monster";
             }
        }
    }

});
 
app.mount("#game")