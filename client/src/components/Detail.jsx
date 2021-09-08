import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import styles from "./Detail.module.css";

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    const myDog = useSelector((state) => state.detail)

    return(
        <div className={styles.container}>
            {
                myDog.length > 0 ?
                <div className={styles.container}>
                    <img src={myDog[0].image} alt="Img not found" className={styles.img}/>
                    <h1>{myDog[0].name}</h1>
                    <h3> Weight: {myDog[0].weight} </h3>
                    <h3> Height: {myDog[0].height} </h3>
                    <h3> Life span: {myDog[0].life_span} </h3>
                    <h3> Temperaments: {!myDog[0].createdDb? myDog[0].temperament + ' ' : myDog[0].temperaments.map(ob => ob.name + (' '))} </h3>
                    <Link to="/home">
                        <button>Go back</button>
                    </Link>
                </div> : 
                <p>Loading...</p>
            }
        </div>
    )
}
