import { useRef } from "react";
import { useGoods } from "../../context/GoodsContext";
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function NewAdPopup({ open, setOpen }) {
  const { goods, createGood } = useGoods();
  const nameRef = useRef()
  const textRef = useRef()
  const addressRef = useRef()
  const priceRef = useRef()
  const photoRef = useRef()

    function cleanInputs() {
        nameRef.current.value = null
        textRef.current.value = null
        addressRef.current.value = null
        priceRef.current.value = null
        photoRef.current.value = null
    }

    function onSubmit() {

        const newGood = {
            name: nameRef.current.value,
            text: textRef.current.value,
            address: addressRef.current.value,
            price: priceRef.current.value,
            photo: photoRef.current.value,
            id: `${goods.length + 1}`,
        }
        console.log(nameRef.current)
        createGood(newGood)
        cleanInputs()
        setOpen(false)
    }

  return (
    <div
      onClick={() => setOpen(false)}
      style={{ display: !open ? "none" : "flex" }}
      className="modal"
    >
      <div onClick={(e) => e.stopPropagation()} className="modal__content">
        <form className="modal__form" action="">
          <span className="modal__title">Новое объявление</span>

          <label htmlFor="name">Название товара</label>
          <input ref={nameRef} id="name" className="modal__input" type="text" />
          
          <label htmlFor="photo">Фото товара</label>
          <input ref={photoRef} id="photo" className="modal__input" type="text" />

          <label htmlFor="text">Описание товара</label>
          <input ref={textRef} id="text" className="modal__input" type="text" />

          <label htmlFor="address">Ваш адрес</label>
          <input ref={addressRef} id="address" className="modal__input" type="text" />

          <label htmlFor="price">Цена</label>
          <input ref={priceRef} id="price" className="modal__input" type="text" />

          <button type="submit" onClick={e => {
            e.preventDefault()
            onSubmit()
          }}>
            Разместить объявление
          </button>
        </form>
      </div>
    </div>
  );
}
