import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Quiz} from 'src/app/interfaces/quiz';
import {Response} from 'src/app/interfaces/API_response'


const GET_QUIZZES = gql`
query Quizzes {
  quizzes {
    id
    name
    questions {
      answer
      id
      options
      text
    }
  }
}
`;



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  currentQuestion = 0 //index of the question the user is currently on
  answerOptionsArray //I'm declaring this variable to convert answer options from a string to an array to be able to loop through it using Angular repeater directive *ngFor
  selectedQuiz //currently selected quiz
  currentScore = 0
  
  quizzes$: Observable<Quiz[]>;

  constructor(private apollo:Apollo) {}

  ngOnInit(): void {

    //fetching the data from graphQL API using Apollo Client
    this.quizzes$ = this.apollo.watchQuery<Response>({
query: GET_QUIZZES
    }).valueChanges.pipe(map(result => result.data.quizzes))
  }

  onSelect(quiz: Quiz): void {
    this.selectedQuiz = quiz;
    this.currentQuestion = 0;
    this.answerOptionsArray = this.selectedQuiz.questions[this.currentQuestion].options.split(',');
  }

  onAnswer(option) {
    if(option === this.selectedQuiz.questions[this.currentQuestion].answer) {
      this.currentScore++
      }
  }


  nextQuestion() {
    this.currentQuestion = this.currentQuestion+1;
    this.answerOptionsArray = this.selectedQuiz.questions[this.currentQuestion].options.split(',');
    
  }
  previousQuestion() {
    this.currentQuestion = this.currentQuestion-1;
    this.answerOptionsArray = this.selectedQuiz.questions[this.currentQuestion].options.split(',');
  }

  returnToDashboard() {
    this.selectedQuiz = !this.selectedQuiz
  }
}

