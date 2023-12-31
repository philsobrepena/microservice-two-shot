import React, {useEffect, useState } from 'react';

function NewShoeForm() {


  const [manufacturer, setManufacturer] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [picture_url, setPictureUrl] = useState('');
  const [bin, setBin] = useState('');
  const [bins, setBins] = useState([]);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/bins/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setBins(data.bins);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.manufacturer = manufacturer;
    data.name = name;
    data.color = color;
    data.picture_url = picture_url;
    data.bin = bin;

    const shoeUrl = 'http://localhost:8080/api/shoes/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const shoeResponse = await fetch(shoeUrl, fetchOptions);
    if (shoeResponse.ok) {
        setManufacturer('');
        setName('');
        setColor('');
        setPictureUrl('');
        setBin('');
        setHasSignedUp(true);
    }

  }


  const handleChangeManufacturer = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  }

  const handleChangeName = (event) => {
    const value = event.target.value;
    setName(value);
  }

  const handleChangeColor = (event) => {
    const value = event.target.value;
    setColor(value);
  }

  const handleChangePictureURL = (event) => {
    const value = event.target.value;
    setPictureUrl(value);
  }

  const handleChangeBin = (event) => {
    const value = event.target.value;
    setBin(value);
  }

  // CSS classes for rendering
  let dropdownClasses = 'form-select d-none';
  if (bins.length > 0) {
    dropdownClasses = 'form-select';
  }

  let messageClasses = 'alert alert-success d-none mb-0';
  let formClasses = '';
  if (hasSignedUp) {
    messageClasses = 'alert alert-success mb-0';
    formClasses = 'd-none';
  }

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form className={formClasses} onSubmit={handleSubmit} id="create-shoe-form">
                <h1 className="card-title">It's Shoe Time!</h1>
                <p className="mb-3">
                  Now, tell us about your shoe
                </p>
                <div className="row">
                    <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeManufacturer} required placeholder="Manufacturer" type="manufacturer" id="manufacturer" name="manufacturer" className="form-control" />
                      <label htmlFor="manufacturer">manufacturer</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeName} required placeholder="Name" type="text" id="name" name="name" className="form-control" />
                      <label htmlFor="name">name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangeColor} required placeholder="Color" type="color" id="color" name="color" className="form-control" />
                      <label htmlFor="color">color</label>
                    </div>
                  </div>
                <div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={handleChangePictureURL} required placeholder="Picture URL" type="picture_url" id="picture_url" name="picture_url" className="form-control" />
                      <label htmlFor="picture_url">picture url</label>
                    </div>
                  </div>
                </div>
                  <p className="mb-3">
                  Please choose a bin
                </p>
                  <div className="mb-3">
                  <select onChange={handleChangeBin} name="bin" id="bin" className={dropdownClasses} required>
                    <option value="">Choose a bin</option>
                    {bins.map(bin => {
                      return (
                        <option key={bin.id} value={bin.id}>{bin.id}</option>
                      )
                    })}
                  </select>
                </div>
                </div>
                <button className="btn btn-lg btn-primary">Submit!</button>
              </form>
              <div className={messageClasses} id="success-message">
                Congratulations! You've added a shoe!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewShoeForm;
