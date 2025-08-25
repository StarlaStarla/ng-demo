import { Component, inject, Input, signal, input } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { AppService } from './app.service';
import { ForbiddenValidatorDirective } from './shared/forbidden-name.directive';

interface Child {
  name: string,
  age: number,
  gender: string
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule, ForbiddenValidatorDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-demo';
  private appService = inject(AppService);

  children = signal<Child[]>([]);
  name = '';
  age = 0;

  ngOnInit() {
    this.appService.getChildren().subscribe(res => {
      this.children.set(res)
    });
    // const observable$ = from(fetchChildren);
    // observable$.subscribe((res: Child[]) => {
    //   this.children.set(res);
    // })
  }

  changeName(event: Event, name: string) {
    // const child = this.children().find(child => child.name === name);
    // if (child) {
    //   child.name = (event.target as HTMLInputElement).value;
    //   this.children.set([...this.children()]);
    // }
    const changeName = (event.target as HTMLInputElement).value;
    this.children.update(children => children.map(child => child.name === name ? { ...child, name: changeName } : child));
    console.log(this.children());

  }

  changeAge(event: Event, age: number) {
    console.log(event, age);
  }

  addChild() {
    const child = { name: this.name, age: this.age, gender: 'male' };
    this.children.set([...this.children(), child]);
  }
}
