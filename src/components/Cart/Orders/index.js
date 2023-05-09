import styles from "./OrdersForm.module.css";
import React from "react";
import { useState } from "react";
import FramedCart from "../FramedCart";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { clearItems } from "../../../Redux/cartSlice";
function OrdersForm({ openCart,itemsCart,setItemsCart,sum }) {
    const cartItems = useSelector (state => state.cart.cartItems)
    const totalCount = useSelector((state) => state.cart.totalCount);
    const cartTotalPrice = useSelector((state) => state.cart.cartTotalPrice);

    const cats = [];
for (let i = 0; i < cartItems.length; i++ ){
  if (cartItems[i].category == 1) cats.push(cartItems[i].category);
  console.log(cats);
}


    let [onSub, setOnSub] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
  const apiForm2 = process.env.REACT_APP_API_URL_FORM_TWO
 
  const onSubmit = (data) => {
    const newData = { ...data,totalCount:totalCount,  cartTotalPrice:cartTotalPrice };
    newData.items = []; // Створення масиву items в newData
    cartItems.forEach((item) => {
      newData.items.push({ // Додавання нового об'єкту до масиву
        title: item.title,
        price: item.price,
        count: item.count,
      });
    });
    axios.post(apiForm2, newData)
    .then((response) => {
      if (response.status === 200) {
        dispatch(clearItems())
        setOnSub(!onSub);
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Form submission failed.');
    });
  };
        
    // fetchData() 


    return onSub ? (
        <FramedCart openCart={openCart} />
    ) : (
        <div className={styles.drawer}>
            <div className={styles.cart_Items}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register("fullName", { 
                                required: "Field is required",
                                minLength: 2,
                                maxLength: 20,
                            })}
                            name="fullName"
                            type="text"
                            placeholder=" ПРІЗВИЩЕ ІМ'Я"
                        />
                        <div className={styles.item}>
        <label htmlFor="email"></label>
        <input placeholder=" E-MAIL" type="email" id="email" {...register('email', { required: true })} />
        {errors.email && <span style={{color:"red"}} >всі поля мають бути заповнені</span>}
      </div>
                        {errors.fullName && <p style={{color:"red",height:'-20px',marginTop:"-15px",marginBottom:"-15px"}}>{errors.fullName.message}</p>}
                        <input 
                            {...register("phone",{ 
                                required: "Field is required",
                            })}
                            name="phone"
                            type="tel"
                            placeholder=" ТЕЛЕФОН"
                        />
                        <input
                            {...register("city",{ 
                                required: "Field is required",
                                minLength: 2,
                                maxLength: 20,
                            })}
                            name="city"
                            type="text"
                            placeholder=" МІСТО"
                        />
                        {errors.city && <p style={{color:"red",height:'-20px',marginTop:"-15px",marginBottom:"-15px"}}>{errors.city.message}</p>}
                        {(cats.length !== 0) ?

<select className={styles.select}  id="descr" {...register('descr')}>
<option className={styles.option} value="не вказано">РОЗМІР КАБЛУЧКИ</option>
<option className={styles.option} value="13.5">13.5</option>
<option className={styles.option} value="14">14</option>
<option className={styles.option} value="14.5">14.5</option>
<option className={styles.option} value="15">15</option>
<option className={styles.option} value="15.5">15.5</option>
<option className={styles.option} value="16">16</option>
<option className={styles.option} value="16.5">16.5</option>
<option className={styles.option} value="17">17</option>
<option className={styles.option} value="17.5">17.5</option>
<option className={styles.option} value="18">18</option>
<option className={styles.option} value="18.5">18.5</option>
<option className={styles.option} value="19">19</option>
<option className={styles.option} value="19.5">19.5</option>
<option className={styles.option} value="20">20</option>
<option className={styles.option} value="20.5">20.5</option>
<option className={styles.option} value="21">21</option>
<option className={styles.option} value="21.5">21.5</option>
<option className={styles.option} value="22">22</option>
</select>: ""                       
                      }
                        <button className={styles.submit} type="submit">Оформити</button>
                        <Link to="/cart"> <button className={styles.back} >Назад</button> </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default OrdersForm;
