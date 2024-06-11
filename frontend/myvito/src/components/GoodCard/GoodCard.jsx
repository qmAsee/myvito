
/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
export default function GoodCard({ good }) {

    return (
        <li className="good">
            <img className="good__picture" src={good.photo} />
            <h3 className="good__name">{good.name}</h3>
            <span className="good__address">{good.address}</span>
            <div className="good__info-wrapper"> 
                <span className="good__price">{good.price} $</span>
                <button className='good__tocart' />
                <button className='good__like' />
            </div>
        </li>
    )
}