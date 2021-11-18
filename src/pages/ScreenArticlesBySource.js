import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Icon, Modal } from "antd";
import data from "../mock/articles";

function ScreenArticlesBySource() {
  const { Meta } = Card;

  const { id } = useParams();

  const [articleList, setArticleList] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);

  const showModal = (article) => {
    setCurrentArticle(article);
  };

  const handleOk = () => {
    setCurrentArticle(null);
  };

  const handleCancel = () => {
    setCurrentArticle(null);
  };

  useEffect(() => {
    const findArticles = async () => {
      // const data = await fetch(
      //   `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=3c532deacade406cb4bb8ea9ff641164`
      // );
      // const body = await data.json();
      setArticleList(data.articles);
    };
    findArticles();
  }, [id]);

  const news = articleList.map(function (article, i) {
    return (
      <Card
        key={article.title}
        style={{
          width: 300,
          margin: "15px",
          display: "flex",
          flexDirection: "column",
        }}
        cover={
          <img alt="example" src={article.urlToImage} style={{ height: 200 }} />
        }
        actions={[
          <Icon
            onClick={() => showModal(article)}
            type="read"
            key="ellipsis2"
          />,
          <Icon type="like" key="ellipsis" />,
        ]}
      >
        <Meta
          style={{ height: 200 }}
          title={article.title}
          description={article.description}
        />
      </Card>
    );
  });

  return (
    <div>
      <div className="Card">{news}</div>
      <Modal
        title={currentArticle?.title}
        visible={!!currentArticle}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{currentArticle?.content}</p>
      </Modal>
    </div>
  );
}

export default ScreenArticlesBySource;
