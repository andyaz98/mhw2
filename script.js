/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function addChoice(event) {
    //Memorizzo il checkbox che è stato cliccato 
    const chosenBox = event.target;

    //Il valore dell' elemento della mappa avente come chiave lo stesso id domanda di quella che è stata scelta viene posto uguale 
    //all' id della risposta scelta, cioè choiceId
    choices[chosenBox.parentNode.dataset.questionId] = chosenBox.parentNode.dataset.choiceId;
    console.log(choices);

    //Aggiorno la UI, tenendo conto delle informazioni presenti nella mappa
    update();
}

function update() {
    //Per ogni checkbox
    for (let choice of checkboxesList) {

        //Se il contenitore di quel checkbox ha come attributo questionId=one e se è stata selezionata una risposta a quella domanda...
        if (choice.parentNode.dataset.questionId == 'one' && choices.one != null) {

            //Se quel checkbox corrisponde a ciò che l' utente ha scelto, cioè se il suo contenitore 
            //ha lo stesso choiceId di quello salvato nella mappa per la domanda 1
            if (choice.parentNode.dataset.choiceId == choices.one) {

                //Allora, metto la spunta al checkbox e cambio il suo stile al suo contenitore in base alle specifiche date
                choice.src = 'images/checked.png';
                choice.parentNode.classList.remove('unchecked');
                choice.parentNode.classList.add('checked');
            }

            //Se non corrisponde, allora tolgo la spunta al checkbox, perchè l'utente potrebbe avere modificato la sua scelta,
            //inoltre, cambio lo stile del contenitore, rendendolo semitrasparente. Così facendo, tutte le altre risposte 
            //non scelte della domanda 1 verranno rese semitrasparenti
            else {
                choice.src = 'images/unchecked.png';
                choice.parentNode.classList.remove('checked');
                choice.parentNode.classList.add('unchecked');
            }
        }

        //Procedimento analogo per questionId=two
        if (choice.parentNode.dataset.questionId == 'two' && choices.two != null) {
            if (choice.parentNode.dataset.choiceId == choices.two) {
                choice.src = 'images/checked.png';
                choice.parentNode.classList.remove('unchecked');
                choice.parentNode.classList.add('checked');
            }
            else {
                choice.src = 'images/unchecked.png';
                choice.parentNode.classList.remove('checked');
                choice.parentNode.classList.add('unchecked');
            }
        }

        //Procedimento analogo per questionId=three
        if (choice.parentNode.dataset.questionId == 'three' && choices.three != null) {
            if (choice.parentNode.dataset.choiceId == choices.three) {
                choice.src = 'images/checked.png';
                choice.parentNode.classList.remove('unchecked');
                choice.parentNode.classList.add('checked');
            }
            else {
                choice.src = 'images/unchecked.png';
                choice.parentNode.classList.remove('checked');
                choice.parentNode.classList.add('unchecked');
            }
        }

        //Lo script eseguirà questa parte di codice solo se è stato cliccato il bottone per riavviare il quiz
        //Infatti, la UI verrà riportata allo stato iniziale
        if (choices.one == null && choices.two == null && choices.three == null) {
            choice.src = 'images/unchecked.png';
            choice.parentNode.classList.remove('checked');
            choice.parentNode.classList.remove('unchecked');
        }
    }

    //Se l'utente ha risposto a tutte le 3 domande, rimuovo l' event listener al click dei checkboxes
    if (choices.one != null && choices.two != null && choices.three != null) {
        for (let choice of checkboxesList) {
            choice.removeEventListener('click', addChoice);
        }
        //Determino il risultato del quiz secondo le specifiche date
        compareChoices();
    }
}

function compareChoices() {

    //Definisco due variabili che contengono le informazioni da mostrare all' utente al completamento del quiz
    let title;
    let content;

    //Se almeno due risposte sono uguali, il risultato del quiz corrisponde ad esse
    if (choices.one == choices.two) {
        title = RESULTS_MAP[choices.one]['title'];
        content = RESULTS_MAP[choices.one]['contents'];
    }
    else if (choices.two == choices.three) {
        title = RESULTS_MAP[choices.two]['title'];
        content = RESULTS_MAP[choices.two]['contents'];
    }
    else if (choices.one == choices.three) {
        title = RESULTS_MAP[choices.one]['title'];
        content = RESULTS_MAP[choices.one]['contents'];
    }

    //Se sono tutte diverse, allora il risultato del quiz corrisponde alla risposta alla prima domanda
    else {
        title = RESULTS_MAP[choices.one]['title'];
        content = RESULTS_MAP[choices.one]['contents'];
    }

    //Mostro i risultati all' utente
    showResult(title, content);
}



function showResult(title_text, content_text) {

    //Creo quattro nuovi HTML items: <section class="results">, <button>, <h1>, <div>
    const article_section = document.createElement('section');
    article_section.classList.add('results');
    const reset_button = document.createElement('button');
    const title = document.createElement('h1');
    const article_section_div = document.createElement('div');


    //Seleziono l' elemento HTML <article> e gli inserisco l' elemento <section class="results"> come figlio
    const article = document.querySelector('article');
    article.appendChild(article_section);

    //Inserisco gli elementi <h1>, <div>, <button> come figli di <section class="results"> e definisco il testo da visualizzare all'utente
    article_section.appendChild(title);
    article_section.appendChild(article_section_div);
    article_section.appendChild(reset_button);
    title.textContent = title_text;
    article_section_div.textContent = content_text;
    reset_button.textContent = 'Ricomincia il quiz';

    //Aggiungo l'event listener al bottone che comporta il riavvio del quiz
    reset_button.addEventListener('click', restart);
}

function restart(event) {

    //Rimuovo l'event listener al bottone
    event.target.removeEventListener('click', restart);

    //Inizializzo tutti i valori presenti nella mappa 
    for (let choice in choices) {
        choices[choice] = null;
    }

    //Rimuovo gli elementi HTML che mostravano il risultato del quiz, cioè <section class="results">
    const article = document.querySelector('article');
    const article_section = document.querySelector('article .results');
    article.removeChild(article_section);

    //Ri-aggiungo l' event listener al click dei checkboxes
    for (let choice of checkboxesList) {
        choice.addEventListener('click', addChoice);
    }

    //Aggiorno la UI
    update();
}


//Seleziono tutti i checkboxes in HTML
const checkboxesList = document.querySelectorAll('.checkbox');

//Definisco una mappa per tenere traccia delle scelte effettuate dall' utente per ogni domanda
const choices = {
    one: null,
    two: null,
    three: null
}

//Aggiungo l' event listener al click dei checkboxes
for (let choice of checkboxesList) {
    choice.addEventListener('click', addChoice);
}















