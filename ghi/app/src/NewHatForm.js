import React, { useEffect, useState} from 'react';

function HatForm(props) {
    const [styleName, setStyleName] = useState('');
    const [fabric, setFabric] = useState('');
    const[color, setColor] = useState('');
    const[picture, setPicture] = useState('');
    const[location, setLocation] = useState('');
    const[locations, setLocations] = useState([]);


    const handleStyleNameChange = (event) => {
        const value = event.target.value;
        setStyleName(value);
      }

    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value);
      }


    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
      }

    const handlePictureChange = (event) => {
        const value = event.target.value;
        setPicture(value);
      }

      const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
      }

      const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {};

        data.style_name = styleName;
        data.fabric = fabric;
        data.color = color;
        data.picture = picture;
        data.location = location;

        console.log(data);

        const hatsUrl = 'http://localhost:8090/api/hats/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(hatsUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json();
            console.log(newHat);

            setFabric('');
            setStyle('');
            setColor('');
            setDescription('');
            setPicture('');
            setLocation('');

        }
    }


  const fetchData = async () => {
    const url = 'http://localhost:8100/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations)

    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new Hat</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange= {handleStyleNameChange} value ={styleName} placeholder="Style Name" required type="text" name="Style Name" id ="Style Name" className="form-control"/>
                <label htmlFor="style name">Style Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleFabricChange} value={fabric}placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={handleColorChange} value ={ends}placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="mb-3">
                <label onChange = {handlePictureChange} value={picture} htmlFor="picture" className="form-label">Picture</label>
                <textarea className="form-control" required type="url" name="picture" id="picture" rows="3"></textarea>
              </div>
              <div className="mb-3">
                <select onChange={handleLocationChange} value={location} required id="location" name="location" className="form-select">
                  <option value="">Choose a location</option>
                  {locations.map(loc => {
                        return (
                        <option key ={loc.id} value={loc.id}>
                                {loc.name}
                        </option>
                        );
                      })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

  );

}

export default HatForm;
