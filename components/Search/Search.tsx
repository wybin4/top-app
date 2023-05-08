import { SearchProps } from './Search.props'
import styles from './Search.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { KeyboardEventHandler, useState } from 'react';
import { Button } from '../Button/Button';
import GlassIcon from './glass.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: '/search',
			query: {
				q: search
			}
		});
	};


	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'Enter') {
			goToSearch();
		}
	}

	return (
		<div className={cn(className, styles.search)}
			{...props}
		>
			<Input
				className={styles.input}
				placeholder='Поиск...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				aria-label='Искать по сайту'
				appearance='primary'
				className={styles.button}
				onClick={() => { goToSearch() }}
			>
				<GlassIcon />
			</Button>
		</div>
	);
}