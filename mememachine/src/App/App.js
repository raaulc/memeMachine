// import styles from './styles.module.css'

import { Meme } from "../Meme/Meme";
import {Routes, Route} from 'react-router-dom'
import { MemeGenerated } from "../MemeGenerated/MemeGenerated";

export const App = () => {
  return (
    <div>
      <h1>Rahul's Meme Machine</h1>
      <Routes>
        <Route exact path='/' element = {<Meme/>}>
        </Route>
        <Route path='/generated' element = {<MemeGenerated/>}>
        </Route>
      </Routes>
    </div>
  );
}