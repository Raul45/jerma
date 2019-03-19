import { Component, OnInit } from '@angular/core';
import { TaskI } from '../models/task.interface';
import { TodoService } from '../services/todo.service';
import {NavController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
todos: TaskI[];
constructor(private todoService: TodoService, private nav: NavController){


}


ngOnInit(){
this.todoService.getTodos().subscribe(res=> {
  console.log('Tareas', res);
  this.todos=res;
});
}
}
