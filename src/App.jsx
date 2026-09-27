import { Routes, Route } from "react-router";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Start from "./pages/Start";

import FarmerLogin from "./pages/Farmer/FarmerLogin";
import FarmerRegister from "./pages/Farmer/FarmerRegister";
import FarmerOTP from "./pages/Farmer/FarmerOTP";
import FarmerDashboard from "./pages/Farmer/FarmerDashboard";
import CreateCropLot from "./pages/Farmer/CreateCropLot";
import AIInsights from "./pages/Farmer/AIInsights";
import Marketplace from "./pages/Buyer/Marketplace";
import ProductDetails from "./pages/Buyer/ProductDetails";
import Cart from "./pages/Buyer/Cart";
import RFQCenter from "./pages/Buyer/MyRFQs";
import FarmerRFQs from "./pages/Farmer/FarmerRFQs";
import NetRealizationCalculator from "./pages/Farmer/NetRealizationCalculator";
import FarmerProfile from "./pages/Farmer/FarmerProfile";
import BuyerOrderDetails from "./pages/Buyer/BuyerOrdersDetails";
import BuyerOrders from "./pages/Buyer/BuyerOrders";
import BuyerProfile from "./pages/Buyer/BuyerProfile";
import BuyerSettings from "./pages/Buyer/BuyerSettings";
import BuyerDashboard from "./pages/Buyer/BuyerDashboard";
import BuyerLogin from "./pages/Buyer/BuyerLogin";
import BuyerRegister from "./pages/Buyer/BuyerRegister";
import BuyerOffers from "./pages/Buyer/BuyerOffers";
import Payments from "./pages/Buyer/Payments";
import DigitalContract from "./pages/Buyer/DigitalContract";
import QualityHold from "./pages/Buyer/QualityHold";
import Logistics from "./pages/Buyer/Logistics";
import OffersReceived from "./pages/Buyer/OffersReceived";
import ContractDetails from "./pages/Buyer/ContractDetails";
import Tracking from "./pages/Buyer/Tracking";
function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/start" element={<Start />} />

        {/* Farmer */}
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/farmer/register" element={<FarmerRegister />} />
        <Route path="/farmer/verify" element={<FarmerOTP />} />
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/crop-lot/new" element={<CreateCropLot />} />
        <Route path="/farmer/ai-insights" element={<AIInsights />} />
        <Route path="/farmer/rfqs" element={<FarmerRFQs />} />
        <Route path="/farmer/net-realization" element={<NetRealizationCalculator />} />
        <Route path="/farmer/profile" element={<FarmerProfile />} />
        {/* Buyer */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buyer/rfqs" element={<RFQCenter />} />
        <Route path="/buyer/order/:id" element={<BuyerOrderDetails />} />
        <Route path="/buyer/orders" element={<BuyerOrders />} />
        <Route path="/buyer/profile" element={<BuyerProfile />} />
        <Route path="/buyer/settings" element={<BuyerSettings />} />
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/login" element={<BuyerLogin />} />
        <Route path="/buyer/register" element={<BuyerRegister />} />
        <Route path="/buyer/orders" element={<BuyerOrders />} />
        <Route path="/buyer/offers" element={<BuyerOffers />} />
        <Route path="/buyer/payments" element={<Payments />} />
        <Route path="/buyer/tracking" element={<Tracking />} />
        <Route path="/buyer/digital-contract" element={<DigitalContract />} />
        <Route path="/buyer/quality-hold" element={<QualityHold />} />
        <Route path="/buyer/logistics" element={<Logistics />} />
        <Route path="/buyer/offers-received" element={<OffersReceived />} />
        <Route path="/buyer/contract" element={<ContractDetails />} />
        <Route path="/buyer/contract-details" element={<ContractDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;