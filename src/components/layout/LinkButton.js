import { Link } from 'react-router-dom'

import styles from './LinkButton.module.css'

function LinkButton({destino, text}) {
    return(
        <Link className={styles.btn} to={destino}>
            {text}
        </Link>
    )
}

export default LinkButton