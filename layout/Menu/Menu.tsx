import { useContext, KeyboardEvent } from 'react';
import styles from './Menu.module.css';
import cn from 'classnames';
import { AppContext } from '@component/context/app.context';
import { PageItem } from '@component/interfaces/menu.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '@component/helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
	const { menu, setMenu, firstCategory } = useContext(AppContext);
	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 10,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1
			},
		},
		hidden: { marginBottom: 0 }
	}

	const variantsChild = {
		visible: {
			opacity: 1,
			height: 29,

		},
		hidden: {
			opacity: 0,
			height: 0
		}
	}

	const openSecondLevel = (secondCategory: string) => {
		setMenu && setMenu(menu.map(m => {
			if (m._id.secondCategory == secondCategory) {
				m.isOpened = !m.isOpened;
			}
			return m;
		}))
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(menu => (
					<div key={menu.route}>
						<Link href={'/' + menu.route}>
							<div className={cn(styles.firstLevel, {
								[styles.firstLevelActive]: menu._id == firstCategory
							})}>
								{menu.icon}
								<span>{menu.name}</span>
							</div>
						</Link>
						{menu._id == firstCategory && buildSecondLevel(menu.route)}
					</div>
				))}
			</>
		);
	};
	const buildSecondLevel = (route: string) => {
		return (
			<div className={styles.secondBLock}>
				{menu.map(m => {
					if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
						m.isOpened = true;
					}
					return (
						<div
							key={m._id.secondCategory}>
							<div
								tabIndex={0}
								onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}>
								{m._id.secondCategory}
							</div>
							<motion.div
								layout
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								variants={variants}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(m.pages, route, m.isOpened ?? false)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};
	const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
		return (
			pages.map(p => (
				<motion.div
					key={p._id}
					variants={variantsChild}
				>
					<Link tabIndex={isOpened ? 0 : -1} href={'/' + route + '/' + p.alias} className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: '/' + route + '/' + p.alias == router.asPath,
					})}>
						{p.category}
					</Link>
				</motion.div>
			))
		);
	};

	return (
		<div className={styles.menu}>
			{buildFirstLevel()}
		</div>
	);
}