import { Inter } from 'next/font/google';
import { Button, Htag, P, Rating, Tag } from '@component/components';
import { useEffect, useState } from 'react';
import { withLayout } from '@component/layout/Layout';
const inter = Inter({ subsets: ['latin'] })

function Home(): JSX.Element {
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
    </>
  )
};

export default withLayout(Home);