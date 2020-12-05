import * as f from "./fetch.js";

window.onload = async () => {
    let grab = new URLSearchParams(window.location.search);
    name = grab.get('pokemon');
    
    let data = await f.pokeInfo(name);
    //console.log(data.evolutionLine)
    document.getElementById("n").innerText = data.name;
    document.getElementById("photo").src = data.imageUrl;
    document.getElementById("t").innerText = data.type;
    document.getElementById("l").innerText = data.location[0];
    document.getElementById("w").innerText = "water";
    document.getElementById("a").innerText = data.abilities.splice(0,2);
    document.getElementById("e").innerText = data.evolution;
    const [enemy1, enemy2, enemy3] =await Promise.all(data.enemies.slice(0,3).map(enemy=>f.pokeInfo(enemy)));
    document.getElementById("name1").innerText = "View" + " " + enemy1.name;
    document.getElementById("name2").innerText = "View" + " " + enemy2.name;
    document.getElementById("name3").innerText = "View" + " " + enemy3.name;
    document.getElementById("e1").src = enemy1.imageUrl;
    document.getElementById("e2").src = enemy2.imageUrl;
    document.getElementById("e3").src = enemy3.imageUrl;

    const elems = document.getElementsByClassName('go-to-class')
    for(let i = 0; i < elems.length; i++){
        elems[i].onclick = ()=>{
            const prefix = window.location.href.substr(0,1 + window.location.href.indexOf('='));
            window.location.href = prefix + elems[i].innerHTML.substr(5);
        } 
    }

}



