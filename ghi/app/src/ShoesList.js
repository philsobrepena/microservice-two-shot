  function ShoesList(props) {
    console.log(props);
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Bin</th>
          </tr>
        </thead>
        <tbody>
          {props.shoes.map(shoe => {
            return (
              <tr key={ shoe.href }>
                <td>{ shoe.name }</td>
                <td>{ shoe.bin }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  export default ShoesList;
