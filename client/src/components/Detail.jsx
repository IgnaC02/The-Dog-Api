import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import styles from "./Detail.module.css";
import Loading from "../img/loading-4.gif"

export default function Detail(props){
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch, props.match.params.id])

    const myDog = useSelector((state) => state.detail)

    return(
        <div className={styles.general}>
            {
                myDog.length > 0 ?
                <div className={styles.container}>
                    <h1 className={styles.title}>{myDog[0].name}</h1>
                    <img src={myDog[0].image} alt="Img not found" className={styles.img}/>
                    <h3> Weight: {myDog[0].weight} Kg</h3>
                    <h3> Height: {myDog[0].height} Cm</h3>
                    {/* <h3> Life span: {myDog[0].life_span} Years</h3> */}
                    <h3> Life span: {myDog[0].createdDb ? myDog[0].life_span + " years" : myDog[0].life_span} </h3>
                    <h3> Temperaments: {!myDog[0].createdDb? myDog[0].temperament + ' ' : myDog[0].temperaments.map(ob => ob.name + (' '))} </h3>
                    <hr  className={styles.hr}/>
                    <Link to="/home">
                        <button className={styles.btn}>Go back</button>
                    </Link>
                </div> : 
                <img src={Loading} alt="loading gift not found" className={styles.loading} />
            }
        </div>
    )
}
