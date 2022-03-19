import LinkFuncPai from "../company/LinkFuncPai"

function Company(){

    function msgPai1(txtMsg) {
        // função pai chamada pelo componente LinkFuncPai
        //console.log(txtMsg)
        document.getElementById("msgOutput").textContent = "Você clicou: " + `${txtMsg}`
    }

    function msgPai2(txtMsg) {
        // função pai chamada pelo componente LinkFuncPai
        //console.log(txtMsg)
        document.getElementById("msgOutput").textContent = "Agora você clicou outro: " + `${txtMsg}`
    }

    return(
        <div>
            <h1>Company TESTES</h1>
            <div>
                <h2>Chamando uma função pai</h2>
                <p>Os seguintes links são produzidos por um componente e, quando clicado, chamam a função no componente pai</p>
                <p>NOTA: a função pai é definida pelo parámetro fnPai repassado ao objeto. Desta forma, é possível reutilizar o componente e mudar o comportamento. Isso ajuda na geração de componentes programmaveis</p>
                <div id="msgOutput">Você clicou: (clique um link)</div>
                <div>
                    <LinkFuncPai 
                        etiqueta = "Link 1"
                        strMsg = "lnk 1"
                        fnPai={msgPai1}
                    />
                    <LinkFuncPai 
                        etiqueta = "Link 2"
                        strMsg = "lnk 2"
                        fnPai={msgPai1}
                    />
                    <LinkFuncPai 
                        etiqueta = "Link 3"
                        strMsg = "lnk 3"
                        fnPai={msgPai2}
                    />
                </div>
            </div>
        </div>
    )
}

export default Company