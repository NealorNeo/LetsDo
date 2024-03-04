import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ListContent } from './components/ListContent';


function App() {
    return (
      <>
        <div className='container'>
            <header className="header">
              {/* <div>
                <Link to='/about'></Link>
              </div> */}
            </header>

            <main>
              <Router>
                <Routes>
                  <Route 
                    path='/' 
                    element={<ListContent />}>
                    </Route>
                </Routes>
              </Router>
              
            </main>
        </div>
      </>
    )
}

export default App;