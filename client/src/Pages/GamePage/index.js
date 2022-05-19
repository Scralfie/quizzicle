import React, { useEffect, useState, useRef } from "react";
import { Navbar, Timer } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { QuestionNumber } from "../../components";
import {
  roundCount,
  questionCount,
  incrementRound,
  incrementQuestion,
  setScores,
  setQuestionCount,
  setIsRoundOver,
  gameInfo
} from "../../reducers/gameSlice";
import { questions } from "../../reducers/questionsSlice";

const GamePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [answers, setAnswers] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [numOfQuestions, setNumOfQuestions] = useState(1);
  const [player1, setPlayer1] = useState(true);
  const [player2, setPlayer2] = useState(false);

  const { player1Score, setPlayer1Score } = useState();
  const { player2Score, setPlayer2Score } = useState();


  const questionsStatus = useSelector((state) => state.questions.status);
  const formInfo = useSelector(gameInfo);

  console.log(formInfo)

  useEffect(() => {
    if (questionsStatus === "loading") {
      <Box mt={20}>
        <CircularProgress size={150} />
      </Box>;
    }

    if (questionsStatus === "failed") {
      <Typography variant="h6" mt={20} color="red">
        Technical Difficulties! Refresh the Page and Take a Shot!
      </Typography>;
    }

    if (questionsStatus === "fulfilled") {
      setAnswers([
        allQuestions.correct_answer,
        ...allQuestions.incorrect_answers,
      ]);
    }
  }, [categoryStatus, dispatch]);

  function answerClick(e) {
    if (player1) {
      setPlayer1(false);
      setPlayer2(true);
    } else {
      setPlayer1(true);
      setPlayer2(false);
    }

    let currentAnswer = e.target.innerHTML;
    if (currentQuestion > allQuestions.length) {
      navigate("/results");
    }

    setCurrentQuestion((prev) => prev + 1);

    // console.log(currentQuestion);
    // console.log(allQuestions.length);

    // Checking the answer & provide user feedback
    if (currentAnswer === allQuestions[currentQuestion].correct_answer) {
      return alert("CORRECT!");
      // Update the score if necessary
    } else {
      return alert("FAIL. DRINK UP!");
    }
  }
  // round
  const currRoundCount = useSelector(roundCount);
  const roundSettings = useSelector((state) => state.game.roundSettings);

  // all questions
  const allQuestions = useSelector(questions);

  return (
    <>
      <Navbar />
      <QuestionNumber
        currQuestion={ currentQuestion }
        numOfQuestions={formInfo.numOfQuestions}
      />
      <div className="timer">
        <div className="remaining-time-line">.</div>
        <div className="remaining-time-text">0:29</div>
      </div>
      <div className="game-container">
        <div className="players">
          <div className={player1 ? "active-player player1" : "player1"}>
            Player1
            <div className="player1-score">Score: {player1Score}</div>
          </div>
          <div className={player2 ? "active-player player2" : "player2"}>
            Player2
            <div className="player2-score">Score: {player2Score}</div>
          </div>
        </div>

        <div className="question">
          {allQuestions.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            allQuestions[currentQuestion].question
          )}
        </div>

        <div className="answers-container">
          <div className="answer1" onClick={answerClick}>
            {allQuestions.length === 0 ? (
              <h1>Loading...</h1>
            ) : (
              allQuestions[currentQuestion].correct_answer
            )}
          </div>
          <div className="answer2" onClick={answerClick}>
            {" "}
            {allQuestions.length === 0 ? (
              <h1>Loading...</h1>
            ) : (
              allQuestions[currentQuestion].incorrect_answers[0]
            )}
          </div>
          <div className="answer3" onClick={answerClick}>
            {" "}
            {allQuestions.length === 0 ? (
              <h1>Loading...</h1>
            ) : (
              allQuestions[currentQuestion].incorrect_answers[1]
            )}
          </div>
          <div className="answer4" onClick={answerClick}>
            {" "}
            {allQuestions.length === 0 ? (
              <h1>Loading...</h1>
            ) : (
              allQuestions[currentQuestion].incorrect_answers[2]
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
