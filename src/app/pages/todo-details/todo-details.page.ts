import { Component, OnInit } from '@angular/core';
import { TaskI } from '../../models/task.interface';
import {ActivatedRoute} from '@angular/router';
import {NavController, LoadingController} from '@ionic/angular';
import { TodoService } from '../../services/todo.service';



@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {
  todo: TaskI = {
    task: '',
    direccion: ''
  };
  todoId= null;
  constructor(
    private route: ActivatedRoute, private nav: NavController,
    private todoService: TodoService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if(this.todoId){
      this.loadTodo();
    }
  }
async loadTodo(){
const loading  = await this.loadingController.create({
  message: 'cargando..'
});
await loading.present();
this.todoService.getTodo(this.todoId).subscribe(res => {
  loading.dismiss();
  this.todo = res;
});
}
async saveTodo(){
  const loading  = await this.loadingController.create({
    //message: 'cargando..'
});
await loading.present();
if (this.todoId){
  //update
  this.todoService.updateTodo(this.todo, this.todoId).then(()=>{
    loading.dismiss();
    this.nav.navigateForward('/')
  });
}else{
  //insert
  this.todoService.addTodo(this.todo).then(()=>{
    this.nav.navigateForward('/')
  });
}
}
onRemoveTodo(todoId: string){
  this.todoService.removeTodo(todoId);
}
}
