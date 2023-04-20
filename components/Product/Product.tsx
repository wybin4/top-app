import { ProductProps } from './Product.props'
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { declOFNum, priceRu } from '@component/helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import { useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';

export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

	return (
		<>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image
						src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>
					{product.title}
				</div>
				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice &&
						<Tag
							className={styles.oldPrice}
							color='green'>
							{priceRu(product.price - product.oldPrice)}
						</Tag>}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}/<span className={styles.month}>мес</span>
				</div>
				<div className={styles.rating}>
					<Rating rating={product.reviewAvg ?? product.initialRating} />
				</div>
				<div className={styles.tags}>
					{product.categories.map(c => <Tag key={c} className={styles.tag} color='ghost'>{c}</Tag>)}
				</div>
				<div className={styles.priceTitle}>
					цена
				</div>
				<div className={styles.creditTitle}>
					кредит
				</div>
				<div className={styles.reviewCount}>{product.reviewCount} {declOFNum(product.reviewCount, ['отзыв', ' отзыва', 'отзывов'])}</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.description}>{product.description}</div>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages &&
						<div className={styles.advantages}>
							<div className={styles.advTitle}>Преимущества</div>
							{product.advantages}
						</div>
					}
					{product.disadvantages &&
						<div className={styles.disadvantages}>
							<div className={styles.advTitle}>Недостатки</div>
							{product.disadvantages}
						</div>
					}
				</div>
				<Divider className={styles.hr} />
				<div className={styles.actions}>
					<Button appearance='primary'>Узнать подробнее</Button>
					<Button
						appearance='ghost'
						className={styles.reviewButton}
						arrow={isReviewOpened ? 'down' : 'right'}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>Читать отзывы</Button>
				</div>
			</Card>
			<Card color='blue' className={cn(styles.reviews, {
				[styles.opened]: isReviewOpened,
				[styles.closed]: !isReviewOpened
			})}>
				{product.reviews.map(r => (
					<div key={r._id}>
						<Review review={r} />
						<Divider />
					</div>
				))}
				<ReviewForm productId={product._id} />
			</Card>
		</>
	)
}