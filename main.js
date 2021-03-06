//input de seleccionar persona
let select_element = document.getElementById("select_users");

//inputs de cambio de valores
let input_Edad = document.getElementById("form_user_Edad");
let input_Peso = document.getElementById("form_user_Peso");
let input_Altura = document.getElementById("form_user_Altura");
let input_Mascotas = document.getElementById("form_user_Mascotas");

//value of each magnitud
let value_Edad = 0;
let value_Peso = 0;
let value_Altura = 0;
let value_Mascotas = 0;

//mayores valores de la base de datos

let mayorEdad;
let mayorAltura;
let mayorPeso;
let mayorMascotas;

//min valores de la base de datos
let minEdad;
let minAltura;
let minPeso;
let minMascotas;

//titulos para mostrar el valor de los inputs
let title_Edad = document.getElementById("title_user_Edad");
let title_Peso = document.getElementById("title_user_Peso");
let title_Altura = document.getElementById("title_user_Altura");
let title_Mascotas = document.getElementById("title_user_Mascotas");

/** READ DATA CSV */
let data = Papa.parse('./data.csv', {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function (results) {
        console.log(results);
        data = results.data;
        createList(data);

        //metodo para ordenar datos para ssacar minimos y maximos
        ordenarDatos();

        //una vez leido los datos, creo el canvas
        //p5(mi codigo canvas, el contenedor del canvas)
        p5_canvas = new p5(canvas_object, canvas_container)


    }
});

function createList(users) {
    // llenar el filtro de selección de usuarios
    for (let index = 0; index < users.length; index++) {
        const u = users[index];
        u.id = index;
        let option = new Option(u.Nombre, index);
        select_element.options.add(option);
    }
}

//sacar mayor edad


select_element.addEventListener("change", (e) => {
    //resetaer los sliders
    input_Edad.value = 1;
    input_Peso.value = 1;
    input_Altura.value = 1;
    input_Mascotas.value = 1;

    value_Edad = 1;
    value_Peso = 1;
    value_Altura = 1;
    value_Mascotas = 1;

    title_Edad.innerHTML = 1;
    title_Peso.innerHTML = 1;
    title_Altura.innerHTML = 1;
    title_Mascotas.innerHTML = 1;

    // seleccionar la persona principal en el canvas de P5
    p5_canvas.selectPerson(e.target.value);
});

// cuando cambie un valor de los inputs, que actualice el canvas
input_Edad.addEventListener("mousemove", (e) => {
    // set value and visible title
    value_Edad = e.target.value;
    title_Edad.innerHTML = e.target.value;

    // update the similarity value in canvas
    p5_canvas.updatePeople();

});

input_Peso.addEventListener("mousemove", (e) => {
    // set value and visible title
    value_Peso = e.target.value;
    title_Peso.innerHTML = e.target.value;

    // update the similarity value in canvas
    p5_canvas.updatePeople();

});

input_Altura.addEventListener("mousemove", (e) => {
    // set value and visible title
    value_Altura = e.target.value;
    title_Altura.innerHTML = e.target.value;

    // update the similarity value in canvas
    p5_canvas.updatePeople();
});

input_Mascotas.addEventListener("mousemove", (e) => {
    // set value and visible title
    value_Mascotas = e.target.value;
    title_Mascotas.innerHTML = e.target.value;

    // update the similarity value in canvas
    p5_canvas.updatePeople();
});

/** SIMILARITY OPERATIONS */

function operacion(a, b) {

    //definir nombre variables de las personas
    let vA = { Edad: 0, Altura: 0, Peso: 0, Mascotas: 0 };

    let vB = { Edad: 0, Altura: 0, Peso: 0, Mascotas: 0 };

    //aqui vamos a multiplicar los valores de los sliders por la caracteristica de la persona A
    vA.Edad = (value_Edad * (a.Edad - minEdad)) / mayorEdad;

    vA.Peso = (value_Peso * (a.Peso - minPeso)) / mayorPeso;

    vA.Altura = (value_Altura * (a.Altura - minAltura)) / mayorAltura;

    vA.Mascotas = (value_Mascotas * (a.Mascotas - minMascotas)) / mayorMascotas;

    //aqui vamos a multiplicar los valores de los sliders por la caracteristica de la persona B
    vB.Edad = (value_Edad * (b.Edad - minEdad)) / mayorEdad;

    vB.Peso = (value_Peso * (b.Peso - minPeso)) / mayorPeso;

    vB.Altura = (value_Altura * (b.Altura - minAltura)) / mayorAltura;

    vB.Mascotas = (value_Mascotas * (b.Mascotas - minMascotas)) / mayorMascotas;



    var propunto = (vA.Edad * vB.Edad) + (vA.Peso * vB.Peso) + (vA.Altura * vB.Altura) + (vA.Mascotas * vB.Mascotas);
    //console.log(propunto);

    var magnitud_A = Math.sqrt((Math.pow(vA.Edad, 2)) + (Math.pow(vA.Peso, 2)) + (Math.pow(vA.Altura, 2)) + (Math.pow(vA.Mascotas, 2)));
    var magnitud_B = Math.sqrt((Math.pow(vB.Edad, 2)) + (Math.pow(vB.Peso, 2)) + (Math.pow(vB.Altura, 2)) + (Math.pow(vB.Mascotas, 2)));

    let magnitud = magnitud_B * magnitud_A;
    //console.log(magnitud);

    var res = propunto / magnitud;
    //console.log(res);

    return res;
}

function ordenarDatos() {

let arregloTemp= [...data];

arregloTemp= arregloTemp.sort(compararEdad);


mayorEdad= arregloTemp[0].Edad;
minEdad= arregloTemp[arregloTemp.length -1].Edad;


arregloTemp= arregloTemp.sort(compararPeso);

mayorPeso= arregloTemp[0].Peso;
minPeso= arregloTemp[arregloTemp.length -1].Peso;


arregloTemp= arregloTemp.sort(compararAltura);

mayorAltura= arregloTemp[0].Altura;
minAltura= arregloTemp[arregloTemp.length -1].Altura;


arregloTemp= arregloTemp.sort(compararMascotas);

mayorMascotas= arregloTemp[0].Mascotas;
minMascotas= arregloTemp[arregloTemp.length -1].Mascotas;

}

function compararMascotas(a, b) {
    return b.Mascotas - a.Mascotas;
}

function compararEdad(a, b) {
    return b.Edad - a.Edad;
}


function compararPeso(a, b) {
    return b.Peso - a.Peso;
}

function compararAltura(a, b) {
    return b.Altura - a.Altura;
}



/** CANVAS - p5.js **/

//contenedor del canvas
let canvas_container = document.getElementById("canvas");


canvas_container.style.width = canvas_container.clientHeight + "px";

//código del canvas
let canvas_object = function (p5) {
    //variables del tamaño del canvas
    let canvas_width = canvas_container.clientWidth;
    let canvas_height = canvas_container.clientHeight;

    //tamaños de circulos segun el tamaño de el canvas
    let person_radius = canvas_width / 40;
    let mainperson_radius = canvas_width / 35;

    //max range of the inretaction radius
    let circle_limit = canvas_width / 2.1;

    //los colores son hsb, estos corresponden a una h. Por ejemplo, 0 es rojo, 120 es verde, etc
    let person_color = 49;
    let mainperson_color = 234;

    let people = [];
    let people_img = [];
    let main_person = null;

    let imgFondo;



    p5.preload = function () {
        //se cargan las imagenes en el pre load y se pasan de parametros para no estar cargandolas a cada rato, solo 1 vez antes de inicair todo
        for (let index = 0; index < data.length; index++) {
            people_img[index] = p5.loadImage(`./src/img/${index}.png`);
        }
        imgFondo = p5.loadImage(`./src/img/fondo.png`);

    }

    p5.setup = function () {
        p5.createCanvas(canvas_width, canvas_height);
        p5.noStroke();

        //colores hsb (h, s, b, opacidad)
        p5.colorMode(p5.HSB, 360, 100, 100, 1);

        //modo de angulos en grados y no radianes
        p5.angleMode(p5.DEGREES);

        //imagenes alineadas al centro
        p5.imageMode(p5.CENTER);

        //textos alineados al centro
        p5.textAlign(p5.CENTER, p5.CENTER);
    }

    p5.draw = function () {
        //cambiar el color de fondo
        //si se quiere blanco, la saturación debe ser 0, en cualquier color y brillo 100
        //p5.background(0, 0, 100);

        p5.image(imgFondo, canvas_width / 2, canvas_height / 2);



        //circulo del fondo
        p5.noFill();
        p5.stroke(234, 34, 77, 0.8);
        p5.strokeWeight(4);
        p5.ellipse(canvas_width / 2, canvas_height / 2, circle_limit * 2, circle_limit * 2);
        p5.ellipse(canvas_width / 2, canvas_height / 2, circle_limit * 1.5, circle_limit * 1.5);
        p5.ellipse(canvas_width / 2, canvas_height / 2, circle_limit, circle_limit);
        p5.noStroke();

        //pintar todas las personas
        for (let index = 0; index < people.length; index++) {
            const p = people[index];
            //console.log(p);
            p.show();
        }

        //pintar persona principal, escogida
        if (main_person != null) {
            main_person.show();
        }
    }

    p5.updatePeople = function () {
        //calcular la similitud de cada uno respecto al escogido
        for (let index = 0; index < people.length; index++) {
            const p = people[index];

            if (main_person != null) {
                let similitud_temp = operacion(main_person.data, p.data);
                // update(similitud, distancia máxima)
                p.update(similitud_temp, circle_limit);
            }
        }
    }

    p5.selectPerson = function (index_user) {
        //index_user es el indice de la persona que se escogió
        let selected_person = data[index_user];

        people = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            // Person(p5, x, y, radius, data, h_color, img);
            let p = new Person(p5, canvas_width / 2, canvas_height / 2, person_radius, element, person_color, people_img[index]);
            people.push(p);
        }

        // Person(p5, x, y, radius, data, h_color, img);
        main_person = new Person(p5, canvas_width / 2, canvas_height / 2, mainperson_radius, selected_person, mainperson_color, people_img[index_user]);

        //elimiar la persona principal escogida de la lista
        people.splice(index_user, 1);

        // actualziar los valores de similitud de las personas
        this.updatePeople();
    }

    p5.windowResized = function () {
        canvas_width = canvas_container.clientWidth;
        canvas_height = canvas_container.clientHeight;

        p5.resizeCanvas(canvas_width, canvas_height);
    };
};




//agregar el código del canvas al contenedor del canvas.
//Si desde afuera se usará un método del canvas, se deben llamar desde este objeto p5_canvas
//let p5_canvas = new p5(canvas_object, canvas);
let p5_canvas;

/** UTILS */

//random que retorna enteros
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// random que retorna no enteros
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

/** LISTENERS & EVENTS */

function OnLoadPage() {
    // valor de las maginitudes
    value_Edad = input_Edad.value;
    value_Peso = input_Peso.value;
    value_Altura = input_Altura.value;
    value_Mascotas = input_Mascotas.value;

    //update the value of input title
    title_Edad.innerHTML = value_Edad;
    title_Peso.innerHTML = value_Peso;
    title_Altura.innerHTML = value_Altura;
    title_Mascotas.innerHTML = value_Mascotas;
}

window.onload = OnLoadPage;