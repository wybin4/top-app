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
