import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import ProductsIcon from './icons/products.svg';
import BooksIcon from './icons/books.svg';
import { FirstLevelMenuItem } from '@component/interfaces/menu.interface';
import { TopLevelCategory } from '@component/interfaces/page.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{ route: 'courses', name: 'Курсы', icon: <CoursesIcon />, _id: TopLevelCategory.Courses },
	{ route: 'services', name: 'Сервисы', icon: <ServicesIcon />, _id: TopLevelCategory.Services },
	{ route: 'products', name: 'Продукты', icon: <ProductsIcon />, _id: TopLevelCategory.Products },
	{ route: 'books', name: 'Книги', icon: <BooksIcon />, _id: TopLevelCategory.Books },
];

export const priceRu = (price: number): string => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' ₽');

export const declOFNum = (number: number, titles: [string, string, string]): string => {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};