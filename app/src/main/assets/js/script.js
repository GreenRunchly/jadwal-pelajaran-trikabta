window.onload = function () {
    
    var intervalStatus = setInterval(function () {
        
        $("#loading").addClass('loaded');
        $("body").css('overflow-y','auto');
        clearInterval(intervalStatus);

        var intervalStatus2 = setInterval(function () {
        
            $("#loading").remove();
            clearInterval(intervalStatus2);

        },1000);
	},1000);
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

$(document).on('click','.toggle',function(e){
    var idnya = $(this).attr("toggle-id");
    var has = $("#"+idnya).hasClass("on");         

    if (has == true){
        $("#"+idnya).addClass("off");
        $("#"+idnya).removeClass("on");
    }else{
        $("#"+idnya).addClass("on");
        $("#"+idnya).removeClass("off");
    }
});
var appVersion = $("#appVersionInput").val();
console.log(appVersion);
/* Check Internet Connection Function*/
function cekKoneksi(){
    $.get("https://greenrunchly.github.io/apps/jadwal-pelajaran/api/isconnected.json?"+ Date.now(),
    function(data, status){

        if (data.maintenance == 1){

            $("#app-notification-maintenance").addClass("on");
            $("#app-notification-maintenance").removeClass("off");

        }else{

            $("#app-notification-connection").addClass("off");
            $("#app-notification-connection").removeClass("on");

        }
        cekUpdate(appVersion);
        //console.log(status);
        
    }).fail(function(){ 
        
        $("#app-notification-connection").addClass("on");
        $("#app-notification-connection").removeClass("off");
        console.log('fail');

    });
}
setInterval(function(){ 

    cekKoneksi();

}, 10000);

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

            $("#app-notification-update").addClass("on");
            $("#app-notification-update").removeClass("off");
        
        }else{
            
            $("#app-notification-update").addClass("off");
            $("#app-notification-update").removeClass("on");
        }
        
    });
}
/* Load Tips Function */
function cekBanner(){
        
    addBanner = '';
    $.get("https://greenrunchly.github.io/apps/jadwal-pelajaran/api/banner.json",
    function(data, status){
        $("#banners").empty();
        data.forEach(loadBanner);
        function loadBanner(item){
            addBanner += '<a class="swiper-slide" style="background-image: url('+ item +');"></a>';
        }
        $("#banners").append('<div class="swiper-container banner-swiper size size-2 full"><div class="swiper-wrapper">' + addBanner + '</div><div class="swiper-pagination"></div></div>');
        $("#banners").append('<script> var swiper = new Swiper(".banner-swiper", {spaceBetween: 10,centeredSlides: true,loop:true,autoplay: {delay: 2000,disableOnInteraction: false,},pagination: {el: ".swiper-pagination",clickable: true,},navigation: {nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev",},});</script>');
    });

}
/* Check Berita SMAN 3 Kab Tang */
function cekBerita(){
    //https://api.sman3kabupatentangerang.sch.id/wp-get-post.php
    //http://localhost:8080/jadwalkelas/v4/api/wp-get-post.php
    $.post("https://api.sman3kabupatentangerang.sch.id/wp-get-post.php",
    {},
    function(data, status){
        hasil = data;
        $('#berita').html(hasil);
    });
}

/* Load Tips Function */
function cekTips(){
        
    $.get("https://greenrunchly.github.io/apps/jadwal-pelajaran/api/tips.json",
    function(data, status){
        temp = acakArray1D(data);
        $("#loading-tips").html(temp[0]);
    });

}

/* Storage Local Data */
function kelasChangeOption(input,pada){
    if (pada == 'kelas_jurusan'){
        if (input == 'mipa'){
            $("#select_kelas_ruang").empty();
            $("#select_kelas_ruang").append('<option value="">Pilih Ruangan</option>');
            for (var i = 1; i <= 7; i++) {
                $("#select_kelas_ruang").append('<option value="' + i + '">' + i + '</option>');
            }
        }
        if (input == 'ips'){
            $("#select_kelas_ruang").empty();
            $("#select_kelas_ruang").append('<option value="">Pilih Ruangan</option>');
            for (var i = 1; i <= 5; i++) {
                $("#select_kelas_ruang").append('<option value="' + i + '">' + i + '</option>');
            }
        }
    }
}
function setData(input,pada){
    /* simpan data */
    localStorage.setItem(pada, input);
    kelasChangeOption(input, pada);
    console.log('Set data');
}  
function loadData(pada){
    /* load data */
    return localStorage.getItem(pada);
}
function deleteData(pada){
    /* load data */
    return localStorage.removeItem(pada);
}
function cekDataSettings(){
    /* Menerapkan Data */
    // Release Item
    var mode_debug_temp = loadData('mode_debug');

    if ( mode_debug_temp !== null ) {
        $("#select_mode_debug").val(mode_debug_temp);
    }else{
        setData('off','mode_debug');
    }

    //Theme Item
    var app_theme_temp = loadData('app_theme');

    if ( app_theme_temp !== null ) {
        $("#select_app_theme").val(app_theme_temp);

        switch (app_theme_temp) {
            case 'light-theme':
                themelink = "css/style-light.css";
                break;
            case 'dark-theme':
                themelink = "css/style-dark.css";
                break;
            default:
                themelink = "css/style-light.css";
        }

        $("head link#app-theme").attr("href", themelink);
    }else{
        setData('light-theme','app_theme');
    }

    //Kelas Items
    var kelas_temp = loadData('kelas');
    var kelas_jurusan_temp = loadData('kelas_jurusan');
    var kelas_ruang_temp = loadData('kelas_ruang');
    var fill_kelas_complete = 0;

    kelasChangeOption(kelas_jurusan_temp, 'kelas_jurusan');

    if ( kelas_temp !== null ) {
        $("#select_kelas").val(kelas_temp);
        fill_kelas_complete ++;
    }
    if ( kelas_jurusan_temp !== null ) {
        $("#select_kelas_jurusan").val(kelas_jurusan_temp);
        fill_kelas_complete ++;
    }
    if ( kelas_ruang_temp !== null ) {
        $("#select_kelas_ruang").val(kelas_ruang_temp);
        fill_kelas_complete ++;
    }

    if (fill_kelas_complete == 3){
        var kelas_complete = kelas_temp + '-' + kelas_jurusan_temp + '-' + kelas_ruang_temp;
        $("#kelas").html('Kelas ' + kelas_complete.toUpperCase().replace(/-/g, ' '));
        setData(true,'startup_done');
    }
    console.log('Filled ' + fill_kelas_complete);

    // Startup Item
    var startup_done_temp = loadData('startup_done');

    if ( startup_done_temp !== null ) {
        
    }else{
        $("#app-login").addClass("on");
        $("#app-login").removeClass("off");
        console.log('Not Done yet');
    }

    console.log('Finish penerapan');
}

$(document).on('click','.penerapanSettings',function(e){
    cekDataSettings();
    console.log('initial penerapan');
});

$(document).on('click','.refreshConnection',function(e){
    cekKoneksi();
    console.log('initial refresh');
});