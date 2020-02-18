const PlayerStats = {
    hp: 100,
    str: 5,
    int: 5,
    dex: 5,
    agl: 5,
    per: 5,
    chs: 5
};

const PlayerSkills = {
    unarmed: 10,
    melee: 10,
    ranged: 10,
    fire_magic: 10,
    ice_magic: 10,
    mind_magic: 10,
    healing_magic: 10,
    salesmenship: 10
};

function Enemy(name, hp, str, int, dex, agl, per, chs) {
    this.name = name;
    this.hp = hp;
    this.str = str;
    this.int = int;
    this.dex = dex;
    this.agl = agl;
    this.per = per;
    this.chs = chs;


setup.whogoes = function WhoGoesThere() {
    /* Use window or setup to make var global. Fixes the issues I had thank all the gods and learnxinyminutes.com */
    window.dio_test = new Enemy("DIO", 50, 5,5,5,5,5,5);
    const enemy_fighting = dio_test;
    window.player_attack = "";

};

setup.damage = function EnemyDamage() {
    for (let i = 0; i > 0; player_attack === "one") {
        dio_test.hp -= 10;
        console.log(dio_test.hp + "Working");
        i++
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