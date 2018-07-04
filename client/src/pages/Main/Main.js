import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { List, ListItem } from "../../components/List";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";

class Main extends Component {
  state= {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ saved: res.data }))
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startYear && this.state.endYear) {
      API.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
        .then(res => {
          console.log(res.data.response.docs);
          this.setState({ articles: res.data.response.docs })
        });
      this.setState({ topic: "", startYear: "", endYear: "" });
    }
  };

  handleSaveBtn = (title, url, date) => {
    // event.preventDefault();
    let article = {
      title: title,
      url: url,
      date: date
    };
    API.saveArticle(article)
      .then(res => this.loadArticles())
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">

            <Jumbotron>
              <h1>New York Times Article Search</h1>
            </Jumbotron>

            <h2>Search for Articles</h2>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year (required)"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>

            <br /><br />
            <hr />

            <h2>Results</h2>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map((article, index) => (
                  <ListItem key={index}>
                    <strong>
                      {article.headline.main}
                    </strong>
                    <br />
                    Publication Date: {article.pub_date}
                    <br />
                    <a href={article.web_url} target="_blank">Click Here to Read the Article</a>
                    <SaveBtn onClick={() => this.handleSaveBtn(article.headline.main, article.web_url, article.pub_date)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h4>There are no results to display. Enter a new search to see some results.</h4>
            )}

            <br/><br/>
            <hr />

            <h2>Saved Articles</h2>
            {this.state.saved.length ? (
              <List>
                {this.state.saved.map(article => (
                  <ListItem key={article._id}>
                    <strong>
                      {article.title}
                    </strong>
                    <br />
                    Publication Date: {article.date}
                    <br />
                    <a href={article.url} target="_blank">Click Here to Read the Article</a>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h4>No Saved Articles</h4>
            )}

            <br/><br/><br/>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;