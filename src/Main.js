setup.skills = function PlayerNPCSkills(unarmed, melee, ranged, fire_magic, ice_magic, mind_magic, healing_magic, salesmanship) {
    /*The skills used by the player. Used to help calculate damage currently. NPCs do not currently use them.
    * Might change later.*/
    this.unarmed = unarmed;
    this.melee = melee;
    this.ranged = ranged;
    this.fire_magic = fire_magic;
    this.ice_magic = ice_magic;
    this.mind_magic = mind_magic;
    this.healing_magic = healing_magic;
    this.salesmenship = salesmanship;
};

setup.stats = function PlayerNPCs(name, base_hp, current_hp, str, int, end, agl, per, chs, race) {
    /* Stats for both NPCs and player. */
    this.name = name;
    this.base_hp = base_hp;
    this.current_hp = current_hp;
    this.str = str;
    this.int = int;
    this.end = end;
    this.agl = agl;
    this.per = per;
    this.chs = chs;
    this.race = race;
};

setup.moves = function Moves (name, damage, accuracy, flavor, type, statsType) {
    /*Might want to add a parameter signifying preference the AI has for an attack. So they don't spam the most
    * powerful move every turn.*/
    this.name = name;
    this.damage = damage;
    this.accuracy = accuracy;
    this.flavor = flavor;
    this.type = type;
    this.statsType = statsType;

};

setup.weapons = function Weapons (name, effect, flavor_text, equipped, weaponStatsType) {
    /* Weapons attributes. Might need to add-on to this depending on how it works in practice. */
    this.name = name;
    this.effect = effect;
    this.flavor_text = flavor_text;
    this.equipped = equipped;
    this.weaponStatsType = weaponStatsType;
};

setup.initstats = function InitStats() {
    window.hyenaMugger = new setup.stats("Hyena Mugger", 15,2,2,3,4,1,1, "Hyena");
    window.tigerMugger = new setup.stats("Armed Tiger Mugger", 15,2,23,4,1,1, "Tiger");
    window.targetDummy = new setup.stats("Target", 100, 100, 1,1,1,1,1,1,);
    window.playerStats = new setup.stats("", 50, "", 5,5,5,5,5,5, "");
    window.playerSkills = new setup.skills(10,10,10,10,10,10,10,10);

    window.punchAttack = new setup.moves("Punch", 3, .80, " sends a fast punch right towards your chest.");
    window.knifeSlash = new setup.moves("Knife Slash", 8, .65, "pulls a knife on you, slashing a non-vital spot.");
    window.playerPunch = new setup.moves("Light Punch", 2, .90, "You punch the " + enemyFighting.name,
        playerSkills.unarmed, playerStats.str);

    window.playerKnifeSlash = new setup.moves("Knife Slash", 4, .95, "You slash the " + enemyFighting.name, playerSkills.melee,
        playerStats.agl);
    window.playerRevolverShot = new setup.moves("Revolver Shot", 10, .70, "You shoot the " + enemyFighting.name,
        playerSkills.ranged);

    window.basicKnife = new setup.weapons("Basic Knife", 10, "A basic pocket knife.", false, playerSkills.melee);
    window.testRevolver = new setup.weapons("Basic Revolver", 25, "A basic .357 revolver.", false, playerSkills.ranged);

    Object.defineProperty(playerStats, 'function5', {
        writeable:false, configurable: true
    });
    playerStats.name = state.active.variables["name"];
    playerStats.race = state.active.variables["race"];
    if (playerStats.race === "Wolf") {
        playerStats.str += 1;
        playerStats.per += 1;
    } else if (playerStats.race === "Lion") {
        playerStats.agl += 1;
        playerStats.int += 1;
    } else if (playerStats.race === "Fox") {
        playerStats.agl += 1;
        playerStats.chs += 1;
    } else if (playerStats.race === "Dragon") {
        playerStats.end += 1;
        playerStats.str += 1;
    } else {
        console.log("Error assigning race traits.")
    }
};

setup.whogoes = function StartingObjs() {
    window.playerWeaponEquip = false;
    window.playerWeaponEquipped = "";

    window.enemyFighting = "";

    window.playerAttack = "";

    window.playerFighting = false;

    window.enemyAttacks = [];

    window.playerAttacks = [];

    window.fightFlavor = "";

    window.nextMoment = "";

};

setup.PCAttacking = function EnemyDamage() {
    window.playerAttackHitMiss = false;
    /* Calculator for unarmed attacks */
    if (playerWeaponEquip === false || playerAttack.statsType !== playerWeaponEquipped.weaponStatsType ) {
        window.playerAttackCalc = playerAttack.damage + 0.20 * playerAttack.statsType + 0.10 * playerAttack.type | 0;
    } else {
        window.playerAttackCalc = playerAttack.damage + 0.20 * playerAttack.statsType + 0.05 * playerWeaponEquipped.effect
            + 0.10 * playerAttack.type | 0;
    }
    window.playerAttackChance = Math.random();
    console.log(playerAttackChance);

    if (playerAttackChance <= playerAttack.accuracy) {
        enemyFighting.current_hp -= playerAttackCalc;
        /*Player attack is done.*/
        let playerAttack = "";
        window.playerAttackHitMiss = true;

    } else {
        console.log("Missed that one. Try another!");
        window.playerAttackHitMiss = false;
    }
};

function getArrayRandomElement (arr) {
    if (arr && arr.length) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    // The undefined will be returned if the empty array was passed
}

setup.pullvalue = function pullValues(array, obj) {
    return array.map(function(item) { return item[obj]; });
};

setup.enemyAttack = function EnemyAttacking() {
    if (enemyAttacks.length > 0) {
        window.enemyAttackHitMiss = false;
        /*Where an enemy chooses it's attacks.*/
        window.choosenAttack = getArrayRandomElement(enemyAttacks);
        window.enemyAttackCalc = choosenAttack.damage + 0.20 * enemyFighting.str | 0;
        window.enemyAttackChance = Math.random();
        if (enemyAttackChance <= choosenAttack.accuracy - (playerStats.agl / 150)) {
            playerStats.current_hp -= enemyAttackCalc;
        } else {
            window.enemyAttackHitMiss = true;
            console.log("You expected a hit, but it was me, Dio!");
        }

    } else {
        console.log('No attacks found. May or may not be intended.')
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

    setup.skills();
    setup.stats();
    setup.whogoes();
    setup.initstats();
    setup.racesettings();

}

setup.stats();
setup.whogoes();
setup.moves();
setup.skills();
setup.initstats();
setup.racesettings();
window.nextMoment = "Post Ranged Test";
window.testRevolver.equipped = true;
window.playerWeaponEquip = true;
window.playerWeaponEquipped = window.testRevolver;
console.log(playerWeaponEquipped);
playerAttacks.push(playerRevolverShot);
enemyFighting = targetDummy;
playerFighting = true;
state.active.variables["firstAttack"] = playerAttacks[0].name;
window.fightFlavor = "The targets await your gunfire."
window.nextMoment === "Post Ranged Test";
state.active.variables["returnMoment"] = window.nextMoment;
