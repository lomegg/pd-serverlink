/* Check if page was reloaded */
function runIfPageNotReloaded(callback, fallback){

    if (window.performance && (performance.navigation.type == 1)) {
        //console.info( "This page is reloaded" );
        fallback();
    } else {
        //console.info( "This page is NOT reloaded");
        callback();
    }
}

/* Start game on the server by location hash */
function playByLocationHash(){
    if (window.location.hash.length){

        var server = window.location.hash.substr(1);

        checkIfServerPresent(server, function(){
            switchPlayingServer(server);
        });
    } else {
        console.warn('No server hash');
    }
}

/* General has change logic */
function changeHash(hash){
    if (!hash){
        hash = $('#serverselector select').children(":selected").attr("id"); // get selected hash if not specified
    }
    if (window.location.hash !== ('#' + hash)){
        if(history.pushState) {
            history.pushState(null, null, '#' + hash);
        }
        else {
            location.hash = '#' + hash;
        }
    }
}

/* Change page hash by click on select */
function changeHashOnSelect(selector){
    $(document).on("change", selector, function(){
        changeHash();
    });
}


/* Change page hash by click on gamemode button */
function changeHashOnClick(selector, hash){
    //var element = $(selector);
    $(document).on("click", selector, function() {
        var element = $(this);
        if (element.attr('data-server')){
            hash = element.attr('data-server');
        }
        changeHash(hash);
    });
}

/*Set menu selector on a server*/
window.selectServerInMenuByHash = function(){
    if (window.location.hash.length){
        var server = window.location.hash.substr(1);
        checkIfServerPresent(server, function(){
            $("#region option").remove();
            $("#region").append(text);
            $("#region").val("none");
            var m = $('#region option[autorun="' + server + '"]').attr('MODE');
            showonly(m);
            $('#modeselector button').removeClass('btn-success');
            $('button#' + m).attr("selected","selected").addClass('btn-success');
            $('#serverselector select').children(":selected").removeAttr('selected');
            $('#serverselector select option[id="' + server + '"]').attr("selected","selected");
        });

    } else {
        console.warn('No server hash');
    }
};

/*Check if server option is present*/
function checkIfServerPresent(server, callback){
    $('body').append('<select id="tmp-cont" style="display:none;"></select>');
    //$("#region option").remove();
    $("#tmp-cont").append(text);

    if ($('#tmp-cont option[id="' + server + '"]').length){
        $("#tmp-cont").remove();
        if (callback){
            callback(server);
        } else {
            return true;
        }
    } else {
        $("#tmp-cont").remove();
        console.warn('Hash contains server name that is not exists');
        return false;
    }
}


$( document ).ready(function() {
    changeHashOnSelect('#serverselector select');
    changeHashOnClick('.btn-gamemode');
    changeHashOnClick('#friends .switch-server');

    // Hybrid run - if page was reloaded, show server in menu; if opened fresh, launch server
    /*runIfPageNotReloaded(function(){
        console.log('callback');
        playByLocationHash();
    }, function(){
        console.log('fallback');
        selectServerInMenuByHash();
    }); */

    // Gentle run - select in menu and that's it
    //
    selectServerInMenuByHash();
});