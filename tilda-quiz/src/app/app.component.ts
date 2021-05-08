import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

interface Quiz {
  id: string;
  name: string;
}

interface Response {
  quizzes: Quiz[];
}

const GET_QUIZZES = gql`
query Quizzes {
  quizzes {
    id
    name
  }
}
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tilda-quiz';

  quizzes$: Observable<Quiz[]>;

  constructor(private apollo:Apollo) {}

  ngOnInit(): void {
    this.quizzes$ = this.apollo.watchQuery<Response>({
query: GET_QUIZZES
    }).valueChanges.pipe(map(result => result.data.quizzes))
  }
}
