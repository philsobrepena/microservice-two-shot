import React, {useState, useEffect} from 'react';
import App from './App';

function HatList() {
  const[hats, setHats] = useState([])

  async function getHat() {
    const response = await fetch('http://localhost:8090/api/hats/');
    if(response.ok) {
      const data = await response.json();
      console.log(data)
      setHats(data.hats);
    } else(
      console.log(response)
    )
  }

useEffect(() => {
  getHat();
}, []);

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>color</th>
            <th>fabric</th>
            <th>style</th>
            <th>picture</th>
          </tr>
        </thead>
        <tbody>
          {hats.map((hat,index) => {
            return (
              <tr key={ index }>
                <td>{ hat.color }</td>
                <td>{ hat.fabric }</td>
                <td>{ hat.style_name }</td>
                <td>{ hat.picture }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  export default HatList;
