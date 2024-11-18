let preguntas = [];

function cargarPreguntas() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = ""; // Limpia el contenedor

    fetch('data.json') // Carga las preguntas desde el archivo JSON
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            preguntas = data.map(pregunta => ({
                titulo: pregunta.titulo,
                opciones: pregunta.opciones,
                correcta: pregunta.correcta
            }));

            shuffle(preguntas); // Mezcla las preguntas

            preguntas.forEach((pregunta, index) => {
                const preguntaDiv = document.createElement("div");
                preguntaDiv.classList.add("pregunta-container");

                const titulo = document.createElement("h2");
                titulo.textContent = `${index + 1}. ${pregunta.titulo}`;
                preguntaDiv.appendChild(titulo);

                const opcionesList = document.createElement("ul");
                opcionesList.classList.add("opciones");

                const opciones = [...pregunta.opciones];
                shuffle(opciones);

                opciones.forEach(opcion => {
                    const li = document.createElement("li");
                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = `pregunta-${index}`;
                    input.value = opcion.id;
                    input.id = `pregunta-${index}-${opcion.id}`;

                    const label = document.createElement("label");
                    label.htmlFor = input.id;
                    label.textContent = opcion.texto;

                    li.appendChild(input);
                    li.appendChild(label);
                    opcionesList.appendChild(li);
                });

                preguntaDiv.appendChild(opcionesList);
                quizContainer.appendChild(preguntaDiv);
            });
        })
        .catch(error => {
            console.error("Error al cargar el archivo JSON:", error);
        });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkAnswers() {
    let score = 0;
    preguntas.forEach((pregunta, index) => {
        const respuestaSeleccionada = document.querySelector(`input[name="pregunta-${index}"]:checked`);
        if (respuestaSeleccionada && respuestaSeleccionada.value === pregunta.correcta) {
            score++;
        }
    });

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.textContent = `Has acertado ${score} de ${preguntas.length} preguntas.`;
}

// Inicializa el cuestionario
cargarPreguntas();
