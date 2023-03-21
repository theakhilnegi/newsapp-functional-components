import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const capLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    document.title = `${capLetter(props.category)} - SigmaNews`;



    const updateNews = async () => {
        props.setProgress(10);
        setPage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(60);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line
    }, [])


    //------for previous and next buttons----------
    // const handlePrevClick = async () => {
    //     setPage(page-1);
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    // setPage(page+1);
    //     updateNews();
    // }

    // ------for infinite scroll------
    const fetchMoreData = async () => {
        setPage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
    }

    return (


        // ------this is code of previous and next buttton navigation and below this code is of infinite scroll----
        // ------Also this is in class based component not functional----

        // <div className='container my-3'>
        //     <h1 className='text-center'>Sigma News - Aaj ki Taza Khabar from {this.capLetter(this.props.category)} category</h1>
        //     {this.state.loading && <Spinner />}
        //     <div className="row">
        //         {!(this.state.loading) && this.state.articles.map((element) => {
        //             return <div className="col-md-4" key={element.url}>
        //                 <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
        //             </div>
        //         })}
        //     </div>
        //     <div className="container d-flex justify-content-between">
        //         <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}> &larr; Previous </button>
        //         <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}> Next &rarr; </button>
        //     </div>
        // </div>




        <>
            <h1 className='text-center' style={{ marginTop: '100px' }}>Sigma News - Aaj ki Taza Khabar from {capLetter(props.category)} category</h1>
            {loading && <Spinner />}
            <div className='container my-3'>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >   <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;