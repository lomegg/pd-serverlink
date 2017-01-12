/* Start game on the server by location hash */
function playByLocationHash(){
    if (window.location.hash.length){
        switchPlayingServer(window.location.hash.substr(1));
    }
}

/* General has change logic */
function changeHash(){
    var id = $('#serverselector select').children(":selected").attr("id");
    if(history.pushState) {
        history.pushState(null, null, '#' + id);
    }
    else {
        location.hash = '#' + id;
    }
}

/* Change page hash by click on select */
function changeHashOnSelect(selector){
    $(selector).on('change', function() {
        changeHash();
    });
}

/* Change page hash by click on gamemode button */
function changeHashOnClick(selector){
    $(selector).on('click', function() {
        changeHash();
    });
}

/*Switch playing server*/

$( document ).ready(function() {
    console.log('!ready!');
    changeHashOnSelect('#serverselector select');
    changeHashOnClick('.btn-gamemode');
    playByLocationHash();
});