$(function() {

    Canvas = function(id) {
        this.canvas   = document.getElementById( id );
        this.context  = this.canvas.getContext('2d');
        this.alto     = this.canvas.height;
        this.ancho    = this.canvas.width;

        //Valores del texto
        this.context.font           = '30px Calibri';
        this.context.fillStyle      = 'white';
        this.context.textAlign      = 'right';
        this.context.textBaseline   = 'middle';
        this.puntoInicioX           = 1;
        this.puntoInicioY           = 1;

        this.limpiarCanvas = function(){
            this.context.clearRect(0, 0, this.ancho, this.alto);   
        };

    };

    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback);
        };
    })();

    Punto = function(){
        this.posX       = Math.floor((Math.random() * juego.ancho) + 1);
        this.posY       = Math.floor((Math.random() * juego.alto) + 1);
        this.radio      = juego.alto/20;
        this.reduccion  = juego.alto/2000;
        this.maximo     = juego.alto/10;
        this.puntos     = 100;
    };

    canvasExiste = function(id){
        return $(id).size() > 0;
    };

     Sprite = function(options) {          
        var that = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1,
            enMovimiento = true;

        that.loop = options.loop;
        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        // Pintamos la animacion
        that.pintar = function() {
            that.context.clearRect(0, 0, that.width*2, that.height*2);

            that.context.drawImage(
               that.image,
               frameIndex * that.width / numberOfFrames,
               0,
               that.width / numberOfFrames,
               that.height,
               0,
               0,
               that.width / numberOfFrames,
               that.height);
        };

        that.update = function() {
            tickCount++;
                
            if (tickCount > ticksPerFrame) {

                if (frameIndex < numberOfFrames - 1) {
                    frameIndex += 1; 
                } else if (that.loop) {
                    frameIndex = 0;
                }
                that.pintar();

                tickCount = 0;
            }
        }; 

        that.parar = function(){
            enMovimiento = false;
        };

        that.iniciar = function(){
            enMovimiento = true;
        };

        that.gameLoop = function() {
            if(enMovimiento){
                window.requestAnimationFrame(that.gameLoop);
            }
            that.update();
        };

        return that;
    };

});