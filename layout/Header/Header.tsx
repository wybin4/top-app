import { HeaderProps } from './Header.props'
import styles from './Header.module.css';
import cn from 'classnames';
import Logo from '../logo.svg';
import { ButtonIcon } from '@component/components/ButtonIcon/ButtonIcon';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const [isOpened, setisOpened] = useState<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		setisOpened(false);
	}, [router]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20
			}
		},
		closed: {
			opacity: 0,
			x: '100%',
			transition: {
				stiffness: 20
			}
		}
	}
	return (
		<header className={cn(styles.header, className)} {...props}>
			<Logo />
			<ButtonIcon appearance='white' icon='menu' onClick={() => { setisOpened(true) }} />
			<motion.div
				className={cn(styles.mobileMenu)}
				variants={variants}
				initial={'closed'}
				animate={isOpened ? 'opened' : 'closed'}
			>
				<Sidebar />
				<ButtonIcon
					className={styles.menuClose}
					appearance='white'
					icon='cross'
					onClick={() => { setisOpened(false) }}
				/>
			</motion.div>
		</header>
	);
}