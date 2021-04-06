    let stateButton = true;
    function button1(){
        $('#Button2').addClass('increasing')
        

        setTimeout(function(){
            $('#Button2').removeClass("increasing");
        },400);
        
        if (stateButton == true){
            setTimeout(function(){   
                button1();
            },800);
        }
    }; 

    function button3(){
        stateButton = true;
        button1();
    }


    function button2(){
        stateButton = false;
    }

