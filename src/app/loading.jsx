import styles from "./(main)/components/styles/loading.module.css"
function Loading() {

    return (
        <div className={styles.body}>
            <div className={styles.loadingBox}></div>
        </div>
    )

}
export default Loading