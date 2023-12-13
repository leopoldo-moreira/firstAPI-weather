import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [quotes, setQuotes] = useState();
  const [newQuotes,setNewQuotes] = useState(0)
  const [cor, setCor] = useState(null);
  const [opacidade, setOpacidade] = useState(1);

  useEffect(() => {
    const fetchData = async () => {      

      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=success',{
          headers: {'X-Api-Key': 'iB1kGEe7Wg31uDHCkug0tg==PDUfnYxVEtuIRweq'}
        });
        
        setOpacidade(0);
        setTimeout(() => {
          setQuotes(response.data);
          setOpacidade(1);
        }, 500);        

      } catch (error) {
        console.error('Erro ao buscar dados de previsão do tempo:', error);
      }
    };

    const fetchRandomColor = async () => {
      try {
        const response = await axios.get(`https://www.colr.org/json/color/random?query&timestamp=${new Date().getTime()}`);
        setCor(response.data);
        
      } catch (error) {
        console.error('Erro ao buscar cor aleatória:', error);
      }
    };
    

    fetchData();
    fetchRandomColor();

  }, [newQuotes]); 

  let colorText ='#';

  if (cor){
    console.log(cor.colors[0].hex)
    colorText += cor.colors[0].hex;
  }

  document.body.style.backgroundColor = 'black';

  
  
  return (
    <div>
      {quotes ? (
        <h1 style={{transition: 'all 0.5s ease', opacity: opacidade}}>
          <span style={{ color: colorText, transition: 'all 0.5s ease'}}>{quotes[0].quote}</span>
          <span style={{ color: colorText, marginLeft: '8px', transition: 'all 0.5s ease' }}>{quotes[0].author}</span>        
        </h1>
      ):(
        <h1>carregando...</h1>
      )}
      <button onClick={()=> setNewQuotes(prev => prev +1)}>Nova Quotes</button>  


    {cor? (
      <h1 style={{color: colorText, transition: '0.5s'}}>Trocando a cor</h1>
    ) : (<h1>Carregando cor</h1>)}


    </div>
  );
}
export default App;