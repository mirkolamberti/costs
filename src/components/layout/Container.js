import styles from "./Container.module.css"

/**
 * 
 *         <div className={`${styles.Container} ${styles[props.customClass]}`}>
 */
function Container(props) {
    return(
        <div className={`${styles.container} ${styles[props.customClass]}`}>
            {props.children}
        </div>
    )
}

export default Container