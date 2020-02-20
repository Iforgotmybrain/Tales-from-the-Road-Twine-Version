setup.skills = function PlayerNPCSkills(unarmed, melee, ranged, fire_magic, ice_magic, mind_magic, healing_magic, salesmanship) {
    /*The skills used by NPCs and the player. Used to help calculate damage currently.*/
    this.unarmed = unarmed;
    this.melee = melee;
    this.ranged = ranged;
    this.fire_magic = fire_magic;
    this.ice_magic = ice_magic;
    this.mind_magic = mind_magic;
    this.healing_magic = healing_magic;
    this.salesmenship = salesmanship
};

setup.stats = function PlayerNPCs(name, hp, str, int, dex, agl, per, chs) {
    /*Same as skills. A template for the PC and all NPCs.*/
    this.name = name;
    this.hp = hp;
    this.str = str;
    this.int = int;
    this.dex = dex;
    this.agl = agl;
    this.per = per;
    this.chs = chs;
};

setup.pcmoves = function PlayerMoves (damage, accuracy) {
    /*Stats of attacks. Base damage and accuracy, plan on adding more parameters.*/
    this.damage = damage;
    this.accuracy = accuracy;
};

setup.enemymoves = function EnemyMoves (name, damage, accuracy) {
    /*Might want to add a parameter signifying prefence the AI has for an attack. DIO, for example, should not use
    * ZA WAURDO every turn. I could work some probability in to keep this from happening.*/
    this.name = name;
    this.damage = damage;
    this.accuracy = accuracy;
};

setup.whogoes = function StartingObjs() {
    /*Currently initializes lots of variables and creates the basic NPC and player objects. Lots of the stuff here
    * will be moved to different functions later. This is the quick and dirty way to get stuff working while I
    * muck about. */

    /* Use window or setup to make var global. Based learnxinyminutes.com */
    window.playerSkills = new setup.skills(10,10,10,10,10,
        10,10,10);

    window.playerStats = new setup.stats("Jotaro", 100,5,5,5,5,5,5);

    window.dioBrando = new setup.stats("DIO", 50,5,5,5,5,5,5);

    window.oraAttack = new setup.pcmoves(10,.95);
    window.oraOraOraAttack = new setup.pcmoves(20,.95);

    /*Gotta have a name for the attacks to show on the Twine markup.*/

    window.mudaAttack = new setup.enemymoves("MUDA", 10, .90);

    window.zawaurdoAttack = new setup.enemymoves("ZA WAURDO", 20, .90);

    window.timestopKnifeAttack = new setup.enemymoves("ZA WAURDO Knife Attack", 35, .90);

    window.enemyFighting = ""; /*Will need to adjust this to make it easy to grab name of enemy.*/

    window.playerAttack = "";

    window.playerAttackHitMiss = false;

    window.playerFighting = false;


};

setup.PCAttacking = function EnemyDamage() {
    /*Where calculating for damage done to enemy is done. Might need to be refactored with bigger scale. playerAttack
    * is defined in Twine.*/
    /* Calculator for unarmed attacks */
    window.playerAttackCalc = playerAttack.damage + 0.20 * playerStats.str + 0.10 * playerSkills.unarmed;
    if (playerAttack === oraAttack) {
        /*Uses Math.random to pick a float from 0 to 1.0. Any value less than .95 will equal a hit, in this case.*/
        const playerAttackChance = Math.random();
        console.log(playerAttackChance);

        if (playerAttackChance <= oraAttack.accuracy) {
            /*Using various stats to calculate how much to alter the base damage.*/
            dioBrando.hp -= playerAttackCalc;
            /*Player attack is done.*/
            playerAttack = "";
            /*Indicates to the game that the player didn't miss their attack*/
            playerAttackHitMiss = true;

        } else {
            console.log("Miss");
            /*Indicates to the game that the player missed their attack*/
            playerAttackHitMiss = false;
        }

    } else {
        console.log("It just works. This means something is wrong with playerAttack.")
    }
};

setup.enemyAttack = function EnemyAttacking() {
    /*Where an enemy, in this case DIO, chooses it's attacks.*/
    const enemyTurn = true;
    /*Array of attacks for the AI to choose.*/
    window.enemyAttacks = [mudaAttack, zawaurdoAttack];
    enemyAttacks.push(timestopKnifeAttack);
    /*Randomly picks one from the array. Shamelessly stolen from stackOverflow.*/
    window.choosenAttack = enemyAttacks[Math.floor(Math.random() * enemyAttacks.length)];
    /*Fucking with push command*/
    while (enemyTurn === true) {
        if (choosenAttack === mudaAttack) {
            /*Don't know I want to alter the damage AI does based off their stats.*/
            playerStats.hp -= 10;
            break
        } else if (choosenAttack === zawaurdoAttack) {
            playerStats.hp -= 20;
            break
        } else if (choosenAttack === timestopKnifeAttack) {
            playerStats.hp -= 35;
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

}

if (choosenAttack.name === "MUDA") {
    $(output).wiki("DIO attacks with " + choosenAttack.name + ", unleashing a volley of incredibly fast fists at you." +
        " Hurting you for " + choosenAttack.damage + " HP. You have " + playerStats.hp + " HP left.");
} else if (choosenAttack.name === "ZA WAURDO") {
    $(output).wiki("DIO attacks with " + choosenAttack.name + ", he completely stops time and unleashes a perfect attack right as time starts again. " +
        "Hurting you for " + choosenAttack.damage + " HP. You have " + playerStats.hp + " HP left.");
} else if (choosenAttack.name === "ZA WAURDO Knife Attack") {
    $output.wiki("DIO stops time again. But instead of punching you, he plans on hitting you from a distance with knives." +
    "He pulls an uncountable amount of knives from his belt, throwing them at you while time is stopped. Once the knives are +" +
        "are setup DIO unpauses time; the knives hit your body and cause " + choosenAttack.damage + " points of damage." +
        "You have " + playerStats.hp + " HP left.")
}

