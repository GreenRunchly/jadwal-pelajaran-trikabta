        $(document).on('click','.hapus',function(e){
            e.preventDefault();
            var iddata = $(this).attr('iddata');
            var aim = $(this).attr('aim');
            $.post("hapus-data.php",
            {
                q: iddata
            },
            function(data, status){
                console.log(data);
                if (data == 'Done'){
                    $("#"+aim).remove();
                }else{
                    window.alert('Cannot remove! - '+data);
                }
            });
        });

        $(document).on('click','.drawer',function(e){
            var idnya = $(this).attr("drawer");
            var has = $("#"+idnya).hasClass('on');
            
            $(".drawerChild").addClass("off");
            $(".drawerChild").removeClass("on");            

            if (has == true){
                $("#"+idnya).addClass("off");
                $("#"+idnya).removeClass("on");
                console.log('off');
            }else{
                $("#"+idnya).addClass("on");
                $("#"+idnya).removeClass("off");
                console.log('on');  
            }
        });