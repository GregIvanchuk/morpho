import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";
import axios from '../../../../axios';
import styles from './CreateGoods.module.css';
function CreateGoods(props) {
  const [imgUrl, setImgUrl] =  React.useState("");
  const [imgUrl2, setImgUrl2] =  React.useState("");
  const [imgUrl3, setImgUrl3] =  React.useState("");
  const {id} = useParams();
  const isEditing = Boolean(id)
  const { register, handleSubmit, reset , setValue , formState: { errors } } = useForm();
  // const apiForm2 = process.env.REACT_APP_API_URL_FORM_TWO
  const onSubmit = (data) => {
    const newData = { ...data, imgmain: imgUrl, imgsecond: imgUrl2, imgthird: imgUrl3 };
    { isEditing ?  axios.patch(`/posts/${id}`, newData)
    .then(function (response) {
      alert("Товар успішно відредаговано)");
      reset()
    })
    .catch(function (error) {
      alert("Не вдалося відредагувати товар) Спробуйте будь ласка пізніше)");
    })
     : axios.post("/posts",newData)
    .then(function (response) {
      alert("Товар успішно додано)");
      reset()
    })
    .catch(function (error) {
      alert("Не вдалося додати товар) Спробуйте будь ласка пізніше)");
    }); }
  };
  const handleChangeFile = async (event) => {
    try {
        const formData = new FormData ()
        const file = event.target.files[0];
        formData.append('image', file)
        const {data} = await axios.post("/upload", formData)
        setImgUrl(`https://walrus-app-fq6cy.ondigitalocean.app/${data.url}`);
       
    } catch (error) {
      console.warn(error);
      alert("Помилка при завантаженні файлу")
    }
  }
  const handleChangeFile2 = async (event) => {
    try {
        const formData = new FormData ()
        const file = event.target.files[0];
        formData.append('image', file)
        const {data} = await axios.post("/upload", formData)
        setImgUrl2(`https://walrus-app-fq6cy.ondigitalocean.app${data.url}`);
       
    } catch (error) {
      console.warn(error);
      alert("Помилка при завантаженні файлу")
    }
  }
  const handleChangeFile3 = async (event) => {
    try {
        const formData = new FormData ()
        const file = event.target.files[0];
        formData.append('image', file)
        const {data} = await axios.post("/upload", formData)
        setImgUrl3(`https://walrus-app-fq6cy.ondigitalocean.app${data.url}`);
    } catch (error) {
      console.warn(error);
      alert("Помилка при завантаженні файлу")
    }
  }
 
  React.useEffect(()=>{
    if (id) {
    axios.get(`/posts/${id}`).then( ({data}) => {
      setValue("idd", data.idd);
      setValue("title", data.title.toString());
      setValue("text1", data.text1.toString());
      setValue("text2", data.text2.toString());
      setValue("price", data.price);
      setValue("category", data.category);
      setImgUrl(data.imgmain);
      setImgUrl2(data.imgsecond);
      setImgUrl3(data.imgthird);
    } ).catch((err) =>{
      console.log(err);
    })
  }
  },[])

  return (
    <>
    <div className={styles.wrapper}>
    <div className={styles.content}>
    <div className={styles.item}>
  <label htmlFor="img1">Головне фото товару:</label>
  <input 
    onChange={handleChangeFile}   
    className={styles.inputPhoto} 
    placeholder=" фото 1" 
    type="file" 
    id="img1" 
  />
  {isEditing && <img width={100} heigth={100} src={imgUrl} alt="product" />}
</div>
<div className={styles.item}>
  <label htmlFor="img2">Фото 2:</label>
  <input 
    onChange={handleChangeFile2} 
    className={styles.inputPhoto} 
    placeholder=" фото 2" 
    type="file" 
    id="img2"  
  />
  {isEditing && <img width={100} heigth={100} src={imgUrl2} alt="product" />}
</div>
<div className={styles.item}>
  <label htmlFor="img3">Фото 3:</label>
  <input 
    onChange={handleChangeFile3}  
    className={styles.inputPhoto} 
    placeholder=" фото 3" 
    type="file" 
    id="img3"  
  />
  {isEditing && <img width={100} heigth={100} src={imgUrl3} alt="product" />}
</div>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.item}>
  <label htmlFor="category"></label>
  <select id="category" {...register('category', { required: true })}>
    <option className={styles.option1} value="1">каблучки</option>
    <option className={styles.option} value="2">сережки</option>
    <option className={styles.option} value="3">підвіски</option>
    <option className={styles.option} value="4">різне</option>
  </select>
  {errors.category && <span style={{color:"red"}}>snajdshb</span>}
</div>
      <div className={styles.item}>
        <label htmlFor="title"></label>
        <input   className={styles.input}  placeholder=" назва товару" type="text" id="name" {...register('title', { required: true })} />
        {errors.title && <span style={{color:"red"}} >всі поля мають бути заповнені</span>}
      </div>
      
      <div className={styles.item}>
        <label htmlFor="price"></label>
        <input   className={styles.input}  placeholder=" ціна товару" type="number" id="price" {...register('price', { required: true })} />
        {errors.price && <span style={{color:"red"}} >всі поля мають бути заповнені</span>}
      </div>
      <div className={styles.item}>
      <label htmlFor="text1"></label>
      <textarea  placeholder=" опис товару 1" rows="4" cols="50" type="text" id="text1" {...register('text1', { required: true })}/>
      {errors.text1 && <span style={{color:"red"}} >всі поля мають бути заповнені</span>}
      </div>
      <div className={styles.item}>
      <label htmlFor="text2"></label>
      <textarea  placeholder=" опис товару 2" rows="4" cols="50" type="text" id="text2" {...register('text2', { required: true })}/>
      {errors.text2 && <span style={{color:"red"}} >всі поля мають бути заповнені</span>}
      </div>
      
      <button className={styles.button} type="submit">
       { isEditing ? "ЗБЕРЕГТИ" : "СТВОРИТИ ТОВАР"  }
        </button>
    </form>
    </div>
    </div>
    </>
  );
}

export default  CreateGoods;