/* Chec if page was reloaded */
function runIfPageReloaded(callback){

    if (window.performance && performance.navigation.type == 1) {
        //console.info( "This page is reloaded" );
    } else {
        //console.info( "This page is not reloaded");
        callback();
    }
}

/* Start game on the server by location hash */
function playByLocationHash(){
    if (window.location.hash.length){
        switchPlayingServer(window.location.hash.substr(1));
    }
}

/* General has change logic */
function changeHash(hash){
    if (!hash){
        hash = $('#serverselector select').children(":selected").attr("id"); // get selected hash if not specified
    }

    if(history.pushState) {
        history.pushState(null, null, '#' + hash);
    }
    else {
        location.hash = '#' + hash;
    }
}

/* Change page hash by click on select */
function changeHashOnSelect(selector){
    $(selector).on('change', function() {
        changeHash();
    });
}


/* Change page hash by click on gamemode button */
function changeHashOnClick(selector, hash){
    //var element = $(selector);
    $(document).on("click", selector, function() {
        var element = $(this);
        if (element.attr('data-server')){
            console.log(element.attr('data-server'));
            hash = element.attr('data-server');
        }
        changeHash(hash);
    });
}

/*Switch playing server*/

$( document ).ready(function() {
    console.log('!ready!');
    changeHashOnSelect('#serverselector select');
    changeHashOnClick('.btn-gamemode');
    changeHashOnClick('#friends .switch-server');
    runIfPageReloaded(function(){
        playByLocationHash();
    });
});