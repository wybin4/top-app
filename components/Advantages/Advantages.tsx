import { AdvantagesProps } from './Advantages.props'
import styles from './Advantages.module.css';
import cn from 'classnames';
import { Htag } from '../Htag/Htag';
import CheckIcon from './check.svg';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.map(a => (
				<div key={a._id} className={styles.advantages}>
					<CheckIcon />
					<div className={styles.title}>{a.title}</div>
					<hr className={styles.vline}></hr>
					<div>{a.description}</div>
				</div>
			))}
		</>
	)
}