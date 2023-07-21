function HatList(props) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {props.hats.map(hat => {
            return (
              <tr key={ hat.href }>
                <td>{ hat.name }</td>
                <td>{ hat.location }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  export default HatList;
