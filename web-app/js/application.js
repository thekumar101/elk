


function callajax(){
        $.ajax({
            url: "/Hackovation/data/analytics",
            type:"post",
            dataType: 'json',
//          data:{ids:JSON.stringify(idList), option:option, id:id}
            success: function(data) {
                console.log(data);
                alert(data)//<-----this logs the data in browser's console
            },
            error: function(xhr){
                alert(xhr.responseText); //<----when no data alert the err msg
            }
        });
    }
