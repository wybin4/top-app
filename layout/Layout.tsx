import { LayoutProps } from './Layout.props'
import styles from './Layout.module.css';
import cn from 'classnames';
import { Header } from './Header/Header';
import { Sidebar } from './Sidebar/Sidebar';
import { Footer } from './Footer/Footer';
import { KeyboardEvent, Component, FunctionComponent, useEffect, useState, useRef } from 'react';
import { AppContextProvider, IAppContext } from '@component/context/app.context';
import { Up } from '@component/components';

const Layout = ({ children }: LayoutProps): JSX.Element => {
	const [isSkipLink, setIsSkipLink] = useState<boolean>(false);

	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: KeyboardEvent) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLink(false);
	};

	return (
		<div className={styles.wrapper}>
			<a
				onFocus={() => setIsSkipLink(true)}
				onKeyDown={skipContentAction}
				className={cn(styles.skipLink,
					{ [styles.displayed]: isSkipLink, }
				)}
				tabIndex={1}
			>Сразу к содержанию</a>
			<Header className={styles.header} />
			<Sidebar className={styles.sidebar} />
			<div className={styles.body} ref={bodyRef} tabIndex={0}>
				{children}
			</div>
			<Footer className={styles.footer} />
			<Up />
		</div >
	);
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	}
}