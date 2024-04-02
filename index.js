function podaciForme(){
    let ocena = document.querySelector('[name="ocena"]');
    let datumIzlaska=document.querySelector('[name="datum"]');
    let brojIndeksa=document.querySelector('[name="broj-indeksa"]');
    let rok=document.querySelector('[name="rok"]');
    let redniBrojIzlaska=document.querySelector('[name="br-izlaska-na-ispit"]');
    let polozen=document.querySelector('[name="polozio"]');
    let greske={};

    console.log("Ocena:"+ ocnea.value);
    console.log("Datum izalska:"+datumIzlaska.value);
    console.log("Broj indeksa: "+ brojIndeksa.value);
    console.log("Rok: "+ rok.value);
    console.log("Redni broj izlaska: "+ redniBrojIzlaska.value);
    console.log("Polozen: "+ polozen.value);

    //Validacija ocene
    let vrednostOcene=parseInt(ocena.value);
    if(isNaN(vrednostOcene) || vrednostOcene<5 || vrednostOcene>10)
        greske.ocena="Ocena mora biti u rasponu od 5 do 10";

    //Validacija datuma izlaska
    let datum= new Date(datumIzlaska.value);
    if(isNaN(datum.getTime))
        greske.datum="Datum izlaska ns ispit je neisparavn";

    //Validacija brojaIndeksa
    let [godinaStr, brojStr] = brojIndeksa.value.split('/');
    let godina=parseInt(godinaStr);
    let broj=parseInt(brojStr);
    if(isNaN(godina) ||godina<=2000 )
        greske.brojIneksa="Godina mora biti veca od 2000";
    if(isNaN(broj) || broj<1 || broj>1000)
        greske.brojIndeksa="Broj indeksa mora biti 1-1000";

    //Validacija checkbox-a "polozen" ako je ocena 6-10
    if(vrednostOcene>=6 && vrednostOcene<=10){
        if(!polozen.checked)
            polozen.checked=true; //Oznacimo checkbox "polozen" ako nije vec oznacen
    }

    //Prikaz gresaka
    for(let polje in greske){
        let greskaElement=document.createElement('span'); //pravi novi html elem koji ce prikazati text greske
        greskaElement.textContent=greske[polje]; //Tekst unutar stvorenog <span> elementa postavlja se na vrednost greške za odgovarajuće polje
        greskaElement.style.color='red';
        let labelElement=document.querySelector(`label[for="${polje}"]`); //Pronalazi se HTML element <label> koji je povezan s poljem ili elementom forme putem atributa for, gdje je polje ime polja za koje postoji greška
        labelElement.insertAdjacentElement('afterend', greskaElement); // Dodaje se stvoreni <span> element (koji sadrži tekst greške) nakon <label> elementa povezanog s poljem za koje postoji greška
    }

    //Provera da li ima gresaka
    if(Object.keys(greske).length==0){
        //Formiranje JSON objekta ako su svi podaci validni
        let podaci={
            ocena: vrednostOcene,
            datumIzlaska: datumIzlaska.value,
            brojIndeksa: brojIndeksa.value,
            rok: rok.value,
            polozen: polozen.checked
        };
        return JSON.stringify(podaci);
    }
    else{
        return JSON.stringify(greske);
    }
}

document.addEventListener('DOMContentLoader',function(){
    //Dodavanje reference na dugme "Posalji"
    let dugmePosalji=document.getElementById('#posalji');

    //Dohvatanje event listener-a za klik na dugme 'Posalji'
    dugmePosalji.addEventListener('click',function(){
        //Pozivanje funkcije podaciForme() i dobijanje njenog rezultata
        let rezultat=podaciForme;

         // Ako rezultat nije prazan string, prikaži ga u textarea elementu
         if(rezultat!=' '){
            let ispisPodatakaTextarea=document.getElementById('#ispis');
            ispisPodatakaTextarea.value=rezultat;
         }

          // Resetovanje vrednosti polja forme na podrazumevane vrednosti
          document.querySelector('form').reset();

           // Sklanjanje svih gresaka ispod polja forme
           let sveGreske = document.querySelectorAll('span');
        sveGreske.forEach(function(greska) {
            greska.remove();
        });
    });
});
