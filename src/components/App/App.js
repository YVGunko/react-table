import "bootstrap/dist/css/bootstrap.min.css";
import CustomerCrud from "../Customer/CustomerCrud";

function App() {
  return (
    <div>
      <h1 className="text-center">Клиенты</h1>
      <CustomerCrud />
    </div>
  );
}

export default App;