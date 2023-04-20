import { API } from '@component/helpers/api';
import { firstLevelMenu } from '@component/helpers/helpers';
import { MenuItem } from '@component/interfaces/menu.interface';
import { withLayout } from '@component/layout/Layout';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

function Type({ firstCategory }: TypeProps): JSX.Element {
	return (
		<h1>type: {firstCategory}</h1>
	);
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: firstLevelMenu.map(m => '/' + m.route),
		fallback: true
	}
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true
		}
	}
	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
	if (!firstCategoryItem) {
		return {
			notFound: true
		}
	}
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory: firstCategoryItem._id
	})
	return {
		props: {
			menu,
			firstCategory: firstCategoryItem._id
		}
	}
}

interface TypeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number
}