setup.skills = function PlayerNPCSkills(unarmed, melee, ranged, fire_magic, ice_magic, mind_magic, healing_magic, salesmanship) {
    /*The skills used by NPCs and the player. Used to help calculate damage currently.*/
    this.unarmed = unarmed;
    this.melee = melee;
    this.ranged = ranged;
    this.fire_magic = fire_magic;
    this.ice_magic = ice_magic;
    this.mind_magic = mind_magic;
    this.healing_magic = healing_magic;
    this.salesmenship = salesmanship;
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
};

setup.moves =function Moves (atkName, damage, accuracy) {
    /*Might want to add a parameter signifying preference the AI has for an attack. DIO, for example, should not use
    * ZA WAURDO every turn. I could work some probability in to keep this from happening.*/
    this.atkName = atkName;
    this.damage = damage;
    this.accuracy = accuracy;

};

setup.initstats = function InitStats() {
    window.playerSkills = new setup.skills(10,10,10,10,10,
        10,10,10);
    window.playerStats = new setup.stats("Jotaro", 70,9,9,9,9,9,3);

    window.dioBrando = new setup.stats("DIO", 40,9,9,7,9,9,8);

    window.mudaAttack = new setup.moves("MUDA", 10, .90);

    window.zawaurdoAttack = new setup.moves("ZA WAURDO", 20, .90);

    window.timestopKnifeAttack = new setup.moves("ZA WAURDO Knife Attack", 35, .90);

    window.roadRoller = new setup.moves("ROADA ROLLA", 35, .99);

    window.oraAttack = new setup.moves("ORA!", 10,.95);
    window.oraOraRushAttack = new setup.moves("ORA ORA Rush!", 20,.95);
    window.starTheWorld = new setup.moves("Star Platinum: The World", 150, 1.0);
};

setup.whogoes = function StartingObjs() {
    /*Currently initializes lots of variables and creates the basic NPC and player objects. Lots of the stuff here
    * will be moved to different functions later. This is the quick and dirty way to get stuff working while I
    * muck about. */
    window.enemyFighting = "";

    window.playerAttack = "";

    window.playerFighting = false;

    window.enemyAttacks = [mudaAttack, zawaurdoAttack];

    window.playerAttacks = [oraAttack];

};

setup.PCAttacking = function EnemyDamage() {
    window.playerAttackHitMiss = false;
    /* Calculator for unarmed attacks */
    window.playerAttackCalc = playerAttack.damage + 0.20 * playerStats.str + 0.10 * playerSkills.unarmed | 0;
    const playerAttackChance = Math.random();
    console.log(playerAttackChance);

    if (playerAttackChance <= playerAttack.accuracy) {
        dioBrando.hp -= playerAttackCalc;
        /*Player attack is done.*/
        playerAttack = "";
        playerAttackHitMiss = true;

    } else {
        console.log("Missed that one. Try another!");
        playerAttackHitMiss = false;
    }
};

function getArrayRandomElement (arr) {
    if (arr && arr.length) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    // The undefined will be returned if the empty array was passed
};

setup.pullvalue = function pullValues(array, obj) {
    return array.map(function(item) { return item[obj]; });
};

setup.enemyAttack = function EnemyAttacking() {
    window.enemyAttackHitMiss = false;
    /*Where an enemy, in this case DIO, chooses it's attacks.*/
    window.choosenAttack = getArrayRandomElement(enemyAttacks);
    window.enemyAttackCalc = choosenAttack.damage + 0.20 * enemyFighting.str | 0;
    const enemyAttackChance = Math.random();
    if (enemyAttackChance <= choosenAttack.accuracy) {
        playerStats.hp -= enemyAttackCalc;
    } else {
        enemyAttackHitMiss = true;
        console.log("You expected a hit, but it was me, Dio!");
    }
};

/*setup.JSLoaded = false;
var lockID = LoadScreen.lock();  // Lock loading screen
importScripts("https://www.googletagmanager.com/gtag/js?id=INSERT_GA_ID_HERE")
    .then(function() {
        setup.JSLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function (){ dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', 'INSERT_GA_ID_HERE');
        LoadScreen.unlock(lockID);  // Unlock loading screen
    }).catch(function(error) {
        alert("Error: Could not load 'gtag.js'.");
    }
);


$(document).on('click', 'a', function (ev) {
    // Get the destination of the clicked link var passage
    var passage = $(this).attr('data-passage');
    // Send the message to google analytics
    gtag('event', 'Navigation', {
        event_label    : passage,
        event_category : 'GuestClick'
    });

});*/

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
} else if (choosenAttack.name === "ROADA ROLLA") {
    $output.wiki("DIO stops time once again. At this point he's able to stop it for 9 seconds, while you can only stop it for 2 seconds." +
        "DIO seems to have something different planned this time. He leaves the area for a few seconds while time is stopped," +
        "you're unsure of what exactly he has planned. Shortly after he appears from above holding a road roller, he plans on" +
        "crushing you with it while time is stopped! You use your two seconds of control during the time stop to try" +
        "and stop him but he seems to be overpowering you, or at least that's what he thinks..." +
        "DIO thinks he's finally finished you off, but right as he starts to boast, you turn his own technique " +
        "against him.");
    state.active.variables["timestopping"] = true
}

