function CombatRuntimes() {
    /* while attacking */
    $(output).wiki("What will you attack with?");
    $(output).wiki(playermoves.join(', '))

}

/* Will add more variables later */
function PlayerUnarmedAttacks(name, damage) {
    this.name = name;
    this.damage = damage;

}
let playermoves = [""];
let starora = new PlayerUnarmedAttacks("ORA!", 15);
playermoves.push("ORA");
let staroraora = new PlayerUnarmedAttacks("ORA ORA ORA!", 30);
playermoves.push("ORA ORA ORA");

CombatRuntimes();

let enemy_fighting = "DIO";

function EnemyDamage() {
    for (enemy_fighting in Enemy) {
        let enemy
            }
}

$(output).wiki('"Oh, you\'re approaching me? Instead of running away you\'re coming right at me?"');

$(output).wiki("I can't beat the shit out of you without getting closer");
$(output).wiki('"Oh, then come as close as you like..."');

$(output).wiki("You approach " + enemey_name + ".");
$(output).wiki("What will you do?");

/* Fight */