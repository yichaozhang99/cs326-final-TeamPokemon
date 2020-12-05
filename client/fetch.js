export async function getPokemon() {
    const resp = await fetch('/getHistory');
    const data = await resp.json();
    return data;
}

export async function pokeInfo(name) {
    let obj;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ "pokemonName": name });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    let a = fetch("/getInfo", requestOptions)
        .then(response => response.json())
        .then(result => obj = result)
        .catch(error => console.log('error', error));  
    
    return a;
}





