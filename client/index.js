
window.onload = () => {
    document.getElementById('search').onclick = () => {
        window.location.href = window.location.href + 'dashboard?pokemon=' + document.getElementById('enemyname').value;
    }
}
