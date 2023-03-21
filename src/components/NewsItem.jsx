/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'

const NewsItem = (props) => {
    return (
        <div><div className="card my-3"><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{props.source}</span>
            <img className="card-img-top" src={props.imageUrl ? props.imageUrl : "https://sigma.world/fileadmin/SiGMA-news-preview.png"} alt="news headline image" />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <p className="card-text"><small className="text-muted">By {props.author ? props.author : 'Unknown'} on {new Date(props.date).toGMTString()}</small></p>
                <a href={props.newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-outline-info">Read more</a>
            </div>
        </div></div>
    )
}
export default NewsItem;