import { inject, Injectable } from "@angular/core";
import { of } from "rxjs";


interface Child {
  id: number,
  name: string,
  age: number,
  gender: string
}

@Injectable({
  providedIn: 'root',
})

export class AppService {
  private items = [{
    id: 1,
    name: 'Mary',
    age: 12,
    gender: 'male'
  },
  {
    id: 2,
    name: 'Bob',
    age: 13,
    gender: 'male'
  },
  {
    id: 3,
    name: 'Tom',
    age: 15,
    gender: 'male'
  }];

  getChildren() {
    return of(this.items)
    // const fetchChildren = new Promise<Child[]>((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.items)
    //   }, 0);
    // })
    // return fetchChildren;

  }
}