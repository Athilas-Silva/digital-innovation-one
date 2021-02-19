//Código que faz o carrosel funcionar
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false, //true adiciona botoes para navegar
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})