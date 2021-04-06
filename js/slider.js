$(document).ready(function () {
    var slider = $('#Slider');
    var siguiente = $('#btn-next');
    var anterior = $('#btn-prev');

    siguiente.on('click',function() {
        moverD();
    });

    anterior.on('click',function() {
        moverI();
    });

    $('#Slider li:last').insertBefore('#Slider li:first');

    slider.css('margin-left', '-'+100+'%');

    function moverD() {
        slider.animate ({
            marginLeft:'-'+200+'%'},700, function(){
            $('#Slider li:first').insertAfter('#Slider li:last')
            slider.css('margin-left','-'+100+'%');
            });
        
    }

    function moverI() {
        slider.animate ({
            marginLeft:'0'},700, function(){
            $('#Slider li:last').insertBefore('#Slider li:first')
            slider.css('margin-left','-'+100+'%');
            });
    }

    function autoplay(){
        interval = setInterval(function(){
            moverD();
        },5000);
    }
    
    autoplay();
})
