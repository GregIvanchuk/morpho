import Good from "./Good";
import styles from "./Goods.module.css"
import React from "react";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getCatId,setSelected } from "..//../Redux/filterSlice";
import {fetchGoods} from "..//../Redux/goodsSlice";
import axios from "../../axios";
import MyLoader from "./Good/PizzaBlock";
import Categor from "./Categor";
import MyContext from "../../MyContext";
import Detail from "./Detail";
function Goods ({}) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const categories = ["ВСІ ТОВАРИ","КАБЛУЧКИ","CЕРЕЖКИ","ПІДВІСКИ","РІЗНЕ"]
    const catId = useSelector((state) => state.filter.catId)
    const goods = useSelector((state) => state.goods.goods)
    const [isClicked, setIsClicked] =  React.useState(true);
    const [idf,setIdf] =  React.useState(0);
     const selected = useSelector((state) => state.filter.selected)
     useEffect(() => {
    dispatch(fetchGoods());
    setIsLoading(false)
   },[])

    const pullOut = (idt) =>{
      setIdf(idt);
    }
return(
    <>
    { isClicked ?  
      <main className={styles.main}>
      <div className={styles.categorios}>
       <Categor categories ={categories} catId={catId} OnclickCatIndex={(id) => dispatch(getCatId(id))}/>
       </div>
    <div className={styles.Items1}>
      {isLoading ? [...Array(8)].map((_ , index) => <MyLoader key={index}/>):
      (catId == 0) ? 
      goods.map((item,index) => <Good f1={isClicked} setF1={setIsClicked} callback={(idt)=> pullOut(idt)}  isLoading={isLoading} key={index} {...item}/>):
      goods.filter((obj => (obj.category === catId)))
    .map((item,index)=> <Good f1={isClicked} setF1={setIsClicked} callback={(idt)=> pullOut(idt)}  isLoading={isLoading} key={index} {...item}/>)} 
      </div>
      </main>:
      <Detail f1={isClicked} setF1={setIsClicked} goods = {goods.find(obj => obj._id == idf)}/>
}
      </>
       )}
     export default Goods;