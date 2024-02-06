import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Landing() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (slug) {
      fetch(`https://regaloss.co/api/business-name-generators?filters[Slug][$eq]=${slug}`)
        .then(response => response.json())
        .then(data => {

          setData(data.data[0].attributes);
        })
        .catch(error => {
          console.error('Error al cargar los datos:', error);
        });
    }
  }, [slug]);

  if (!data) return <div>Cargando...</div>;

  const renderContent = (content) => {
    // Esta función renderiza los párrafos y encabezados de la sección Content
    return content.map((item, index) => {
      if (item.type === 'paragraph') {
        return <p key={index}>{item.children.map(child => child.text).join('')}</p>;
      } else if (item.type === 'heading') {
        return <h4 key={index}>{item.children.map(child => child.text).join('')}</h4>;
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      <h1>{data.Headline}</h1>
      <h2>{data.Subheadline}</h2>
      <div>{data.Content ? renderContent(data.Content) : null}</div>
    </div>
  );
}

export default Landing;
