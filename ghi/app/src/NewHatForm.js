import React, { useEffect, useState} from 'react';

function HatForm(props) {
    const [styleName, setStyleName] = useState('');
    const [fabric, setFabric] = useState([]);
    const[color, setcolor] = useState('');
    const[picture, setPicture] = useState('');
    const[location, setLocation] = useState('');


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

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
      }

    const handleMaxPresentationsChange = (event) => {
        const value = event.target.value;
        setMaxPresentations(value);
      }

    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value;
        setMaxAttendees(value);
      }

      const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
      }

      const handleSubmit = async(event) => {
        event.preventDefault();
        const data = {};

        data.name = name;
        data.starts = starts;
        data.ends = ends;
        data.description = description;
        data.max_presentations = maxPresentations
        data.max_attendees = maxAttendees;
        data.location = location;

        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setName('');
            setStarts('');
            setEnds('');
            setDescription('');
            setMaxPresentations('');
            setMaxAttendees('');
            setLocation('');
        }
    }


  const fetchData = async () => {
    const url = 'http://localhost:8000/api/locations/';

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
                <input onChange= {handleStyleNameChange} value ={name} placeholder="Style Name" required type="text" name="Style Name" id ="Style Name" className="form-control"/>
                <label htmlFor="name">Style Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange = {handleFabricChange} value={starts}placeholder="Starts" required type="date" name="starts" id="starts" className="form-control"/>
                <label htmlFor="starts">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={handleEndsChange} value ={ends}placeholder="Ends" required type="date" name="ends" id="ends" className="form-control"/>
                <label htmlFor="ends">Ends</label>
              </div>
              <div className="mb-3">
                <label onChange = {handleDescriptionChange} value={description} htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" required type="text" name="description" id="description" rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input onChange ={handleMaxPresentationsChange} value={maxPresentations}placeholder="max_presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                <label htmlFor="max_presentations">Max Presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxAttendeesChange} value={maxAttendees} placeholder="max_attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                <label htmlFor="max_attendees">Max Attendees</label>
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
