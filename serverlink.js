/* Start game on the server by location hash */
function playByLocationHash(){
    if (window.location.hash.length){
        switchPlayingServer(window.location.hash.substr(1));
    }
}

/* Change page hash by click on select */
function changeHashOnSelect(){
    $('#serverselector select').on('change', function() {
        var id = $(this).children(":selected").attr("id");
        if(history.pushState) {
            history.pushState(null, null, '#' + id);
        }
        else {
            location.hash = '#' + id;
        }
    });
}

/*Switch playing server*/

$( document ).ready(function() {
    changeHashOnSelect();
    playByLocationHash();
});