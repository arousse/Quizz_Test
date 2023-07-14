import { NavigationBar } from "./components/AppBar/AppBar";
import TemplatePage from "./components/TemplatePage/TemplatePage";
import Category from "./components/Quiz/Category"; 
import {jsQuizz} from "./questions";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Dashboard from "./pages/Dashboard";
import NoPage from  "./pages/NoPage"
import DragAndDrop from "./components/Quiz/DragAndDrop";
  
// const router = createBrowserRouter([
//   {
//     path: '/',
//     // it renders this element
//     element: <Home />,

//     // when the URL matches this segment
    
//     children: [
//       {path: ':id', element: <Category questions={jsQuizz.questions} />}
      
//     ],

    
//   }
// ]);



function App() {
  return (
<>

     <div>
      <BrowserRouter>
        <Routes>
          <Route index element ={<Home />} />
          <Route path = "/home" element ={<Home />} />
          
          <Route path = "/dashboard" element ={<Dashboard />} />
          <Route path = "/learn" element ={<Learn />} />
          <Route path = "/:id" element ={<Category questions={jsQuizz.questions} />} />
          <Route path = "*" element ={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div> 
    
    </>
  )
    
    
  
}

export default App;
