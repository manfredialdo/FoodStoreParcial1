// js/data.js
const categorias = [
    { id: "comida", nombre: "Comidas" },
    { id: "bebida", nombre: "Bebidas" },
    { id: "todos", nombre: "Ver Todo" } 
];

const menu = [
      {
        id: 1,
        titulo: "Choripán",
        descripcion: "un clásico argentino: pan, chorizo de cerdo y chimi.",
        precio: 1500,
        imagen: "assets/chori.jpg",
	categoria: "comida",
        alt: "el choripan es monton de tripas de chancho todas condimentadas picadas metidas dentro de otra tripa y despues todas cocidas .. caliente salido de la parri todo eso metido dentro de un pan blanco... si te da la gana hay aderezo...",
        title: "el chori de la casa"
      },
      {
        id: 2,
        titulo: "Empanada",
        descripcion: "Empanada salteña de carne cortada a cuchillo, frita y a leña.",
        precio: 800,
        imagen: "assets/empanada.jpg",
	categoria: "comida",
        alt: "la empanada es ese tesoro de masa dorada, horneada o frita en grasa caliente hasta que burbujea... y q adentro guarda un corazón con carne cortada a cuchillo, mucha cebolla rehogada, morron y un juguito que se te corre por entre el brazo y si no abrís bien las piernas podes mancharte... es el resumen de la felicidad envuelto en un repulgue artesanal...",
        title: "la empanada de la casa, con carne cortada a cuchillo"
      },
      {
        id: 3,
        titulo: "vino con soda",
        descripcion: "vino, soda y adentro.",
        precio: 2500,
        imagen: "assets/visoda.jpg",
	categoria: "bebida",
        alt: "el vino con soda es ese tinto en caja, fuerte y con cuerpo, que se doma con el golpe de burbujas del sifón bien frío... es el refresco de los dioses del barrio, servido en vaso de vidrio grueso con un par de hielos que tintinean mientras esperás el asado... es un equilibrio entre la uva madura y el gas que te raspa la garganta justo como tiene que ser...",
        title: "vino con soda, un clasico"
      },

    {
        id: 4,
        titulo: "Vino en Damajuana",
        descripcion: "Tinto noble en envase familiar. Ideal para compartir.",
        precio: 38500,
        imagen: "./assets/vino.jpg",
        categoria: "bebida",
        alt: "ese envase de vidrio verde forrado en mimbre es para valientes, guarda litros de un tinto áspero, se toma sin muchas vueltas y alegra la existencia mientras te bajás media vaca....",
        title: "Vino en damajuana, para la mesa grande"
    },
    {
        id: 5,
        titulo: "Milanesa con Fritas",
        descripcion: "Milanesa de nalga XL con papas fritas caseras.",
        precio: 4200,
        imagen: "./assets/milacfrita.jpg",
        categoria: "comida",
        alt: "pedazo de carne envuelto en pan rallado, con un montón de papas fritas nadando en aceite para que te olvides de la dieta...",
        title: "Milanesa con fritas, el clásico que no falla"
    }
];