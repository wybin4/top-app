import { TopPageComponentProps } from './TopPageComponent.props'
import styles from './TopPageComponent.module.css';
import cn from 'classnames';
import { HhData, Htag, P, Tag } from '@component/components';
import { Card } from '@component/components/Card/Card';
import { TopLevelCategory } from '@component/interfaces/page.interface';
import CheckIcon from './check.svg';
import { Advantages } from '@component/components/Advantages/Advantages';

export const TopPageComponent = ({ page, products, firstCategory }: TopPageComponentProps): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h1'>{page.title}</Htag>
				{products && <Tag color='grey' size='m'>{products.length}</Tag>}
				<span>Сортировка</span>
			</div>
			<div>
				{products && products.map(p => (<div key={p._id}>{p.title}</div>))}
			</div>
			{firstCategory == TopLevelCategory.Courses && page.hh && (
				<>
					<div className={styles.hhTitle}>
						<Htag tag='h2'>Вакансии - {page.category}</Htag>
						<Tag color='red' size='m'>hh.ru</Tag>
					</div>
					<HhData {...page.hh} />
				</>
			)}
			{page.advantages && page.advantages.length > 0 && <>
				<Htag tag='h2'>Преимущества</Htag>
				<Advantages advantages={page.advantages} />
			</>
			}
			{page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }}></div>}
			<Htag tag='h2'>Получаемые навыки</Htag>
			{page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
		</div>
	);
}