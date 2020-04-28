class Person{

    h = 0;
    s = 25;
    b = 100;

    similarity = 0;
    value = 0;

    img = null;
    p5 = null;

    constructor(p5, x, y, radius, data, h_color, img){
        this.radius = radius;
        this.data = data;
        this.h = h_color;
        this.img = img;

        this.p5 = p5;

        //posición base de refetencia, la incial
        this.base_pos = this.p5.createVector(x, y);

        // posición inicial de la persona
        this.pos = this.p5.createVector(x, y);

        //rotación que debe tener
        this.rotation = getRandom(0, 360);
    }

    show(){
        this.p5.fill(this.h, this.s, this.b);
        this.p5.ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
        
        this.p5.text(this.data.Nombre, this.pos.x, this.pos.y+this.radius+10);
        this.p5.noFill();

        if(this.img != null){
            this.p5.image(this.img, this.pos.x, this.pos.y, this.radius*1.8, this.radius*1.8);
        }
    }

    update(similarity, max_distance){
        this.similarity = similarity;

        //el valor máximo que puede tomar en el gráfico, el borde
        let max_value = max_distance;

        // se invierte el valor para que los más similares se acerquen al principal
        let inverse_similarity = Math.abs(this.similarity - 1);

        //se multiplica el valor por el máximo que puede tomar/ que tan alejado debe estar 
        this.value = max_value * inverse_similarity;
        
        // se crea un nuevo vector que aumenta según ese valor nuevo
        this.valuePos = this.p5.createVector(0, this.value);

        //se rota con el mismo valor inicial, para que no cambie a diferentes rotaciones cada vez
        this.valuePos.rotate(this.rotation);

        // copiar el vector de la posición báse para no cambiar su valor
       this.copy_base_pos = this.base_pos.copy();

        // se le agrega a la posición el nuevo vector calculado con el valor de similitud
       this.pos = this.copy_base_pos.add(this.valuePos);

       
    }
}

// random que retorna no enteros
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}