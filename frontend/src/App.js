import React, { useState } from "react";
import "./App.css";
import Food_Selection from "./pages/food_selection/food_selection";
import MyKitchen from "./pages/Kitchen/MyKitchen";
import { Switch, Route } from "react-router-dom";
import DalffinsMenu from "./components/menu/menu";
import Footer from "./components/footer/footer";
import SignUp from "./pages/SignUp/SignUp";
import Layout from "./components/Kitchen/Layout";
import Main from "./components/Kitchen/Main";
import SummaryAndPayment from "./pages/SummaryAndPayment/SummaryAndPayment";
import Help from "./pages/Help/Help";
import Login from "./pages/login/Login";
import HomePage from "./pages/homePage/HomePage";
import ForgotPasswordGetCode from "./pages/forgotPassword/ForgotPasswordGetCode";
import ForgotPasswordEnterCode from "./pages/forgotPassword/forgotPasswordEnterCode";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import MyAccount from "./pages/myAccount/MyAccount";
import AdminSupport from "./pages/AdminSupport/AdminSupport";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AboutUs from "./pages/About/AboutUs";
import ContactUs from "./pages/Contact/ContactUs";
import FAQs from "./pages/Faqs/FAQs";
import OrderFood from "./pages/OrderFood/OrderFood";
import { KitchenProvider } from "./context/kitchen-context";

function App() {
  const [orderedItems, setOrderedItems] = useState(new Map());

  const [orderedItemsSize, setOrderedItemsSize] = useState(0);

  const [id, setId] = useState("");

  const [token, setToken] = useState("");

  const [firstName, setFirstName] = useState("");

  const [email, setEmail] = useState("");

  const orderItemHandler = (orderedItemsInput) => {
    console.log(orderedItemsInput);
    setOrderedItems(orderedItemsInput);
    setOrderedItemsSize(orderedItems.size);
    console.log(orderedItemsSize);
  };

  return (
    <>
      {console.log("orderedItems " + orderedItems)}
      <DalffinsMenu
        orderedItems={orderedItems}
        userToken={token}
        setUserToken={setToken}
        firstName={firstName}
      />

      <Switch>
        <Route exact path="/foodSelectionUI/:id">
          <Food_Selection onOrderItemClick={orderItemHandler} />
        </Route>

        <Route exact path="/kitchen">
          <Layout>
            <Main>
              <KitchenProvider userId={id} ><MyKitchen userId={id} email={email} /></KitchenProvider>
            </Main>
          </Layout>
        </Route>

        <Route exact path="/summaryAndPayment">
          <SummaryAndPayment orderedItems={orderedItems} email={email} onOrderItemClick={orderItemHandler} />
        </Route>

        <Route exact path="/orderfood">
          <OrderFood />
        </Route>

        <Route exact path="/signUp">
          <SignUp
            setUserId={setId}
            setUserToken={setToken}
            setFirstName={setFirstName}
            setEmail={setEmail}
          />
        </Route>

        <Route exact path="/" component={HomePage} />

        <Route exact path="/home" component={HomePage} />

        <Route exact path="/login">
          <Login
            setUserId={setId}
            setUserToken={setToken}
            setFirstName={setFirstName}
            setEmail={setEmail}
          />
        </Route>

        <Route exact path="/forgotPassword">
          <ForgotPasswordGetCode setUserId={setId} />
        </Route>

        <Route
          exact
          path="/forgotPasswordEnterCode"
          component={ForgotPasswordEnterCode}
        />

        <Route exact path="/resetPassword">
          <ResetPassword setUserId={setId} />
        </Route>

        <Route exact path="/help">
          <Help userEmail={email} firstName={firstName} />
        </Route>

        <Route exact path="/admin/help">
          <AdminSupport userEmail={email} firstName={firstName} />
        </Route>

        <Route exact path="/admin/login">
          <AdminLogin setFirstName={setFirstName} setEmail={setEmail} />
        </Route>

        <Route exact path="/myAccount">
          <MyAccount userId={id} setUserToken={setToken} />
        </Route>

        <Route exact path="/about">
          <AboutUs />
        </Route>

        <Route exact path="/contact">
          <ContactUs />
        </Route>

        <Route exact path="/faq">
          <FAQs />
        </Route>
      </Switch>

      <Footer userEmail={email} />
    </>
  );
}

export default App;
