import UsePage from './UsePage';
import ServePage from './ServePage';

export default async function Home() {

  return (
    <>
      <UsePage>
        <ServePage />
      </UsePage>
    </>
  )
}
