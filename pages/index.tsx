import { Inter } from 'next/font/google';
import { Button, Htag, Input, P, Rating, Tag, Textarea } from '@component/components';
import { useEffect, useState } from 'react';
import { withLayout } from '@component/layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { MenuItem } from '@component/interfaces/menu.interface';
import { API } from '@component/helpers/api';

const inter = Inter({ subsets: ['latin'] })

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <>
      <Htag tag='h1'>Заголовок</Htag>
      <Button appearance='primary' arrow='right'>Count++</Button>
      <Button appearance='ghost' arrow='down'>Кнопка1</Button>
      <P>Средний!</P>
      <Tag size='s' color='primary'>Ghooost</Tag>
      <Tag size='s' color='primary'>Ghooost</Tag>
      <Tag size='s' color='primary'>Ghooost</Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
      <Input placeholder='Инпут' />
      <Textarea placeholder='Текстареа' />
    </>
  )
};

export default withLayout(Home);

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