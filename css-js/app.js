
    /** 
     *  Descrizione del Progetto: Applicazione per il Meteo con l'Api.
     * 
     *  Indice:
     *  
        * @function HandleLoadingPage - La funzione si occupa di caricare le possibili classi in apertura, durante il caricamento
        *  della pagina.
        * 
        * @function HandleFetchDataApi - La funzione si occupa di comunicare con l'Api sulla possibile estrazione di dati.
        * 
        * @function HandleTextWorkShow - La funzione si occupa di innettare le seguenti caratteristiche di ricerca, che servono attraverso l'api.
        * 
        * @function HandleKeyInputProgram - La funzione si occupa di estrarre i valori in input per la relativa chiamata api.
        * 
        * @function HandleWatherWorkIcon - La funzione si occupa della rappresentazione del meteo di ogni risultato, dettati dall'api.
     * 
     */

    //Rappresentazione in Pagina
    function HandleLoadingPage() {
        const result_show = document.querySelector('.result-show');
        const h4_text = document.getElementById('text-country');
        const img_box = document.querySelector('.img-rf');
        const uni_grad = document.getElementById('unit-grad');
        const text_temp = document.getElementById('text-temp');
        const info_bottom = document.querySelector('.info-bottom-info');
        const img_box_bt = document.querySelectorAll('.cn-img-bt');
        const text_hum = document.getElementById('text-hum');
        const text_wid = document.getElementById('text-wind');
        const window_warn_msg_box = document.getElementById("warn-ab-box");
        const window_warn_msg = document.getElementById("box-warn");
        const window_warn_btn = document.getElementById("btn-accepts");
        const window_api_search = document.getElementById("btn-api");

        window_warn_msg_box.classList.remove("none");
        window_warn_msg.classList.remove("none");

        //Evento di chiusura dell'evento
        window_warn_btn.onclick = ()=>{
            window_warn_msg.classList.add("none");
            window_warn_msg_box.classList.add("none");
        }

        //Evento di apertura e chiusura dell'evento
        window_api_search.onclick = ()=>{
        let window_api = document.getElementById("api-box");
            if (!window_api.classList.contains("none")) {
                window_api.classList.add("none");
            } else {
                window_api.classList.remove("none");
            }
        }

        //Evento di caricamento dell'applicazione
        setTimeout(()=>{
            result_show.classList.remove('placeholder-glow');
            h4_text.classList.remove('placeholder');
            img_box.classList.remove('placeholder');
            uni_grad.classList.remove('placeholder');
            text_temp.classList.remove('placeholder');
            info_bottom.classList.remove('placeholder-glow');
            img_box_bt[0].classList.remove('placeholder');
            img_box_bt[1].classList.remove('placeholder');
            text_hum.classList.remove('placeholder');
            text_wid.classList.remove('placeholder');
        },500)
    }

    //Raccolta del valore Input
    function HandleKeyInputProgram(){
        let search_value_api = document.getElementById("text-api-id");
        return search_value_api.value.trim();
    }

    //Interazione ed estrazione dei valori dall'api
    async function HandleFetchDataApi(){
        let err_box = document.getElementById('error-box');
        let key_api = HandleKeyInputProgram();
        const search_box = document.getElementById('search-box');
        const city_id = search_box.value;
        const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city_id}&appid=${key_api}`;
        let responde = await fetch(api_url);
        let data = await responde.json();
        try {
            let sta_weather = data.weather[0].main;
            let location_name = data.name;
            let wind_speed = data.wind.speed;
            let hum = data.main.humidity;
            let country_name = data.sys.country;
            let grad_unit = data.main.feels_like;
            HandleWatherWorkIcon(sta_weather);
            HandleTextWorkShow(location_name, country_name, grad_unit, wind_speed, hum);
        } catch (error) {
            let message_data = String(data.cod);
            err_box.style.opacity = '100';
            switch (message_data) {
                case "401":
                err_box.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i><p id="text-err">chiave errata.</p>`;
                break;

                case "404":
                err_box.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i><p id="text-err">risultato non esiste.</p>`;
                break;

                case "400":
                err_box.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i><p id="text-err">completa il campo di input.</p>`;
                break;
                
                default:
                err_box.style.opacity = '0';
                err_box.innerHTML = ``;
                break;
            }
            setTimeout(()=>{
                err_box.style.opacity = '0';
            }, 1000);
        }
    }

    //Funzione di rapresentazione dell'icona
    function HandleWatherWorkIcon(icon){
        let img_scroller = document.getElementById('scroller');
        let tp_text = document.getElementById('text-temp');
        let index_list = 0;
    const text_temp = ["Cielo sereno.", " è Nuvoloso.", "Sta Piovigginando.", "è Nebbia.", "è Pioggia.", "Sta Nevicando."];
        switch (icon) {
            case 'Snow':
            img_scroller.style.transform = 'translateY(-85%)';
            tp_text.textContent = text_temp[index_list = 5];
            break;

            case 'Rain':
            img_scroller.style.transform = 'translateY(-68%)';
            tp_text.textContent = text_temp[index_list = 4];
            break;

            case 'Mist':
            img_scroller.style.transform = 'translateY(-52%)';
            tp_text.textContent = text_temp[index_list = 3];
            break;

            case 'Dizzle':
            img_scroller.style.transform = 'translateY(-34%)';
            tp_text.textContent = text_temp[index_list = 2];
            break;
                
            case 'Clouds':
            img_scroller.style.transform = 'translateY(-18%)';
            tp_text.textContent = text_temp[index_list = 1];
            break;

            case 'Clear':
            img_scroller.style.transform = 'translateY(0%)';
            tp_text.textContent = text_temp[index_list = 0];
            break;
        
            default:
            img_scroller.style.transform = 'translateY(0%)';
            temp_text.temp_text = 'Non trovato.';
            break;
    }
    return icon_wh;
    }

    //Rappresentazione delle caratteristiche sul rilativo risultato di ricerca
    function HandleTextWorkShow(text_location, country_text, temp_text, wind_txt, hum_txt){
        let text_country = document.getElementById('text-country');
        let unit_temp_text = document.getElementById('unit-grad');
        let wind_text = document.getElementById('text-wind');
        let hum_text = document.getElementById('text-hum');
        text_country.textContent = text_location + ',  ' + country_text;
        unit_temp_text.textContent = Math.ceil(temp_text).toString().slice(0, 2) + ' °C';
        wind_text.textContent = wind_txt + ' Km/h';
        hum_text.textContent = hum_txt + ' %';
    }

    //Collegamento delle funzioni ai relativi eventi
    const Btn_src = document.getElementById('btn-src');
    Btn_src.addEventListener('click', HandleFetchDataApi);
    window.addEventListener('load', HandleLoadingPage);
    let btn_enter_api = document.getElementById("btn-api-cof");
    btn_enter_api.addEventListener("click", HandleKeyInputProgram)
