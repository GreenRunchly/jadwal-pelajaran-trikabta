
window.onload = function () {
    
    var intervalStatus = setInterval(function () {
        
        $("#loading").addClass('loaded');
        $("body").css('overflow-y','auto');
        clearInterval(intervalStatus);

        var intervalStatus2 = setInterval(function () {
        
            $("#loading").remove();
            clearInterval(intervalStatus2);

        },1000);
	},2000);
}
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        $(".navigasi-container").removeClass('navigasi-container-hide');
    } else {
        $(".navigasi-container").addClass('navigasi-container-hide');
    }
    prevScrollpos = currentScrollPos;
}

$(document).on('click','.toogle',function(e){
    var idnya = $(this).attr("toogle");
    var has = $("#"+idnya).hasClass('on');         

    if (has == true){
        $("#"+idnya).addClass("off");
        $("#"+idnya).removeClass("on");
        console.log('off');
        $(".navigasi-container").removeClass('navigasi-container-hide-down');  
    }else{
        $("#"+idnya).addClass("on");
        $("#"+idnya).removeClass("off");
        console.log('on');
        $(".navigasi-container").addClass('navigasi-container-hide-down');  
    }
});

$(document).on('click','.toogle-class',function(e){
    var idnya = $(this).attr("toogle-id");
    var classnya = $(this).attr("class-tambah");
    var has = $("#"+idnya).hasClass(classnya);         

    if (has == true){
        $("#"+idnya).addClass(classnya + "-off");
        $("#"+idnya).removeClass(classnya);
        console.log(classnya + 'off');
    }else{
        $("#"+idnya).addClass(classnya);
        $("#"+idnya).removeClass(classnya + "-off");
        console.log(classnya + 'on');  
    }
});

/* Addon Function */
function acakArray1D(arra1) {
    var ctr = arra1.length, temp, index;

    // While there are elements in the array
    while (ctr > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * ctr);
        // Decrease ctr by 1
        ctr--;
        // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

/* Check Update Function */
function cekUpdate(versiAplikasi){
    $.get("https://greenrunchly.github.io/apps/jadwal-pelajaran/api/version.json",
    function(data, status){
        
        if (data.beta != versiAplikasi){
            $('#parentLayout').addClass('off');
            $('#parentLayout').removeClass('on');
            $('#update').addClass('on');
            $('#update').removeClass('off');
        }else{
            $('#parentLayout').addClass('on');
            $('#parentLayout').removeClass('off');
            $('#update').addClass('off');
            $('#update').removeClass('on');
        }
        
    });
}
/* Load Tips Function */
function cekTips(){
        
    $.get("https://greenrunchly.github.io/apps/jadwal-pelajaran/api/tips.json",
    function(data, status){
        temp = acakArray1D(data);
        $("#loading-tips").html(temp[0]+'...');
    });

}