import { API } from '@component/helpers/api';
import { MenuItem } from '@component/interfaces/menu.interface';
import { withLayout } from '@component/layout/Layout';
import axios from 'axios';
import { GetStaticProps } from 'next';

function Search(): JSX.Element {
	return (
		<h1>search</h1>
	);
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory
	})
	return {
		props: {
			menu,
			firstCategory
		}
	}
}

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[],
	firstCategory: number
}