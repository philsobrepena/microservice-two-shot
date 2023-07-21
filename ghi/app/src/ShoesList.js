import { Link } from 'react-router-dom';
import React from 'react';

function ShoesList(props) {
  const handleDelete = async (shoeId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/shoes/${shoeId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        const updatedShoes = props.shoes.filter((shoe) => shoe.id !== shoeId);
        props.setShoes(updatedShoes);
      } else {
        console.log('Error deleting shoe:', response.statusText);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {props.shoes.map((shoe) => (
          <div key={shoe.href} className="col-md-4">
            <div className="card mb-4 shadow" style={{ height: '500px', position: 'relative' }}>
              <img
                src={shoe.picture_url}
                className="card-img-top"
                alt="Shoe"
                style={{ height: '100%', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
              />
              <div className="card-body" style={{ position: 'absolute', top: '0', left: '0', right: '0', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', padding: '10px' }}>
                <h5 className="card-title">{shoe.manufacturer}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{shoe.name}</h6>
                <div className="card-text" style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <div className="bubble">Hexadecimal color value: {shoe.color}</div>
                  <div className="bubble">Bin number: {shoe.bin}</div>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(shoe.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center my-4">
        <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">
          Add
        </Link>
      </div>
    </div>
  );
}

export default ShoesList;
