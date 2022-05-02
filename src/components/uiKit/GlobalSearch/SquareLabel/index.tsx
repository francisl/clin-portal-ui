import cx from 'classnames';

import styles from './index.module.scss';

interface OwnProps {
  label: string;
  className?: string;
}

const SquareLabel = ({ label, className = '' }: OwnProps) => (
  <div className={cx(styles.squareLabel, className)}>{label}</div>
);

export default SquareLabel;
