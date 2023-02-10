import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string = "";

  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: string = ""

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  response: string;

  constructor() {
    this.response = quizz_questions.results.A;
  }

  ngOnInit(): void {

    if(quizz_questions) {
      this.finished = false;

      this.title = quizz_questions.title
      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length
    }

  }

  playerChoose(alias: string): void {
    this.answers.push(alias)
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex++;

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      this.finished = true

      if(this.verifyResult(this.answers)) {
        this.response = quizz_questions.results.B;
      }

    }

  }

  verifyResult(responses:string[]): boolean {

    const aliasA: string[] = responses.filter(alias => alias == "A");
    const aliasB: string[] = responses.filter(alias => alias == "B");

    if(aliasA.length > aliasB.length) {
      return false;
    }

    return true;

  }

}
