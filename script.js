document.addEventListener('DOMContentLoaded', () => {

    [cite_start]// --- Actividad 1: Descubre tu atuendo [cite: 1] ---
    [cite_start]const mamaDanzaOptions = ["Cushma", "Chumpi", "Sombrero blanco", "Pinkullu", "Bombo", "Huactana"]; [cite: 2]
    [cite_start]const wawaDanzaOptions = ["Chumpi", "Pollerín", "Alfanje", "Cascabeles", "Chanta", "Bandas"]; [cite: 2]

    // Combinar y duplicar Chumpi si es necesario para ambos (el anexo lo tiene en ambos)
    [cite_start]const allActivity1Options = ["Cushma", "Chumpi", "Sombrero blanco", "Pinkullu", "Bombo", "Huactana", "Pollerín", "Alfanje", "Cascabeles", "Chanta", "Bandas", "Chumpi"]; [cite: 2] // Added Chumpi twice as per source

    const dragOptionsContainer1 = document.getElementById('drag-options-activity1');
    const mamaDanzaDropArea = document.getElementById('mama-danza-drop-area');
    const wawaDanzaDropArea = document.getElementById('wawa-danza-drop-area');
    const checkButton1 = document.getElementById('check-activity1');
    const resetButton1 = document.getElementById('reset-activity1');
    const feedback1 = document.getElementById('feedback-activity1');

    function createDraggableItems1(options) {
        dragOptionsContainer1.innerHTML = ''; // Limpiar opciones anteriores
        // Shuffle options but maintain their original count for 'Chumpi' if duplicated
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        shuffledOptions.forEach(option => {
            const div = document.createElement('div');
            div.classList.add('draggable-item');
            div.setAttribute('draggable', true);
            div.textContent = option;
            div.dataset.value = option; // Almacenar el valor original
            dragOptionsContainer1.appendChild(div);
        });
    }

    createDraggableItems1(allActivity1Options);

    let draggedItem = null;

    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('draggable-item')) {
            draggedItem = e.target;
            e.dataTransfer.setData('text/plain', e.target.dataset.value);
            // Pequeño retardo para que el elemento se oculte después de que el navegador tome una "captura" para el arrastre
            setTimeout(() => {
                e.target.classList.add('hide');
            }, 0);
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('draggable-item')) {
            e.target.classList.remove('hide');
        }
    });

    [mamaDanzaDropArea, wawaDanzaDropArea].forEach(dropArea => {
        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault(); // Permitir la caída
        });

        dropArea.addEventListener('dragenter', (e) => {
            e.preventDefault();
            e.target.classList.add('hover');
        });

        dropArea.addEventListener('dragleave', (e) => {
            e.target.classList.remove('hover');
        });

        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            e.target.classList.remove('hover');
            if (draggedItem) {
                const droppedValue = draggedItem.dataset.value;
                const p = document.createElement('p');
                p.textContent = droppedValue;
                p.classList.add('dropped-item'); // Clase para estilizar/identificar
                e.target.appendChild(p);
                draggedItem.remove(); // Eliminar de las opciones originales
                draggedItem = null;
            }
        });
    });

    checkButton1.addEventListener('click', () => {
        let correctCount = 0;
        let totalItemsDropped = 0;

        const mamaDanzaDroppedItems = Array.from(mamaDanzaDropArea.querySelectorAll('.dropped-item')).map(el => el.textContent);
        const wawaDanzaDroppedItems = Array.from(wawaDanzaDropArea.querySelectorAll('.dropped-item')).map(el => el.textContent);

        // Crear copias de los arreglos de opciones correctas para poder "consumir" elementos
        let tempMamaDanzaOptions = [...mamaDanzaOptions];
        let tempWawaDanzaOptions = [...wawaDanzaOptions];

        // Verificar elementos de Mama Danza
        mamaDanzaDroppedItems.forEach(item => {
            totalItemsDropped++;
            const index = tempMamaDanzaOptions.indexOf(item);
            if (index > -1) {
                correctCount++;
                tempMamaDanzaOptions.splice(index, 1); // Remover para evitar doble conteo si un ítem correcto se suelta dos veces
            }
        });

        // Verificar elementos de Wawa Danza
        wawaDanzaDroppedItems.forEach(item => {
            totalItemsDropped++;
            const index = tempWawaDanzaOptions.indexOf(item);
            if (index > -1) {
                correctCount++;
                tempWawaDanzaOptions.splice(index, 1); // Remover para evitar doble conteo
            }
        });

        // Verificar si se han soltado todos los elementos correctos y no hay incorrectos
        if (correctCount === allActivity1Options.length && totalItemsDropped === allActivity1Options.length) {
            feedback1.textContent = "¡Excelente! Has descubierto los atuendos correctamente.";
            feedback1.style.color = "green";
        } else {
            feedback1.textContent = "Sigue intentándolo, ¡lo lograrás!";
            feedback1.style.color = "red";
        }
    });

    resetButton1.addEventListener('click', () => {
        // Mover los elementos de vuelta a las opciones arrastrables
        Array.from(mamaDanzaDropArea.querySelectorAll('.dropped-item')).forEach(item => {
            dragOptionsContainer1.appendChild(item);
            item.classList.remove('dropped-item'); // Quitar la clase de 'dropped-item'
        });
        Array.from(wawaDanzaDropArea.querySelectorAll('.dropped-item')).forEach(item => {
            dragOptionsContainer1.appendChild(item);
            item.classList.remove('dropped-item');
        });

        mamaDanzaDropArea.innerHTML = '';
        wawaDanzaDropArea.innerHTML = '';
        createDraggableItems1(allActivity1Options); // Regenerar y mezclar
        feedback1.textContent = '';
    });

    [cite_start]// --- Actividad 2: Crónica de los Danzantes del Sol [cite: 4] ---
    const storyBlanksData = [
        [cite_start]{ word: "Inti", translation: "Sol" }, [cite: 11]
        [cite_start]{ word: "Atuendo", translation: "Atuendo" }, [cite: 11]
        [cite_start]{ word: "Alfanje", translation: "Espada ritual" }, [cite: 11]
        [cite_start]{ word: "Tauna", translation: "Vara" }, [cite: 11]
        [cite_start]{ word: "Allpamama", translation: "Madre Tierra" }, [cite: 11]
        [cite_start]{ word: "Mama Danza", translation: "Mama Danza" }, [cite: 11]
        [cite_start]{ word: "Pinkullu", translation: "Flauta ritual" }, [cite: 11]
        [cite_start]{ word: "Bombo", translation: "Tambor" }, [cite: 11]
    ];
    const dragOptionsContainer2 = document.getElementById('drag-options-activity2');
    const blanks = document.querySelectorAll('#activity2 .blank');
    const checkButton2 = document.getElementById('check-activity2');
    const translateButton2 = document.getElementById('translate-activity2');
    const resetButton2 = document.getElementById('reset-activity2');
    const feedback2 = document.getElementById('feedback-activity2');

    function createDraggableItems2(options) {
        dragOptionsContainer2.innerHTML = '';
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        shuffledOptions.forEach(option => {
            const div = document.createElement('div');
            div.classList.add('draggable-item');
            div.setAttribute('draggable', true);
            div.textContent = option.word;
            div.dataset.value = option.word;
            div.dataset.translation = option.translation;
            dragOptionsContainer2.appendChild(div);
        });
    }

    createDraggableItems2(storyBlanksData);

    let draggedItem2 = null;

    document.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('draggable-item')) {
            draggedItem2 = e.target;
            e.dataTransfer.setData('text/plain', e.target.dataset.value);
            setTimeout(() => {
                e.target.classList.add('hide');
            }, 0);
        }
    });

    document.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('draggable-item')) {
            e.target.classList.remove('hide');
        }
    });

    blanks.forEach(blank => {
        blank.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        blank.addEventListener('dragenter', (e) => {
            e.preventDefault();
            e.target.classList.add('hover');
        });

        blank.addEventListener('dragleave', (e) => {
            e.target.classList.remove('hover');
        });

        blank.addEventListener('drop', (e) => {
            e.preventDefault();
            e.target.classList.remove('hover');
            // Solo permitir soltar si el espacio en blanco está vacío y si draggedItem2 no es null
            if (draggedItem2 && !e.target.textContent.trim()) {
                e.target.textContent = draggedItem2.dataset.value;
                e.target.classList.add('filled');
                e.target.dataset.droppedValue = draggedItem2.dataset.value; // Almacenar el valor soltado
                draggedItem2.remove(); // Eliminar de las opciones arrastrables
                draggedItem2 = null;
            }
        });
    });

    checkButton2.addEventListener('click', () => {
        let correctCount = 0;
        let totalBlanksFilled = 0;
        blanks.forEach(blank => {
            if (blank.dataset.droppedValue) { // Solo si se ha soltado algo
                totalBlanksFilled++;
                if (blank.dataset.droppedValue === blank.dataset.correct) {
                    blank.style.color = "green";
                    correctCount++;
                } else {
                    blank.style.color = "red";
                }
            } else {
                blank.style.color = "#000"; // Asegurarse de que los no llenados no cambien de color
            }
        });

        if (correctCount === blanks.length && totalBlanksFilled === blanks.length) {
            feedback2.textContent = "¡Felicidades! Has completado la crónica correctamente.";
            feedback2.style.color = "green";
        } else {
            feedback2.textContent = "Algunas respuestas son incorrectas o faltan. ¡Sigue intentándolo!";
            feedback2.style.color = "red";
        }
    });

    translateButton2.addEventListener('click', () => {
        [cite_start]let translationText = 'Traducción de términos:\n'; [cite: 11]
        storyBlanksData.forEach(item => {
            if (item.word !== item.translation) { // Solo mostrar si la traducción es diferente
                [cite_start]translationText += `\u2022 ${item.word} \u2192 ${item.translation}\n`; [cite: 11]
            } else {
                translationText += `\u2022 ${item.word}\n`; // Si son iguales, solo el término
            }
        });
        alert(translationText);
    });

    resetButton2.addEventListener('click', () => {
        blanks.forEach(blank => {
            blank.textContent = '';
            blank.classList.remove('filled');
            blank.style.color = "#000"; // Restablecer color de texto
            delete blank.dataset.droppedValue; // Borrar el valor soltado
        });
        createDraggableItems2(storyBlanksData); // Regenerar opciones arrastrables
        feedback2.textContent = '';
    });

    [cite_start]// --- Actividad 3: Raymis y Meses [cite: 13] ---
    const quizAnswers3 = document.querySelectorAll('#activity3 .quiz-answer');
    const checkButton3 = document.getElementById('check-activity3');
    const resetButton3 = document.getElementById('reset-activity3');
    const translateButton3 = document.getElementById('translate-activity3');
    const feedback3 = document.getElementById('feedback-activity3');

    checkButton3.addEventListener('click', () => {
        let allCorrect = true;
        quizAnswers3.forEach(select => {
            if (select.value === select.dataset.correct) {
                select.style.backgroundColor = "#e0ffe0"; // Verde claro para correcto
                select.style.borderColor = "#28a745";
            } else {
                select.style.backgroundColor = "#ffe0e0"; // Rojo claro para incorrecto
                select.style.borderColor = "#dc3545";
                allCorrect = false;
            }
        });

        if (allCorrect) {
            feedback3.textContent = "¡Muy bien! Todas las respuestas son correctas.";
            feedback3.style.color = "green";
        } else {
            feedback3.textContent = "Algunas respuestas son incorrectas. ¡Inténtalo de nuevo!";
            feedback3.style.color = "red";
        }
    });

    resetButton3.addEventListener('click', () => {
        quizAnswers3.forEach(select => {
            select.value = ""; // Restablecer a la opción por defecto
            select.style.backgroundColor = ""; // Limpiar color de fondo
            select.style.borderColor = "#b0d3ee"; // Restablecer color del borde
        });
        feedback3.textContent = '';
    });

    translateButton3.addEventListener('click', () => {
        // En esta actividad no se proporcionan términos Kichwa para traducir,
        // así que el botón de traducción mostrará un mensaje genérico o vacío.
        [cite_start]alert("Para esta actividad, no hay términos específicos para traducir al Kichwa."); [cite: 13]
    });

});