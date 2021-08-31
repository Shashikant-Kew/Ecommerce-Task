import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import ProductList from './ProductList';
import AddProduct from './AddProduct';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddProduct: false,
      error: null,
      response: {},
      product: {},
      products:[],
      isEditProduct: false,
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onCreate() {
    this.setState({ isAddProduct: true });
  }

  componentDidMount() {
    const apiUrl = 'http://localhost:3000/products';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            products: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }


  onFormSubmit(data) {
    const lastidx =  this.state.products.length -1;
    if(!data.id)
    {
      data.id = this.state.products[lastidx].id + 1;
    }
    let body = JSON.stringify(data)
    let apiUrl;
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let options = {
      body,
      headers
    };

    if(this.state.isEditProduct){
      apiUrl = `http://localhost:3000/products/${data.id}`;
      options.method = 'PUT';
    } else {
      apiUrl = `http://localhost:3000/products` ;
      options.method = 'POST'
    }

    
    

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result,
          isAddProduct: false,
          isEditProduct: false
        })
      },
      (error) => {
        this.setState({ error });
      }
    )
  }

  editProduct = id => {

    const apiUrl = `http://localhost:3000/products/${id}`;

    const options = {
      method: 'GET',
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            product: result,
            isEditProduct: true,
            isAddProduct: true
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {

    let productForm;
    if(this.state.isAddProduct || this.state.isEditProduct) {
      productForm = <AddProduct onFormSubmit={this.onFormSubmit} product={this.state.product} />
    }

    return (
      <div className="App">
        <Container>
          <h1 style={{textAlign:'center'}}>Shop-Bridge</h1>
          <br />
          {!this.state.isAddProduct && <Button variant="primary" onClick={() => this.onCreate()}>Add Product</Button>}
          <br /><br />
          {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
          {!this.state.isAddProduct && <ProductList editProduct={this.editProduct}/>}
          { productForm }
          {this.state.error && <div>Error: {this.state.error.message}</div>}
        </Container>
      </div>
    );
  }
}

export default App;