import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsTiger-${this.capitalize(this.props.category)} news `
    }
    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true });

        let data = await fetch(url)
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })

        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePreviousClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9d4f13c82454d169bbd94af0463cf3c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true });
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }
    handleNextClick = async () => {

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c9d4f13c82454d169bbd94af0463cf3c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true });
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // this.setState({
        //     page: this.state.page + 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.props.setProgress(10);

        setTimeout(async () => {

            this.setState({ page: this.state.page + 1 });
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`


            let data = await fetch(url)
            let parsedData = await data.json()
            this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults })
            this.props.setProgress(100);
        }, 1000);


    };
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsTiger - Top {this.capitalize(this.props.category)} Headlines </h1>
                {this.state.loading && <Spinner />}

                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div key={element.url} className="col-md-4">
                            <NewsItem title={element.title} description={element.description !== null ? element.description : null} imgUrl={element.urlToImage !== null ? element.urlToImage : element.urlToImage = "https://c.ndtvimg.com/2021-09/e0c533k8_uaegenericpixabay_625x300_05_September_21.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>

                    })}
                    <div className="container">
                        <InfiniteScroll
                            dataLength={this.state.articles.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.articles.length !== this.state.totalResults}
                            loader={<Spinner />}
                        ></InfiniteScroll>
                    </div>
                </div>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePreviousClick} className="btn btn-danger">???? Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-danger">Next ????</button>
                </div> */}

            </div >
        );
    }
}

export default News;
