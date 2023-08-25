import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import React, { Component } from "react";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

//Burada App.js yi class component türüne çevirdik ve data sadece app.jsden diğer jslere taşınabildiği için yaptık. ty
// Yani veriyi buradan göndereceğimiz için State kullandık, Diğer Js lerde veri alırken prop ile alıyoruz.

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      // if seoUrl varsa demek
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  // Sepete Ürün Ekleme
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });

    alertify.success(product.productName + " added to cart!");
  };

  // Sepetten Ürün silme
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);

    this.setState({ cart: newCart });
    alertify.warning(product.productName + " removed from cart!");
  };

  render() {
    let productInfo = { title: "Product List " };
    let categoryInfo = { title: "Category List " };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />

          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                /* changeCategory={this.changeCategory} bu kod ile CategoryList.Js'ye gönderdik. */ info={
                  categoryInfo
                }
              />
            </Col>
            <Col xs="9">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <ProductList
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  }
                />
                <Route path="form1" element={<FormDemo1/>}> </Route>
                <Route path="form2" element={<FormDemo2/>}> </Route>
                <Route path="CategoryList" element={<CategoryList/>}> </Route>
                <Route
                  path="/cart"
                  element={
                    <CartList
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                   
                    />
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
