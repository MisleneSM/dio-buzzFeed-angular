import { Component, OnInit } from '@angular/core';
import quizz from '../../../assets/data/quizz.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title: string = ''
  questions: any
  questionSelected: any

  anwser:string[] = [] //respostas
  anwserSelected:string = ''

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz){
      this.finished = false
      this.title = quizz.title

      this.questions = quizz.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex)
      console.log(this.questionMaxIndex)
    }
  }

  playerChoose(value: string){
    this.anwser.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else {
      const finalAnswer: string = await this.checkResult(this.anwser)
      this.finished = true
      this.anwserSelected = quizz.results[finalAnswer as keyof typeof quizz.results]
      // verificar opção ganhadora
    }
  }

  async checkResult(anwsers:string[]){
    const result = anwsers.reduce((previous, current, i, arr) => {
      if(
      arr.filter(item => item === previous).length >
      arr.filter(item => item === current).length
      ){
        return previous
      }else {
        return current
      }
    })
    
    return result
  }
}
