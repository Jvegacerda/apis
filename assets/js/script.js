let myChart


const handleClick = async () => {
    const select = document.querySelector("#divisa")
    const dinero = document.querySelector("#pesos")


    // confirmar que tenga numeros y que no sean negativos //
    if (!dinero.value) {
        alert ("Complete los campos antes de continuar");
        return;
        }
    if ((dinero.value) < 0) {
        alert("El valor ingresado no puede ser negativo");
        return;
        }

    async function getDatos() {
        try {
            // obtener error cambiando url api por apo //
            const url = 'https://mindicador.cl/api/' + select.value;
            const res = await fetch(url)
            const data = await res.json()

            const info = data.serie.slice(0, 10).reverse()
            const etiquetas = info.map(day => day.fecha.split('T')[0])
            const valores = info.map(day => day.valor)

                    
            const conversion = dinero.value / valores[valores.length - 1]
            const conversion2 = Number(conversion).toFixed(2);
            //con conversion todos los decimales, conversion2 solo 2 por el toFixed//
            document.querySelector('#resultado').innerText = 'Resultado: $' + conversion2

            console.log('etiquetas', info.map(day => day.fecha.split('T')[0]))
            console.log('valores', valores)

            // Crear Grafico
            //(eliminar informacion de grafico si ya tiene una)
            if (myChart) {
                myChart.destroy();
            }


            const ctx = document.getElementById('myChart')


            const dataChart = {
                labels:etiquetas,
                datasets: [{
                    label: 'Variaciones moneda',
                    data:valores,
                    // bordercolor: "rgb(255, 255, 255)"
                }]
            }

            myChart = new Chart (ctx, {
                type: 'radar',
                data: dataChart,
            })


        } catch (e) {
            console.error('Error al obtener los datos:', e);

        // mostarr error en html //
        const errorSpan = document.createElement('span');
        errorSpan.innerHTML =`¡Algo Salio mal!     Error: ${e.message}`;
        document.body.appendChild(errorSpan);
        }
    }

await getDatos();

}

const searchButton = document.querySelector('#buscar')
searchButton.addEventListener('click', handleClick)