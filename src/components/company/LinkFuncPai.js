

function LinkFuncPai({etiqueta, strMsg, fnPai}) {

    const enviaMsg = (e) => {
        e.preventDefault()
        fnPai(strMsg)
    }

    return(
        <p><a href="#" onClick={enviaMsg} >{etiqueta}</a></p>
    )
}

export default LinkFuncPai