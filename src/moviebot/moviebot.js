import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import Movierecomendation from "./movieRecomendation/movieRecomendation";
import { ThemeProvider } from 'styled-components';


const theme = {
  background: '#f5f8fb',
  //fontFamily: 'Helvetica Neue',
  headerBgColor: 'black',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: 'black',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};
class Moviebot extends Component {
  render() {
    const config = {
      width: "400px",
      height: "500px",
      floating: true,
    };
    return (
      <ThemeProvider theme={theme}>
      <ChatBot
        steps={[
          {
            id: "first-message",
            message: "Здравствуйте",
            trigger: "second-message",
          },
          {
            id: "second-message",
            message: "Посоветовать какой-нибудь фильм?",
            trigger: "advice",
          },
          {
            id: "advice",
            options: [
              { value: "y", label: "Да", trigger: "recomendation" },
              { value: "n", label: "Нет", trigger: "no-submit" },
            ],
          },
          {
            id: "recomendation",
            message: "Какой жанр больше нравится?",
            trigger: "recomendationList",
          },
          {
            id: "recomendationList",
            options: [
              {
                value: 2,
                label: "фантастика",
                trigger: "recomendation-message",
              },
              { value: 3, label: "боевик", trigger: "recomendation-message" },
              { value: 4, label: "триллер", trigger: "recomendation-message" },
              {
                value: 6,
                label: `комедия`,
                trigger: "recomendation-message",
              },
              {
                value: 16,
                label: "криминал",
                trigger: "recomendation-message",
              },
              {
                value: 17,
                label: "детектив",
                trigger: "recomendation-message",
              },
              { value: 4, label: "триллер", trigger: "recomendation-message" },
              { value: 8, label: "драма", trigger: "recomendation-message" },
              {
                value: 10,
                label: "приключения",
                trigger: "recomendation-message",
              },
            ],
          },
          {
            id: "recomendation-message",
            message: "Может это понравится?",
            trigger: "recomendation-movie",
          },
          {
            id: "recomendation-movie",
            component: <Movierecomendation />,
            asMessage: true,
            trigger: "end-message",
          },
          //   {
          //     id: "lastname",
          //     user: true,
          //     trigger: "q-email",
          //   },
          //   {
          //     id: "q-email",
          //     message: "Finally. what is you email?",
          //     trigger: "email",
          //   },
          //   {
          //     id: "email",
          //     user: true,
          //     trigger: "q-submit",
          //   },
          //   {
          //     id: "q-submit",
          //     message: "Do you wish to submit?",
          //     trigger: "submit",
          //   },
          //   {
          //     id: "submit",
          //     options: [
          //       //{ value: "y", label: "Yes", trigger: "end-message" },
          //       { value: "n", label: "No", trigger: "no-submit" },
          //     ],
          //   },
          {
            id: "no-submit",
            message: "Как пожелаете.",
            trigger: "end-message",
          },
          {
            id: "end-message",
            options: [
              //{ value: "y", label: "Yes", trigger: "end-message" },
              {
                value: "n",
                label: "Вернутся к началу",
                trigger: "second-message",
              },
            ],
          },
          // {
          //   id: "end-message",
          //   component: <Post />,
          //   asMessage: true,
          //   end: true,
          // },
        ]}
        {...config}
      />
      </ThemeProvider>
    );
  }
}

export default Moviebot;
