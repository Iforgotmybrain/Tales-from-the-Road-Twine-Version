const PlayerSkills = { /*Needs to be fixed for Twine. Won't work in current state.*/
    unarmed: 10,
    melee: 10,
    ranged: 10,
    fire_magic: 10,
    ice_magic: 10,
    mind_magic: 10,
    healing_magic: 10,
    salesmenship: 10
};

setup.stats = function PlayerNPCs(name, hp, str, int, dex, agl, per, chs) {
    this.name = name;
    this.hp = hp;
    this.str = str;
    this.int = int;
    this.dex = dex;
    this.agl = agl;
    this.per = per;
    this.chs = chs;


setup.whogoes = function WhoGoesThere() {
    /* Use window or setup to make var global. Based learnxinyminutes.com*/
    window.player_stats = new PlayerNPCs("Jotaro", 100,5,5,5,5,5,5);
    window.dio_test = new PlayerNPCs("DIO", 50, 5,5,5,5,5,5);
    const enemy_fighting = dio_test; /*Will need to adjust this to make it easy to grab name of enemy.*/
    window.player_attack = "";

};

setup.damage = function EnemyDamage() {
    /*Also needs to be cleaned up and turned into a proper object.*/
        if (player_attack === "one") {
            dio_test.hp -= 10;
            player_attack = "";
        }
};

setup.enemyAttack = function EnemyAttacking() {
    const enemyTurn = true;
    const enemyAttacks = ["MUDA", "ZA WAURDO"]; /*Will need to make this into an object and function*/
    while (enemyTurn === true) {
        window.choosenAttack = enemyAttacks[Math.floor(Math.random() * enemyAttacks.length)];
        if (choosenAttack === "MUDA") {
            player_stats.hp -= 15;
            break
        } else if (choosenAttack === "ZA WAURDO") {
            player_stats.hp -= 25;
            break
        }
    }
};

function RaceSetting() {
    const race = state.active.variables.race;

    if (race === "Wolf") {
        PlayerStats.str += 1;
        PlayerStats.per += 1;
        PlayerSkills.unarmed += 5
    };

    if (race === "Lion") {
        PlayerStats.agl += 1;
        PlayerStats.int += 1;
        PlayerSkills.mind_magic += 5
    };

    if (race === "Dragon") {
        PlayerStats.str += 1;
        PlayerStats.agl += 1;
        PlayerSkills.ice_magic += 5;
        PlayerSkills.fire_magic += 5
    };

    if (race === "Fox") {
        PlayerStats.dex += 1;
        PlayerStats.chs += 1;
        PlayerSkills.ranged += 5
    };

}}