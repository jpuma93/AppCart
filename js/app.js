//Variables
const cart = document.querySelector('#carrito');
const containerCart = document.querySelector('#lista-carrito tbody');
const clearCartBtn = document.querySelector('#vaciar-carrito');
const listCourses = document.querySelector('#lista-cursos');

let coursesCart = [];

loadEventsListeners();
function loadEventsListeners() {
    listCourses.addEventListener('click', addCourse);
    cart.addEventListener('click', removeCourse);
    clearCartBtn.addEventListener('click', function () {
        coursesCart = [];
        clearHTML();
    });
}

//funciones
function addCourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const courseSelected = e.target.parentElement.parentElement;
        readDataCourse(courseSelected);
    }
}

function removeCourse(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const id = e.target.getAttribute('data-id');
        coursesCart = coursesCart.filter((course) => course.id !== id);
        cartHTML();
    }
}

function readDataCourse(course) {
    const infoCourse = {
        id: course.querySelector('a').getAttribute('data-id'),
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.precio span').textContent,
        quantity: 1
    };

    const existe = coursesCart.some((course) => course.id == infoCourse.id);

    if (existe) {
        const courses = coursesCart.map((course) => {
            if (course.id === infoCourse.id) {
                course.quantity++;
                return course;
            } else {
                return course;
            }
        });
        coursesCart = [...courses];
    } else {
        coursesCart = [...coursesCart, infoCourse];
    }

    cartHTML();
}

function cartHTML() {
    clearHTML();
    coursesCart.forEach((course) => {
        const { id, image, title, price, quantity } = course;
        const row = document.createElement('tr');
        row.innerHTML = `
            <th>
                <img src="${image}" width="100" height="100">
            </th>
            <th>${title}</th>
            <th>${price}</th>
            <th>${quantity}</th>
            <th>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </th>
        `;
        containerCart.appendChild(row);
    });
}

function clearHTML() {
    while (containerCart.firstChild) {
        containerCart.removeChild(containerCart.firstChild);
    }
}
