import PhotocommaLink from './PhotocommaLink';
import styles from './ov.module.css';

const OverviewEntry = () => {

  return (
    <>
      <div className={styles.info}>
        It is all about the joy of creating something that did not exist before. Behind BetterMonday is Andrey Raychev a UX designer / developer and occasional{" "}
        <PhotocommaLink />
        .
      </div>
      <div className={styles.banner}>
        <div className={styles.checker}>
          <div className={styles.cta}>Scroll / Drag left and right</div>
          <span className={styles.cts}>
            <svg
              viewBox="0 0 142 142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="expand">
                <path
                  id="ellipse"
                  d="M106.066 106.066C86.5398 125.592 54.8816 125.592 35.3553 106.066C15.8291 86.5398 15.8291 54.8815 35.3553 35.3553C54.8816 15.8291 86.5398 15.8291 106.066 35.3553C125.592 54.8815 125.592 86.5398 106.066 106.066Z"
                  className={styles.ell}
                />
                <g id="arrows" opacity={0.5} clipPath="url(#clip0_600_2)">
                  <path
                    id="l"
                    d="M73.2217 56.9741C73.2217 56.9741 78.5303 66.8405 87.526 71.2784C78.6702 74.5369 73.7325 85.0719 73.7325 85.0719"
                    fill="white"
                    className={styles.arr}
                  />
                  <path
                    id="r"
                    d="M67.6889 85.0719C67.6889 85.0719 62.3803 75.2054 53.3846 70.7676C62.2404 67.5091 67.1781 56.9741 67.1781 56.9741"
                    fill="white"
                    className={styles.arr}
                  />
                </g>
              </g>
            </svg>
          </span>
        </div>
      </div>
    </>
  );
}

export default OverviewEntry;